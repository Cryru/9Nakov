//The kinvey controller as defined by SoulKinvey.js
let kinvey = {};

//Load when ready.
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
	
	//Load home page.
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
	
	//Check if logged in, but not as guest.
	if(kinvey.LoggedUsername() != "guest")
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
	
	//Check if not logged in.
	guestLoginUpdate();
}
//Logs in with guest credentials if not logged in.
function guestLoginUpdate()
{
	if(kinvey.LoggedStatus() == false)
	{
		kinvey.Login("guest","guest");
	}
}

//Logs the user out, and redirects back to home.
function logout()
{
	//Log curent user out.
	kinvey.Logout();
	loading("Logging out...");
	//Log guest in.
	kinvey.Login("guest","guest", (function() 
	{  
		//Redirect to home.
		showView("Home");
		//Update navigation links to show as not logged in.
		updateNavigationLinks();
		//Display message.
		message("Logged Out");
	}));
}
//Shows the selected view panel, and hides any other visible panels.
function showView(viewName) 
{
	clearView();
	window["view" + viewName]();
	window["controller" + viewName]();
	return;
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
	//Logged users should not be able to login again.
	if(kinvey.LoggedUsername() != "guest") { showHomeView(); return; }
	//Show the login view.
    showView("Login");
}
function showRegisterView() 
{
	//Logged users should not be able to register.
	if(kinvey.LoggedUsername() != "guest") { showHomeView(); return; }
	
	//Show the register view.
    showView("Register");;
}
function showHomeView()
{
	//Display the home view.
	showView("Home");
}
function showCreateView()
{
	//Non-logged users should not be able to post.
	if(kinvey.LoggedUsername() == "guest") { showHomeView(); return; }
	
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
function loading(text)
{
	//TODO
}
