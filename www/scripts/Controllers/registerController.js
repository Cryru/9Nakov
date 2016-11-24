$(startUp);

function startUp()
{
	//Set the register form event.
	$('#formRegister').submit(register);
}
function register(e)
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
	if(password != passwordConf)
	{
		error("Password does not match confirmation!");
		errorTriggered = true;
	}
	
	//Check username for invalid symbols.
	if(username != usernameMatch)
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
    kinvey.Register(username, password, successRegister, errorRegister);
}
function successRegister(response) 
{
	message("Registered Successfully!");
	updateNavigationLinks();
    showHomeView();
}
function errorRegister(response)
{
	//Internet is out.
	if(response.readystate == 0 && response.status == 0)
	{
		error("Network Error");
	}
	//Taken username.
	if(response.status == 409)
	{
		error("That username is taken. Would you like to login instead?");
	}
}
