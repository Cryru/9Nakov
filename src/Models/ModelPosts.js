/**
 * Created by Lucifer on 30-Nov-16.
 */
function getPosts(kinvey,Callback,CallError)
{
    //Send a request to kinvey to get all posts.
    kinvey.GetData('Memes/_count', undefined, Callback,CallError)
}
function getOnePost(kinvey,postID,Callback,CallError){
    kinvey.GetData("Memes", postID, Callback, CallError);
}
export default {getPosts,getOnePost}