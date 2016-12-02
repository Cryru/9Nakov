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
function getPostRange(kinvey,limit,skip,Callback,CallError) {
    kinvey.GetData(`Memes?query={}&limit=${limit}&skip=${skip}`, undefined, Callback, CallError);
}
function getComments(kinvey,Callback,CallError){
    kinvey.GetData("comments",undefined,Callback,CallError);
}
function deletePost(kinvey,postID,Callback,CallError){
    kinvey.DeleteData("Memes", postID, Callback, CallError);
}
function createComment(kinvey,commentInfo,Callback){
    kinvey.CreateData("comments",commentInfo,Callback);
}
export default {getPosts,getOnePost,getPostRange,getComments,deletePost,createComment}