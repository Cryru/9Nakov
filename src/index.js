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

//-------------------------------------------Start Sequence--------------------------------------------\\
//Initalize Kinvey application. SoulKinvey.js
let kinvey = new Kinvey("kid_SyCmuImMl","f55fee035573491d8a4f32e3a11f3bc4");

//Render the home view.
homeController();

//-------------------------------------------Primary Functions--------------------------------------------\\
//Refreshes the navigation bar and skeleton of the page.
function refreshSkeleton()
{
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
  if(show)
  {
    console.log("Loading...");
  }
  else {
    console.log("Loaded");
  }
}

//-------------------------------------------Controllers--------------------------------------------\\
function homeController()
{
  //Refresh.
  refreshSkeleton();
  //Render an empty home view.
  ReactDOM.render(<HomeView />, document.getElementById('view'));
  //Show loading message.
  loading(true);
  //Check if not logged in, in which case log in, otherwise proceed with request.
  if(kinvey.LoggedStatus()) getPosts(); else kinvey.Login("guest","guest",getPosts);
  //Data request.
  function getPosts()
  {
    kinvey.GetData("Memes", undefined, dataGot, dataErrorGet)
  }
  //If getting data was successful.
  function dataGot(data)
  {
    //Hide loading message.
    loading(false);
    //Reverse list so we have newest on top.
    data = data.reverse();

    //Send data to React to render.
    ReactDOM.render(<HomeView data={data} viewPostEvent={viewPost}/>, document.getElementById('view'));
  }
  //If getting data was unsuccessful.
  //This should never fire, but will happen on a corrupt login.
  function dataErrorGet(response)
  {
    //If the system claims we are not logged in, log in with guest credentials and try again.
    if(response.status === 401)
    {
      kinvey.Login("guest", "guest", getPosts);
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
  //Refresh.
  refreshSkeleton();
  //Render an empty post detail view.
  ReactDOM.render(<PostDetailView />, document.getElementById('view'));
  //Show loading message.
  loading(true);
  //Get the post data.
  kinvey.GetData("Memes", postID, dataGot, dataErrorGet);

  //If getting data was successful.
  function dataGot(data)
  {
    //Hide loading message.
    loading(false);
    //getting the comments
    kinvey.GetData("comments",undefined,dataGotComments,dataErrorGet);

    function dataGotComments(allComments){

        let comments = [];
        //going through every comment
        for(let comment of allComments) {
            //if the postID property of the comment is the same as our postID then we add it to comments
            if (comment.postID  = postID) {
                //add the comment to our array
                comments.push(comment);
            }
        }
    }
    //Send data to React to render.
    ReactDOM.render(<PostDetailView data={data} comments ={comments} user={kinvey.LoggedID()} deleteEvent={deleteEvent} editEvent={editEvent} commentEvent={postComment}/>, document.getElementById('view'));

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
    //TODO
    console.log(this.props.data._id); //The post id.
  }
  //Triggered when the delete button is clicked.
  function deleteEvent()
  {
    //TODO
    console.log(this.props.data._id); //The post id.
  }

  //Triggered when a user attempts to post a comment.
  function postComment()
  {
    //TODO
    console.log(this.props.data._id); //The post id.
    console.log($('#commentText').val()) //The comment entered.
  }
}

function loginController()
{
  //Render the login view.
  ReactDOM.render(<LoginView loginEvent={Login}/>, document.getElementById('view'));

  //The event for when the logn form is submitted.
  function Login(e)
  {
    //Refresh.
    refreshSkeleton();
    //Prevent the submit event from reseting the page.
  	e.preventDefault();

  	//Get input.
  	let username = $('#loginUsername').val();
    let password = $('#loginPassword').val();

  	//Set a trigger flag.
  	let errorTriggered = false;

  	//Check if invalid username.
  	let usernameMatch = username.match(/[a-zA-Z0-9]+/g);

  	//Check username for invalid symbols.
  	if(username !== usernameMatch.toString())
  	{
  		error("Username must only contain numbers and letters.");
  		errorTriggered = true;
  	}

  	//Check if password is too short.
  	if(password.length < 3)
  	{
  		error("Password must be at least 3 characters long.");
  		errorTriggered = true;
  	}

  	//Check if any errors.
  	if(errorTriggered) return;

  	if(errorTriggered) return;

    //Show loading.
    loading(true);

  	//If ready, send a log in request.
    kinvey.Login(username, password, successLogin, errorLogin);
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
  	if(response.readystate === 0 && response.status === 0)
  	{
  		error("Network Error");
  		return;
  	}
  	//Wrong credentials.
  	if(response.status === 401)
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
  //Render the registration view.
  ReactDOM.render(<RegisterView registerEvent={Register}/>, document.getElementById('view'));

  function Register(e)
  {
    //Prevent the submit event from reseting the page.
    e.preventDefault();

    //Get input.
    let username = $('#regUsername').val();
    let password = $('#regPassword').val();
    let passwordConf = $("#regPasswordConf").val();

    //Set a trigger flag.
    let errorTriggered = false;

    //Check if invalid username.
    let usernameMatch = username.match(/[a-zA-Z0-9]+/g);

    //Check if passwords match.
    if(password !== passwordConf)
    {
      error("Password does not match confirmation!");
      errorTriggered = true;
    }

    //Check username for invalid symbols.
    if(username !== usernameMatch.toString())
    {
      error("Username must only contain numbers and letters.");
      errorTriggered = true;
    }

    //Check if password is too short.
    if(password.length < 3)
    {
      error("Password must be at least 3 characters long.");
      errorTriggered = true;
    }

    //Check if any errors.
    if(errorTriggered) return;

    //If ready, send a registration request.
    loading(true);
    kinvey.Register(username, password, successRegister, errorRegister);

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
    	if(response.readystate === 0 && response.status === 0)
    	{
    		error("Network Error");
    		return;
    	}
    	//Taken username.
    	if(response.status === 409)
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
  ReactDOM.render(<CreateView createEvent={Create}/>, document.getElementById('view'));


  function Create(e)
  {
    //Prevent the submit event from reseting the page.
  	e.preventDefault();

  	//Get file from input
  	let file = $("#creFile")[0].files[0];

  	//Check if file fits in size.
  	if((file.size / 1024) > 9000)
  	{
  		error("You can only upload pictures smaller than 9MB.")
  		return;
  	}

  	loading(true);

  	let reader = new FileReader();
  	reader.addEventListener("load", createFileLoader);
  	reader.readAsDataURL(file);
  }

  //Sends a request to imgur to upload the image.
  function createFileLoader(d)
  {
  	let image64 = d.target.result.slice(d.target.result.indexOf(",") + 1);
  	let imageData = {image: image64};

  	//First we upload the image to imgur.
  	let imageUploadRequest =
  	{
  		method: "POST",
  		url: "https://api.imgur.com/3/upload",
  		headers: {"Authorization": "Client-ID 4c7e742000836ce"},
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
  	kinvey.CreateData("Memes", {title: $("#creTitle").val(), file: response.data.link}, successCreate, errorCreate);
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
  	if(response.readystate === 0 && response.status === 0)
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
	kinvey.Logout();
	loading(true);
	//Log guest in.
	kinvey.Login("guest","guest", (function()
	{
		//Redirect to home.
		homeController();
		//Display message.
		message("Logged Out");
	}), (function() { error("Couldn't log out.") }));
}
