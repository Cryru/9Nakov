//Libraries
import $ from 'jquery';
import Kinvey from './SoulKinvey';
import React from 'react';
import ReactDOM from 'react-dom';

//Views
import Navigation from './Views/Navigation';
import HomeView from './Views/HomeView';
import LoginView from './Views/LoginView';
import RegisterView from './Views/RegisterView';
import CreateView from './Views/CreateView';
import PostDetailView from './Views/PostDetail';

import ModelUsers from './Models/ModelUsers';
import ModelPosts from './Models/ModelPosts';
//-------------------------------------------Start Sequence--------------------------------------------\\
//Initalize Kinvey application. SoulKinvey.js

let kinvey=new Kinvey("kid_SyCmuImMl", "f55fee035573491d8a4f32e3a11f3bc4");
let atHome=true;

//Render the home view.
homeController();

//-------------------------------------------Primary Functions--------------------------------------------\\
//Refreshes the navigation bar and skeleton of the page.
function refreshSkeleton()
{

    //Clear scroll event.
    $(window).unbind('scroll');

    //Tracks the home page, to prevent redirections on finished loading.
    atHome=false;

    ReactDOM.render(
		<div>
			<Navigation kinvey={kinvey}
						homeClicked={homeController}
						loginClicked={loginController}
						registerClicked={registerController}
						createClicked={createController}
						logoutClicked={logOut} />
			<div id="view"></div>
		</div>,
        document.getElementById('root')
    );


}
// on this file you will find the following:
// homeController
//   getPosts
//   getTotal
//   updateBuffer
//   dataGot
//     scrollBottom
//   dataErrorGet
//   viewPost
// postController
//   dataGot
//     dataGotComments
//   dataErrorGet
//   editEvent
//   updatePost
//     successUpdate
//     errorUpdate
//   deleteEvent
//     dataDeleted
//     errorNotDeleted
//   editComment
//   updateComment
//   Update
//   Error
//   deleteComment
//   deleteSuccessful
//   deleteFail
//   postComment
//     successPost
// loginController
//   Login
//   successLogin
//   errorLogin
// registerController
//   Register
//   successRegister
//   errorRegister
// createController
//   Create
//   createFileLoader
//   imageUploaded
//   successCreate
//   errorCreate
// logout
//-------------------------------------------Feedback Functions--------------------------------------------\\
//Displays a message to the user, disappears after a couple seconds, or when clicked.
function message(txt)
{
    //TODO
    console.log(txt);
}
//Displays an error to the user, disappears only when clicked.
function error(txt)
{
    loading(false);
    //TODO
    console.error(txt);
}
//Displays a loading message to the user, disappears only when loading(False) is called or an error.
function loading(show)
{
    //TODO
    //if true show loading message if false then hide the message.
    if (show)
    {
        console.log("Loading...");
    }
    else
    {
        console.log("Loaded");
    }
}

//-------------------------------------------Controllers--------------------------------------------\\
function homeController()
{
    //The number of posts to show per page.
    let limit=5;
    //The current page.
    let page=1;
    //The currently loaded posts.
    let databuffer=[];
    //The total amount of posts.
    let total=0;
    //If we are loading the next page.
    let pageRequestRunning=false;

    //Refresh.
    refreshSkeleton();
    //Set home trigger.
    atHome=true;
    //Render an empty home view.
    ReactDOM.render(<HomeView />, document.getElementById('view'));
    //Show loading message.
    loading(true);
    //Check if not logged in, in which case log in, otherwise proceed with request.
    if (ModelUsers.loggedStatus(kinvey)) ModelPosts.getPosts(kinvey, getTotal, dataErrorGet);
    else ModelUsers.loginGuest(kinvey, getPosts);

    //Data request.
    function getPosts()
    {
        //Send a request to kinvey to get all posts.
        ModelPosts.getPosts(kinvey,getTotal,dataErrorGet);

    }

    function getTotal(data)
    {
        total=data.count;
        updateBuffer();
    }

    function updateBuffer()
    {
        //Check if we have already loaded all posts.
        if (databuffer.length === total) return;
        //Set the loading trigger to true.
        pageRequestRunning=true;
        //Display loading message.
        loading(true);
        //Determine how many posts we need to skip to load the ones we need.
        let skip=0;
        skip=total - (page * 5);
        if (skip < 0)
        {
            limit=(total - databuffer.length);
            skip=0;
        }

        //Send request for specific post range.
        ModelPosts.getPostRange(kinvey,limit,skip,dataGot,dataErrorGet);
        //if this does not work VVVVVVV is the original request
        //kinvey.GetData(`Memes?query={}&limit=${limit}&skip=${skip}`, undefined, dataGot, dataErrorGet);
    }
    //If getting data was successful.
    function dataGot(data)
    {
        //If the view is changed, discard data.
        if(atHome === false) return;

        //Set loading to trigger to false, as data is loaded.
        pageRequestRunning=false;
        //Hide loading message.
        loading(false);
        //Reverse list so we have newest on top.
        databuffer.push.apply(databuffer, data.reverse());

        //Send data to React to render.
        let homeview=<HomeView data={databuffer}
							   viewPostEvent={viewPost}
							   page={page}/>;
        ReactDOM.render(homeview, document.getElementById('view'));

        //Attach an event to turn to the next page when scrolling to the bottom of the page.
        $(window).scroll(scrolltoBottom);

        //The event to trigger on scroll that checks if we've scrolled to the bottom of the page.
        function scrolltoBottom()
        {
            if (Math.ceil($(window).scrollTop() + $(window).height()) >= $(document).height())
            {
                //Check if we are already loading a page before starting to load the next one.
                if (pageRequestRunning === false) nextPage();
            }

            //Load the next page of data.
            function nextPage()
            {
                page++;
                updateBuffer();
            }
        }
    }
    //If getting data was unsuccessful.
    //This should never fire, but will happen on a corrupt login.
    function dataErrorGet(response)
    {
        //If the system claims we are not logged in, log in with guest credentials and try again.
        if (response.status === 401)
        {
            ModelUsers.loginGuest(kinvey, ModelPosts.getPosts(kinvey, getTotal, dataErrorGet));
        }
    }
    //The event that is triggered when a post is clicked.
    function viewPost()
    {
        postController(this.props.id);
    }
}

function postController(postID)
{
	//this will be needed later
	var idOfThePost = postID;
    //Refresh.
    refreshSkeleton();
    //Render an empty post detail view.
    ReactDOM.render(<PostDetailView /> , document.getElementById('view'));
    //Show loading message.
    loading(true);
    //Get the post data.
    ModelPosts.getOnePost(kinvey, postID, dataGot, dataErrorGet);

    //If getting data was successful.
    function dataGot(data)
    {
        //Hide loading message.
        loading(false);
        //getting the comments
        ModelPosts.getComments(kinvey, dataGotComments, dataErrorGet);
        //if this doesnot work here is the original request VVVVVV
        //kinvey.GetData("comments", undefined, dataGotComments, dataErrorGet);

        function dataGotComments(allComments)
        {

            let comments=[];
            //going through every comment
            for (let comment of allComments)
            {
                //if the postID property of the comment is the same as our postID then we add it to comments
                if (comment.postID === postID)
                {
                    //add the comment to our array
                    comments.push(comment);
                }
            }

            //Sort comments by creation date.
            comments = comments.sort(function (a, b) {
                var key1 = new Date(a._kmd.ect);
                var key2 = new Date(b._kmd.ect);

                if (key1 > key2) {
                    return -1;
                } else if (key1 === key2) {
                    return 0;
                } else {
                    return 1;
                }
            });

            //Send data to React to render.
            ReactDOM.render(<PostDetailView
					data={data}
					editCommentHandler={editComment}
					deleteCommentHandler={deleteComment}
					loggedUser={ModelUsers.loggedUsername(kinvey)}
					comments={comments}
					user={ModelUsers.loggedID(kinvey)}
					deleteEvent={deleteEvent}
					editEvent={editEvent}
					commentEvent={postComment}/>
                , document.getElementById('view'));

        }
    }

    //If getting data was unsuccessful.
    function dataErrorGet(response)
    {
        error("Error getting post data.");
        //Redirect to home.
        homeController();
    }

    //Triggered when the edit button is clicked.
    function editEvent()
    {
        let editPostBtn=$("#postInfo button:contains('Edit')");
        editPostBtn.hide();
        let updatePostBtn=$("<button '>Update Post</button>").on("click",updatePost.bind(this))
        editPostBtn.parent().prepend(updatePostBtn);
        let textarea= $('<textarea id="postToUpdate"/>').text(this.props.data.title);
        $("#postInfo h1").remove();
        $("#postInfo").prepend(textarea)

    }

    function updatePost(){
    	// get the text from the textarea
		let text = $("#postToUpdate").val();
        let postToUpdateID = this.props.data._id;
        // remake the object with the new title to be uploaded
        let objectToUpdate = {
             title: text,
			file: this.props.data.file
		};
		//upload it
		ModelPosts.updatePost(kinvey,postToUpdateID,objectToUpdate,successfulUpdate,errorUpdate);
        //kinvey.UpdateData("Memes",postToUpdateID,objectToUpdate,successfulUpdate,errorUpdate);
        //if everything was successful refresh
		function successfulUpdate(){
			message("Update successful");
			postController(postToUpdateID);
		}
		function errorUpdate(){

			error("Something went wrong, please try again");
		}
    }

    //Triggered when the delete button is clicked.
    function deleteEvent()
    {

        loading(true);
        // transform the postID in readbale format
        let postID=this.props.data._id;
        //send request to Kinvey to delete the post
        ModelPosts.deletePost(kinvey,postID,dataDeleted,errorNotDeleted);
        //if this doesnot work here is the original request VVVVV
        //kinvey.DeleteData("Memes", postID, dataDeleted, errorNotDeleted);
        // if the post is deleted then redirect to home
        function dataDeleted()
        {
            loading(false);
            message("Succesfully deleted the commment");
            homeController();
        }
        // if there is anything wrong
        function errorNotDeleted()
        {
            loading(false);
            error("Try again");
        }
    }
    //triggered when the editComment button is clicked
    function editComment() {
    	// take the id in readable format
		// "this" is given to the function when its triggered and it represents the comment with all the info
        var id = this.props.id;
        //change the button from Edit to Update
        let editBtn = $(`#${id} button:contains('Edit')`)
        $(`#${id} button:contains('Delete')`).hide();
        editBtn.hide();
        $(`#${id} span`).hide()
        editBtn.parent().append($("<textarea id='tempeditarea'>").text(this.props.text))
		//here is the Update button to be shown after edit being clicked
        editBtn.parent().append($("<button id='tempeditbutton'>Update Comment</button><br/>").on("click", updateComment.bind(this)));

    }
    function updateComment() {
    	//first we take the new text from the textarea
        let textToUpdate = $("#tempeditarea").val();
        //remake the object with the new textarea
        let updateObj = {
            postID : idOfThePost,
            text : textToUpdate,
            author: this.props.author
        };
        //send to kinvey to update
        ModelPosts.updateComment(kinvey,this.props.id,updateObj,Update,Error);
        //kinvey.UpdateData("comments",this.props.id, updateObj, Update, Error);

    }//if everything is okay update to show the new comment
    function Update() {
        // this was the original way of doing it
        // VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
        //$("#tempeditbutton").remove();
        //$("#tempeditarea").remove();
        //$(`#${id} button:contains('Delete')`).show();
        //editBtn.show();
        //$(`#${id} span`).show()

        //this is how we do it now
        postController(idOfThePost);

    }

    function Error() {
        error("Something happened.Please try again");
    }


    function deleteComment(){
    	//this is given by default to the function and is the comment with all the info
    	let commentID = this.props.id;
        ModelPosts.deleteComment(kinvey,commentID,deleteSuccessful,deleteFail);
        //kinvey.DeleteData("comments",commentID,deleteSuccessful,deleteFail);
    }
    function deleteSuccessful(){
        message("You succesfully deleted the comment");
        postController(postID);
    }
    function deleteFail(){
        message("Something went wrong.Please try again");
    }
    //Triggered when a user attempts to post a comment.
    function postComment()
    {
        //The post id.
        let text=$('#commentText').val(); //The comment entered.
		// get the author
        let author=ModelUsers.loggedUsername(kinvey);
        //"this" is given by default and represents the comment with all of the info
        let postID=this.props.data._id;

        let comment={
            author: author,
            text: text,
            postID: postID
        };
        //check if it's not empty and if it is dont send shit to kinvey
        if(text.length >0) {

            ModelPosts.createComment(kinvey, comment, successPost);
            //if this doesnot work here is the original request
            //kinvey.CreateData("comments", comment, successPost);
        }else{
            message("You have to type something first");
        }
        function successPost()
        {
            $('#commentText').val("");
            postController(postID);
        }
    }
}

function loginController()
{
    //Refresh.
    refreshSkeleton();

    //Render the login view.
    ReactDOM.render( < LoginView registerHereHandler={registerController} loginEvent={Login}	/>,
		document.getElementById('view'));

    //The event for when the login form is submitted.
    function Login(e)
    {
        //Prevent the submit event from reseting the page.
        e.preventDefault();

        //Get input.
        let username=$('#loginUsername').val();
        let password=$('#loginPassword').val();

        //Set a trigger flag.
        let errorTriggered=false;

        //Check if invalid username.
        let usernameMatch=username.match(/[a-zA-Z0-9]+/g);

        //Check username for invalid symbols.
        if (username !== usernameMatch.toString())
        {
            error("Username must only contain numbers and letters.");
            errorTriggered=true;
        }

        //Check if password is too short.
        if (password.length < 3)
        {
            error("Password must be at least 3 characters long.");
            errorTriggered=true;
        }

        //Check if any errors.
        if (errorTriggered) return;

        if (errorTriggered) return;

        //Show loading.
        loading(true);

        //If ready, send a log in request.
        ModelUsers.loginUser(kinvey, username, password, successLogin, errorLogin);
    }

    //When login is complete.
    function successLogin(response)
    {
        //Logged in, show appropriate messages, and redirect to home.
        loading(false);
        message("Logged in!");
        homeController();
    }

    //When error from backend.
    function errorLogin(response)
    {
        //Internet is out.
        if (response.readystate === 0 && response.status === 0)
        {
            error("Network Error");
            return;
        }
        //Wrong credentials.
        if (response.status === 401)
        {
            error("Invalid Username or Password");
            return;
        }

        //Edge case.
        error("Unknown error occured while logging in.");
    }
}

function registerController()
{
    refreshSkeleton();
    //Render the registration view.
    ReactDOM.render(<RegisterView loginHereHandler={loginController} registerEvent={Register}/>, document.getElementById('view'));

    function Register(e)
    {
        //Prevent the submit event from reseting the page.
        e.preventDefault();

        //Get input.
        let username=$('#regUsername').val();
        let password=$('#regPassword').val();
        let passwordConf=$("#regPasswordConf").val();

        //Set a trigger flag.
        let errorTriggered=false;

        //Check if invalid username.
        let usernameMatch=username.match(/[a-zA-Z0-9]+/g);

        //Check if passwords match.
        if (password !== passwordConf)
        {
            error("Password does not match confirmation!");
            errorTriggered=true;
        }

        //Check username for invalid symbols.
        if (username !== usernameMatch.toString())
        {
            error("Username must only contain numbers and letters.");
            errorTriggered=true;
        }

        //Check if password is too short.
        if (password.length < 3)
        {
            error("Password must be at least 3 characters long.");
            errorTriggered=true;
        }

        //Check if any errors.
        if (errorTriggered) return;

        //If ready, send a registration request.
        loading(true);
        ModelUsers.registerUser(kinvey, username, password, successRegister, errorRegister);

        //When the registration is successful.
        function successRegister(response)
        {
            message("Registered Successfully!");
            loading(false);
            homeController();
        }

        //If error while registering.
        function errorRegister(response)
        {
            //Internet is out.
            if (response.readystate === 0 && response.status === 0)
            {
                error("Network Error");
                return;
            }
            //Taken username.
            if (response.status === 409)
            {
                error("That username is taken. Would you like to login instead?");
                return;
            }

            //Edge case.
            error("Unknown error occured while registering.");
        }

    }
}

function createController()
{

    refreshSkeleton();

    ReactDOM.render(<CreateView createEvent={Create}/>, document.getElementById('view'));


    function Create(e)
    {
        //Prevent the submit event from reseting the page.
        e.preventDefault();

        //Get file from input
        let file=$("#creFile")[0].files[0];

        //Check if file fits in size.
        if ((file.size / 1024) > 9000)
        {
            error("You can only upload pictures smaller than 9MB.")
            return;
        }

        loading(true);

        let reader=new FileReader();
        reader.addEventListener("load", createFileLoader);
        reader.readAsDataURL(file);
    }

    //Sends a request to imgur to upload the image.
    function createFileLoader(d)
    {
        let image64=d.target.result.slice(d.target.result.indexOf(",") + 1);
        let imageData={
            image: image64
        };

        //First we upload the image to imgur.
        let imageUploadRequest={
            method: "POST",
            url: "https://api.imgur.com/3/upload",
            headers:
                {
                    "Authorization": "Client-ID 4c7e742000836ce"
                },
            data: imageData,
            success: imageUploaded,
            error: errorCreate
        }

        //Send request to upload.
        $.ajax(imageUploadRequest);
    }

    //If the image uploading to imgur is complete, we proceed to send it to kinvey.
    function imageUploaded(response)
    {
        //If the upload is sucessful, we take the uploaded image link and send it to kinvey.
		let objPost = {
            title: $("#creTitle").val(),
            file: response.data.link
        };
		ModelPosts.createPost(kinvey,objPost,successCreate,errorCreate);
        //kinvey.CreateData("Memes",
        //    {
        //        title: $("#creTitle").val(),
        //        file: response.data.link
        //    }, successCreate, errorCreate);
    }

    //If the data was successfully created.
    function successCreate(response)
    {
        //Display message.
        message("Post Created!");
        //Redirect to post page.
        postController(response._id);
    }

    function errorCreate(response)
    {
        //Internet is out.
        if (response.readystate === 0 && response.status === 0)
        {
            error("Network Error");
            return;
        }

        //Something happened - kek
        error("Unknown error occured while uploading.");
    }

}

function logOut()
{
    //Log curent user out.
    ModelUsers.logOut(kinvey);
    loading(true);
    //Log guest in.
    ModelUsers.loginGuest(kinvey, (function()
    {
        //Redirect to home.
        homeController();
        //Display message.
        message("Logged Out");
    }), (function()
    {
        error("Couldn't log out.")
    }));
}
