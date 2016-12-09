import React, { Component } from 'react';
import './Styles/RegisterView.css';
import './Styles/CreateView.css';
export default class CreateView extends Component {
  render() {
      return <div>
    					<h1 id="createHeader">Post</h1>
    					<form id="formCreate" onSubmit={this.props.createEvent}>
							<label id="addTitle">AddTitle</label>
							<br></br>
    						<input name="Title" type="text" id="creTitle" placeholder="Title" required />
							<br></br>
    						<label id="selectImage">Select an image:</label>
							<br></br>
    						<input name="File" type="file" id="creFile" accept="image/*" required />

    						<label id="maximumSize">Maximum: 9MB</label>
    						<input type="submit" value="Post!" />
    					</form>
    				</div>
  }
}
