/**
 * Created by Lucifer on 23-Nov-16.
 */
  const appKey = "kid_SyCmuImMl";
  const appSecret = "f55fee035573491d8a4f32e3a11f3bc4";


 let kinvey = new Kinvey(appKey,appSecret);
localStorage.setItem('language', 'en');
function startApp() {
    sessionStorage.clear(); // Clear user auth data
    showHideMenuLinks();
    showView('viewHome');
    // Bind the navigation menu links
    $("#linkHome").click(showHomeView);

    // Bind the form submit buttons
    $("#buttonLoginUser").click(loginUser);

}
$("#linkHome").click(showHomeView);
$("#linkLogin").click(showLoginView);
$("#linkRegister").click(showRegisterView);
$("#linkLogout").click(logoutUser);
$("#createPost").click(showCreatePost);

// Bind the form submit buttons
$("#buttonLoginUser").click(loginUser);
$("#buttonRegisterUser").click(registerUser);

function showLoginView() {
    showView('login');
    $('#formLogin').trigger('reset');
}
function showView(viewName) {
    //TODO
}
function error(message){
    //TODO
}
function success(message){
    //TODO
}
