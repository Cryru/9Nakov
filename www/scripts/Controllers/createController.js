$(startUp);

function startUp()
{
	//Set the register form event.
	$('#formCreate').submit(create);
}
function create(e)
{
	//Prevent the submit event from reseting the page.
	e.preventDefault();
	
	//Check if not logged in, in which case redirect to home.
	if(!(kinvey.LoggedStatus())) { showHomeView(); return; }
	
	//Get file from input
	let file = $("#creFile")[0].files[0];

	//Check if file fits in size.
	if((file.size / 1024) > 9000)
	{
		error("You can only upload pictures smaller than 9MB.")
		return;
	}
	
	message("Uploading...");
	
	let reader = new FileReader();
	reader.addEventListener("load", createFileLoader);
	reader.readAsDataURL(file);	
}
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
function imageUploaded(response)
{
	//If the upload is sucessful, we take the uploaded image link and send it to kinvey.
	kinvey.CreateData("Memes", {title: $("#creTitle").val(), file: response.data.link}, successCreate, errorCreate);
}
function successCreate(response) 
{
	message("Post Created!");
	//Redirect to post page.
    showPostView(response._id);
}
function errorCreate(response)
{
	//Internet is out.
	if(response.readystate == 0 && response.status == 0)
	{
		error("Network Error");
		return;
	}
	
	error("Uknown error occured while uploading.");
}
