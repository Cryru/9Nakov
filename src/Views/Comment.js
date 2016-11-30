import React, { Component } from 'react';
export default class Comment extends Component{
    render(){
        if(this.props.loggedUser === this.props.author){
            return <div id={this.props.id}>
                <h3>{this.props.author} commented: </h3>
                <p>{this.props.text}</p><br/>
                <button onClick={this.props.editCommentHandler.bind(this)}>Edit</button><button onClick={this.props.deleteCommentHandler}>Delete</button>
            </div>
        }else{
            return <div  id={this.props.id}>
                <h3>{this.props.author} commented: </h3>
                <p>{this.props.text}</p>
            </div>
        }

    }
}
