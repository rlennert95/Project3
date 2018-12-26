import React, { Component } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";
import Form from "./components/Form";

import SignUp from "./Routes/signup";

import {BrowserRouter, Route} from 'react-router-dom';

class App extends Component {
  state = {
    loggedIn: false
  }

  handleLogin = (event) => {
    event.preventDefault();
    console.log("login clicked!");
    axios.post("/login", {
      username: 'admin',
      password: 'password'
    })
      .then((response) => {
        console.log(response);
        this.setState({loggedIn: true, username: response.data.username });
      })
      .catch(function (error) {
        console.log(error);
      })
    // this.setState({ loggedIn: true});
  }

  

  componentDidMount() {
    console.log("componentDidMount lifecycle method ran!");
    // axios.get("allusers")
    //   .then(response => { console.log(response)});

    // Check session data to see if user should be logged in

    axios.get("/user_data")
    .then(response => {
      console.log(response);
      if (response.data.loggedIn) {
        this.setState({loggedIn: true, username: response.data.username });
      } else {
        console.log("No logged in user stored in session");
      }
    });
  }

  render() {
    let banner = this.state.loggedIn ? `Woah! ${this.state.username} logged in!` : "UNAUTHORIZED USER";
    return (
      <div className="App">
        <h1>{banner}</h1>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Hello, welcome to Saturday's Live Coded Demo!</h2>
        </div>
       
        <BrowserRouter>
        <div>
          <Route exact={true} path='/signup' render={() => (
            <div className="App">
              <SignUp />
            </div>
          )}/>
        </div>
      </BrowserRouter>
        <p className="App-intro">
          {!this.state.loggedIn ?
            (<button onClick={this.handleLogin}>Log In To Application</button>) : ""}
        </p>
        <p> <a href="/SignUp">Sign Up HERE</a>
          </p>
      </div>
    );
  }
}

export default App;
