import React, { Component } from 'react';
import './App.css';
import Signup from './Signup';
import Login from './Login';
import Landing from './Landing';

import Navbar from './Navbar';
import Products from './Products';
import { UserProfile } from './UserProfile';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super()
    this.state = {
      token: '',
      user: {}
    }
    this.liftTokenToState = this.liftTokenToState.bind(this)
    this.logout = this.logout.bind(this)
  }

  liftTokenToState(data) {
    console.log("THIS LIFTS TOKEN TO STATE")
    this.setState({
      token: data.token,
      user: data.user
    })
  }

  logout() {
    console.log("Logging out")
    localStorage.removeItem('mernToken')
    this.setState({token: '', user: {}})
  }

  componentDidMount() {
    var token = localStorage.getItem('mernToken')
    if (token === 'undefined' || token === null || token === '' || token === undefined) {
      localStorage.removeItem('mernToken')
      this.setState({
        token: '',
        user: {}
      })
    } else {
      axios.post('/auth/me/from/token', {
        token: token
      }).then( result => {
        localStorage.setItem('mernToken', result.data.token)
        this.setState({
          token: result.data.token,
          user: result.data.user
        })
      }).catch( err => console.log(err) )
    }
  }

  render() {
    let theUser = this.state.user
    console.log('this is in app.js:', theUser)
    if (typeof theUser === 'object' && Object.keys(theUser).length > 0) {
      return (
        <div>
          <UserProfile user={theUser} logout={this.logout} />
          <Navbar user={theUser} logout={this.logout}/>
          <Landing user={theUser} logout={this.logout}/>

        </div>
      )
    } else {
      let loginButton = <button id='landingButton2' className="btn btn-primary btn-xl text-uppercase js-scroll-trigger" data-toggle="modal" data-target="#loginModal">Log In</button>
      let signupButton = <button id='landingButton3' className="btn btn-primary btn-xl text-uppercase js-scroll-trigger" data-toggle="modal" data-target="#signupModal">Sign Up</button>
      
      return (
        <div className="App">
          <div id="loginSignup">
            <Signup liftToken={this.liftTokenToState} />
            <Login liftToken={this.liftTokenToState} />
          </div>
          <Navbar />

          <Landing loginButton={loginButton} signupButton={signupButton}/>

          <Landing />
          <Products />

        </div>
      )
    }
  }
}

export default App;
