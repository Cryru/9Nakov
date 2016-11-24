/**
 * Created by Lucifer on 24-Nov-16.
 */
     // Should remove later
    // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
const appKey = "kid_SyCmuImMl";
const appSecret = "f55fee035573491d8a4f32e3a11f3bc4";
let kinvey = new Kinvey(appKey,appSecret);
kinvey.Login("Admin","Admin",successPost,errorPost);
// Никва идея защо не работи тва ---- > $('.postButton').click(createPost());

function createPost(){
console.log("aye ei");
    let  picture = $('.picture').val();
    let title = $('.title').val();
    let post = {
        title:title,
        picture:picture
    };
console.log(post);
    kinvey.CreateData("Memes",post,successPost,errorPost);
}
function successPost(response){
    //TODO
}
function errorPost(response) {
    //TODO
}