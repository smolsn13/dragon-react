import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super()
    this.state = {
      email: '',
      password: ''
    }
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value})
  }
  handlePasswordChange(e) {
    this.setState({ password: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.post('/auth/login', {
      email: this.state.email,
      password: this.state.password
    }).then( result => {
      console.log(result.data)
      localStorage.setItem('mernToken', result.data.token)
      this.props.liftToken(result.data)
    }).catch( err => console.log(err) )
  }

  render() {
    return (
      <div id='loginBox'>
        <form onSubmit={this.handleSubmit}>
            <div class="form-group"> 
              <label for='emailLogin'>Email</label> 
              <br/>
              <input type='text' id='emailLogin' value={this.state.email} onChange={this.handleEmailChange} /><br />
            </div>  
            <div class="form-group"> 
              <label for='passwordLogin'>Password</label> 
              <br/>
              <input type='password' id='passwordLogin' value={this.state.password} onChange={this.handlePasswordChange} /><br />
            </div> 
            <button type="submit" class="btn btn-primary">Login</button>
        </form>
      </div>
    )
  }
}
export default Login;
