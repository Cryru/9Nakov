
$(startUp);

function startUp()
{
	//Set the login form event.
	$('#formLogin').submit(login);
}


function login(e)
{
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

	if(errorTriggered) return;
	
	//If ready, send a log in request.
    kinvey.Login(username, password, successLogin, errorLogin);
}
function successLogin(response) 
{
	message("Logged in!");
	updateNavigationLinks();
    showHomeView();
}
function errorLogin(response)
{
	//Internet is out.
	if(response.readystate == 0 && response.status == 0)
	{
		error("Network Error");
	}
	//Wrong credentials.
	if(response.status == 401)
	{
		error("Invalid Username or Password");
	}
}
