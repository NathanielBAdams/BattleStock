import React, { Component } from 'react';
import './App.css';
import { hot } from 'react-hot-loader';
import Container from './Container.js';
import StockDropdown from './StockDropdown';
const User = require('../server/models/userModel');
// const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const fetch = require('node-fetch');

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      favs: [],
      loggedIn: false,
      message: 'Sign up to save your favorite Stocks!'
    };
    this.logIn = this.logIn.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  logIn() {
    const username = document.getElementById('username-input').value;
    const password = document.getElementById('password-input').value;
    if (!password || !username) {
      this.setState({
        ...this.state,
        message: "Something's wrong with your username or password! Try again"
      });
      return;
    }
    console.log(username, password, 'in log in method inside navbar component');
    const user = {
      username: username,
      password: password
    };
    const url = `login?username=${username}&password=${password}`;
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' }
    })
      .then((res) => res.json()) // expecting a json response
      .then((data) => {
        // do things with data here
        console.log(data.favs, 'current favorites');
        if (data.userVerified) {
          this.setState({
            username: data.username,
            favs: data.favs,
            loggedIn: true,
            message: `User "${data.username}" successfully logged in!`
          });
        } else {
          this.setState({
            ...this.state,
            message: 'Log in failed! Try signing up.'
          });
        }
      });
  }
  signUp() {
    const username = document.getElementById('username-input').value;
    const password = document.getElementById('password-input').value;
    if (!password || !username) {
      this.setState({
        ...this.state,
        message: "Something's wrong with your username or password! Try again"
      });
      return;
    }
    // console.log(username, password, 'in signup method inside navbar component');
    const user = {
      username: username,
      password: password
    };
    const url = `signup?username=${username}&password=${password}`;
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' }
    })
      .then((res) => res.json()) // expecting a json response
      .then((data) => {
        // do things with data here
        console.log(data);
        this.setState({
          username: data.username,
          favs: data.favs,
          loggedIn: true,
          message: `User "${data.username}" successfully signed up!`
        });
      })
      .catch((err) => {
        this.setState({
          ...this.state,
          message: 'Something went wrong.'
        });
      });
  }
  showFavs() {
    console.log('show favs');
  }

  render() {
    const data = [];
    if (!this.state.loggedIn) {
      data.push(<input className="navbar-input" id="username-input" type="text" placeholder="Username" />);
      data.push(<input className="navbar-input" id="password-input" type="text" placeholder="Password" />);
      data.push(
        <button className="logIn-btn navbar-btn" onClick={() => this.logIn()}>
          Log in
        </button>
      );
      data.push(
        <button className="signUp-btn navbar-btn" onClick={() => this.signUp()}>
          Sign up
        </button>
      );
    }
    return (
      <div id="navbar-container">
        <div className="navbar">
          {data}
          <h4 className="login-msg">{this.state.message}</h4>
        </div>

        <div>
          <Container username={this.state.username} loggedIn={this.state.loggedIn} favs={this.state.favs} />
        </div>
      </div>
    );
  }
}

export default hot(module)(Navbar);
