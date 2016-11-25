$(startUp);

function startUp()
{
	//Display message.
	loading("Loading Posts...");
	
	// Login as a PH user so that we can access the collection, if not logged in.
	if(kinvey.LoggedStatus()) getPosts(); else kinvey.Login("guest","guest",getPosts);
	
	//Placeholder view.
	function getPosts()
	{
		//if the login is successful then we try to access the collection
		kinvey.GetData("Memes", undefined, dataGot);
	}
}

function dataGot(data)
{
	$("#posts li").remove();
	
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
	
		console.log(d);
	}
	console.log("ae");
	//if after accessing the collection the user is Admin we logout
//if(kinvey.LoggedUsername() == "guest"){
//	kinvey.Logout();
//	updateNavigationLinks();
//}
}