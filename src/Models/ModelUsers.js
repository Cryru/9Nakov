/**
 * Created by Lucifer on 30-Nov-16.
 */

function loginGuest(kinvey,Callback,CallError){
    kinvey.Login("guest","guest",Callback,CallError);
}
function loginUser(kinvey,userName,userPassword,Callback,CallError){
    kinvey.Login(userName, userPassword,Callback, CallError);
}
function registerUser(kinvey,userName,userPassword,Callback,CallError){
    kinvey.Register(userName, userPassword,Callback, CallError);
}
function logOut(kinvey){

    kinvey.Logout()
}
function loggedUsername(kinvey){

    return kinvey.LoggedUsername();
}
function loggedID(kinvey) {
    kinvey.LoggedID();
}
function loggedStatus(kinvey){

    kinvey.LoggedStatus();
}
export default {loginGuest,loginUser,registerUser,logOut,loggedUsername,loggedID,loggedStatus};