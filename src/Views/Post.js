import React, { Component } from 'react';
import './Styles/Post.css';

export default class Post extends Component {
  render()
  {
    return (
      <div className="post" onClick={this.props.clickEvent.bind(this)}>
        <h1>{this.props.title}</h1>
        <img alt="" src={this.props.image}></img>
      </div>
    );
  }
}
