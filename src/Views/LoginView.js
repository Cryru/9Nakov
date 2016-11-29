import React, { Component } from 'react';
import './Styles/LoginView.css';

export default class LoginView extends Component {
  render() {
      return <div>
    					<h1>Login</h1>
    					<form id="formLogin" onSubmit={this.props.loginEvent}>
    						<input name="Username" type="text" id="loginUsername" placeholder="Username" required />
    						<input name="Password" type="password" id="loginPassword" placeholder="Password" required />
    						<input type="submit" value="Login"/>
    						Not registered? <a>Click here to register.</a>
    					</form>
    				</div>
  }
}
