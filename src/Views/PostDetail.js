import React, { Component } from 'react';
import './Styles/PostDetail.css';

export default class PostDetail extends Component {
  render() {

      if(this.props.data !== undefined)
      {
        //Define a button array.
        let buttons = [];

        //If the post was created by the logged in user, add edit and delete buttons.
        if(this.props.user === this.props.data._acl.creator)
        {
          buttons.push(<button key='1' onClick={this.props.editEvent.bind(this)}>Edit</button>);
          buttons.push(<button key='2' onClick={this.props.deleteEvent.bind(this)}>Delete</button>);
        }

        return <div>
				        <div id="postInfo">
					        <h1 id="postTitle">{this.props.data.title}</h1>
					        <img alt="" src={this.props.data.file}/></div>
                  {buttons}
				          <textarea id="commentText"></textarea>
				          <button onClick={this.props.commentEvent.bind(this)}>PostComment</button>
			          </div>
      }
      else
      {
        return <div></div>
      }
  }
}
