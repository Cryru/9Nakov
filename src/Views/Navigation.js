import React, { Component } from 'react';
import './Styles/Navigation.css';

export default class Navigation extends Component {
  render() {
      var kinvey = this.props.kinvey;

      if(kinvey.LoggedUsername() === "guest" || kinvey.LoggedStatus() === false)
      {
        return (
        <header className="navigation">
          <div>
      		  <NavItem id="linkHome" text="Home" clickEvent={this.props.homeClicked}/>
            <NavItem id="linkLogin" text="Login" clickEvent={this.props.loginClicked}/>
            <NavItem id="linkRegister" text="Register" clickEvent={this.props.registerClicked}/>
            <div className="usertext" id="loggedInUser"></div>
          </div>
        </header>
        );
      }
      else
      {
        return (
          <header className="navigation">
            <div>
      		    <NavItem id="linkHome" text="Home" clickEvent={this.props.homeClicked}/>
              <NavItem id="linkCreate" text="Create Post" clickEvent={this.props.createClicked}/>
              <NavItem id="linkLogout" text="Logout" clickEvent={this.props.logoutClicked}/>
      		    <div className="usertext" id="loggedInUser">{this.props.kinvey.LoggedUsername()}</div>
          </div>
        </header>
      );
      }
  }
}

class NavItem extends Component {
  render() {
    return (
      		<a className="navitem" id={this.props.id} onClick={this.props.clickEvent}>{this.props.text}</a>
    );
  }
}
