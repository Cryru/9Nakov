//The kinvey controller as defined by SoulKinvey.js
let kinvey = {};

//Load when ready.
$(startUp);

function startUp()
{
	//Initalize Kinvey application. SoulKinvey.js
	kinvey = new Kinvey("kid_SyCmuImMl","f55fee035573491d8a4f32e3a11f3bc4");

	//Show appropriate menu links.
	updateNavigationLinks();
	
	//Attach navigation functions.
	$("#linkHome").click(showHomeView);
	$("#createPost").click(showCreateView);
	$("#linkLogin").click(showLoginView);
	$("#linkRegister").click(showRegisterView);
	$("#linkLogout").click(logout);
	
	showView("Home");
}

//Updates the navigation menu according to the username being logged or not.
function updateNavigationLinks()
{
	//Set all to invisible.
	$("#linkHome").css("display", "");
	$("#createPost").css("display", "none");
	$("#linkLogin").css("display", "none");
	$("#linkRegister").css("display", "none");
	$("#linkLogout").css("display", "none");
	$("#loggedInUser").text("");
	
	if(kinvey.LoggedStatus() && kinvey.LoggedUsername() != "guest")
	{
		$("#createPost").css("display", "");
		$("#linkLogout").css("display", "");
		$("#loggedInUser").text("Hello, " + kinvey.LoggedUsername());
	}
	else
	{
		$("#linkLogin").css("display", "");
		$("#linkRegister").css("display", "");
	}
}

//Logs the user out, and redirects back to home.
function logout()
{
	kinvey.Logout();
	message("Logged Out");
	showView("Home");
	kinvey.Login("guest","guest");
	updateNavigationLinks();
}
//Shows the selected view panel, and hides any other visible panels.
function showView(viewName) 
{
	//Hide all other views.
	$("#viewHome").css("display", "none");
	$("#viewLogin").css("display", "none");
	$("#viewRegister").css("display", "none");
	$("#viewCreate").css("display", "none");
	
	//Show the selected view.
    $("#view" + viewName).css("display", "");
}

//---------------------------
//View invokers.
//---------------------------
function showLoginView() 
{
	//Check if logged in, in which case login should redirect to home.
	if(kinvey.LoggedStatus()&& kinvey.LoggedUsername() != "guest") { showHomeView(); return; }
	//Show the login view.
    showView("Login");
	//Reset the form.
    $('#formLogin').trigger('reset');
}
function showRegisterView() 
{
	//Check if logged in, in which case register should redirect to home.
	if(kinvey.LoggedStatus() && kinvey.LoggedUsername() != "guest") { showHomeView(); return; }
	//Show the register view.
    showView("Register");
	//Reset the form.
    $('#formRegister').trigger('reset');
}
function showHomeView()
{
	//Display the home view.
	showView("Home");
}
function showCreateView()
{
	//Check if not logged in, in which case redirect to home.
	if(!(kinvey.LoggedStatus() && kinvey.LoggedUsername() !="guest")) { showHomeView(); return; }
	//Display the creation view.
	showView("Create");
	//Reset the form.
	$('#formCreate').trigger('reset');
}
function showPostView(postid)
{
	//TODO
}
//---------------------------
//Messages
//---------------------------
function error(text)
{
    //TODO
	console.error(":( - " + text);
}
function message(text)
{
    //TODO
	console.log(":) - " + text)
}
