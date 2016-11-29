import React, { Component } from 'react';
import './Styles/RegisterView.css';

export default class RegisterView extends Component {
  render() {
      return <div>
    				<h1>Register</h1>
    					<form id="formRegister" onSubmit={this.props.registerEvent}>
    						<input name="Username" type="text" id="regUsername" placeholder="Username" required />
    						<input name="Password" type="password" id="regPassword" placeholder="Password" required />
    						<input name="PasswordConfirm" type="password" id="regPasswordConf" placeholder="Password Confirm" required />
    						<input type="submit" value="Register" />
    						Already registered? <a>Click here to login.</a>
    					</form>
    				</div>
  }
}
