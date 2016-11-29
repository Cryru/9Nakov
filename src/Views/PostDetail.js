import React, { Component } from 'react';
import './Styles/PostDetail.css';


export default class PostDetail extends Component {
  render() {

      if(this.props.data !== undefined)
      {
        //Define a button array.
        let buttons=[];
        let comments=[];

        //If the post was created by the logged in user, add edit and delete buttons.
        if(this.props.user === this.props.data._acl.creator)
        {
          buttons = <div>
              <button onClick={this.props.editEvent.bind(this)}>Edit</button>
              <button onClick={this.props.deleteEvent.bind(this)}>Delete</button>
          </div>
        }
        if(this.props.comments===undefined||this.props.comments.length===0){
            comments.push(<div key="1">No Comments for this post</div>)
        }else{
            for (let i = 0; i < this.props.comments.length; i++)
            {
                comments.push(<Comment key={i} author={this.props.comments[i].author} text={this.props.comments[i].text}/>)
            }
        }

        return <div>
				        <div id="postInfo">
					        <h1 id="postTitle">{this.props.data.title}</h1>
                            {buttons}
					        <img alt="" src={this.props.data.file}/></div>

				          <textarea id="commentText"></textarea>
				          <button onClick={this.props.commentEvent.bind(this)}>PostComment</button>
                         {comments}
			          </div>
      }
      else
      {
        return <div></div>
      }
  }
}
