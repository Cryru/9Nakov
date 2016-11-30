import React, { Component } from 'react';
import './Styles/Comment.css';
export default class Comment extends Component{
    render(){
        if(this.props.loggedUser === this.props.author){
            return <div className="comment" id={this.props.id}>
                <h3>{this.props.author}:</h3>
                <span>{this.props.text}</span>
                <div>
                    <button onClick={this.props.editCommentHandler.bind(this)}>Edit</button>
                    <button onClick={this.props.deleteCommentHandler}>Delete</button>
                </div>

            </div>
}else{
    return <div  className="comment" id={this.props.id}>
        <h3>{this.props.author}:</h3>
        <span>{this.props.text}</span>
    </div>
}

}
}
