function controllerHome()
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
	//Reverse list so we have newest on top.
	data = data.reverse();
	
	//Send data to React to render.
	renderPosts(data);
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