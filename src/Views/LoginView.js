import React, { Component } from 'react';
import './Styles/LoginView.css';

export default class LoginView extends Component {
    render() {
        return <div>

			<form id="formLogin" onSubmit={this.props.loginEvent}>
				<h1>Login</h1>
				<input name="Username" type="text" id="loginUsername" placeholder="Username" required />
				<input name="Password" type="password" id="loginPassword" placeholder="Password" required />
				<input type="submit" value="Login"/><br/>
				Not registered? <a onClick={this.props.registerHereHandler}>Click here to register.</a>
			</form>
		</div>
    }
}
