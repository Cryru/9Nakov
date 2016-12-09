/**
 * Created by Lucifer on 30-Nov-16.
 */
function getPosts(kinvey,Callback,CallError)
{
    //Send a request to kinvey to get all posts.
    kinvey.GetData('Memes/_count', undefined, Callback,CallError)
}
function getOnePost(kinvey,postID,Callback,CallError){
    //Send a request to kinvey to get a specific post by id
    kinvey.GetData("Memes", postID, Callback, CallError);
}
function getPostRange(kinvey,limit,skip,Callback,CallError) {
    //Send a request to get several posts
    kinvey.GetData(`Memes?query={}&limit=${limit}&skip=${skip}`, undefined, Callback, CallError);
}
function getComments(kinvey,Callback,CallError){
    //Send a request to get all comments
    kinvey.GetData("comments",undefined,Callback,CallError);
}
function deletePost(kinvey,postID,Callback,CallError){
    //Send a request to delete a post by given id
    kinvey.DeleteData("Memes", postID, Callback, CallError);
}
function deleteComment(kinvey,commentID,Callback,CallError){
    //Send a request to delete a specific comment by given id
    kinvey.DeleteData("comments",commentID,Callback,CallError);
}
function createComment(kinvey,commentInfo,Callback){
    //Send a request to create a comment
    kinvey.CreateData("comments",commentInfo,Callback);
}
function createPost(kinvey,obj,Callback,CallError){
    //send a request to create a post by given the post as object
    kinvey.CreateData("Memes",obj,Callback,CallError);
}
function updatePost(kinvey,postID,obj,Callback,CallError){
    //Send a request to update a post by given id and the post's info as an object
    kinvey.UpdateData("Memes",postID,obj,Callback,CallError);
}
function updateComment(kinvey,commentID,obj,Callback,CallError){
    //Send a request to update a comment by given id and the comment's info as an object
    kinvey.UpdateData("comments",commentID,obj,Callback,CallError);
}
export default {getPosts,
                getOnePost,
                getPostRange,
                getComments,
                deletePost,
                deleteComment,
                createComment,
                createPost,
                updatePost,
                updateComment}