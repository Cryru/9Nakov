$(startUp);

function startUp()
{// Login Admin user so that we can access the collection
	kinvey.Login("Admin","Admin",getData);
	//Placeholder view.
	function getData()
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
if(kinvey.LoggedUsername() == "Admin"){
	kinvey.Logout();
	updateNavigationLinks();
}
}