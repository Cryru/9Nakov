/**
 * Created by Lucifer on 24-Nov-16.
 */
$('#buttonRegisterUser').click(register);
function register (){
    let username = $('#username').val();
    let password = $('#passwd').val();
    kinvey.Register(username,password,successRegister,errorRegister);
}
function successRegister() {
    //TODO
}
function errorRegister(){
    //TODO
}