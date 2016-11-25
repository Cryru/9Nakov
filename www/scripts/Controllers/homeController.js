$(startUp);

function startUp()
{
	//Display message.
	loading("Loading Posts...");
	
	// Login as a PH user so that we can access the collection, if not logged in.
	if(kinvey.LoggedStatus()) getPosts(); else kinvey.Login("guest","guest",getPosts);

}

//Placeholder view.
function getPosts()
{
	//if the login is successful then we try to access the collection
	kinvey.GetData("Memes", undefined, dataGot, dataErrorGet);
}

function dataGot(data)
{
	$("#posts li").remove();
	
	data = data.reverse();
	
	for(d of data)
	{
		//Shtoto who needs React
		let newPost = $("<li>");
		
		let imageTitle = $("<h2>" + d.title + "</h2>");
	
		let postImage = $("<img>");
		postImage.attr("src", d.file);
		imageTitle.appendTo(newPost);
		postImage.appendTo(newPost);
		newPost.appendTo($("#posts"));
	}
}

//This should never fire, but will happen on a corrupt login.
function dataErrorGet(response)
{
	//If the system claims we are not logged in, log in with guest credentials and try again.
	if(response.status == 401)
	{
		kinvey.Login("guest", "guest", getPosts);
	}
}