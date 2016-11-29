import React, { Component } from 'react';
import './Styles/RegisterView.css';

export default class CreateView extends Component {
  render() {
      return <div>
    					<h1>Post</h1>
    					<form id="formCreate" onSubmit={this.props.createEvent}>
    						<input name="Title" type="text" id="creTitle" placeholder="Title" required />
    						<label>Select an image:</label>
    						<input name="File" type="file" id="creFile" accept="image/*" required />
    						<label>Maximum: 9MB</label>
    						<input type="submit" value="Post!" />
    					</form>
    				</div>
  }
}
