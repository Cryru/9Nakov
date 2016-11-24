$(startUp);

function startUp()
{
	//Placeholder view.
	refreshData();
}
function refreshData()
{
	kinvey.GetData("Memes", undefined, dataGot);
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
	
	setTimeout(refreshData , 5000);
}