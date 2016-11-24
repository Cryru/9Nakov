/**
 * Created by Lucifer on 24-Nov-16.
 */

$('#buttonLoginUser').click(login);
function login (){
    let username = $('.username').val();
    let password = $('.passwd').val();
    kinvey.Login(username,password,successLogin,errorLogin);
}
function successLogin(response) {
    //TODO
}
function errorLogin(response){
    //TODO
}
