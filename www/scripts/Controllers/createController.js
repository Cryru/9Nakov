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
	}
}
