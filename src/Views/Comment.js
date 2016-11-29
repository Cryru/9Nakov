import React, { Component } from 'react';
class Comment extends Component{
    render(){
        return <div>
            <h3>{this.props.author} commented: </h3>
            <p>{this.props.text}</p>
        </div>
    }
}