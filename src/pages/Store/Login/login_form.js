import React, { Component } from 'react';
import Loader from '../../components/simpleloader'
import Notifications, { notify } from 'react-notify-toast';
import { Alert } from 'react-bootstrap';
import "./login.css"
import ApiService from '../../../services/api';


 class Login_form extends Component {

  state = {
    loading: false,
    loginErr: '',
    email: '',
    password: ''
  }

  handleChange = (e) => {
    let name = e.target.name,
        val = e.target.value
    this.setState({[name]: val})
  }

  validate = () => {
   if(this.state.email == "") {
      this.setState({loginErr: 'Please enter password!'})
      return false
   } else if(this.state.password == '') {
      this.setState({loginErr: 'Please enter password!'})
      return false
   } else if(this.state.email == '' && this.state.password == '') {
    this.setState({loginErr: 'Please enter email & password'})
    return false
   } else {
    this.setState({loginErr: ''})
     return true
   }
  }

  savUserInfo = (data) => {
    localStorage.setItem('guest-userdata', JSON.stringify(data))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if(this.validate()) {
      this.setState({loading: true})
      let data = {
        email: this.state.email,
        password: this.state.password
      }
      ApiService.guest_login(data)
      .then(res => res.json())
      .then(response => {
        if(response.status == 200){
          this.setState({loading: false, loginErr: ''})
          notify.show('Login successful', 'success', 3000);
          this.savUserInfo(response.response)
          this.props.callback(response)
        } else {
          this.setState({loading: false, loginErr: response.message})
        }
      })
    } 

  }

  render() {
    let isLogged = JSON.parse(localStorage.getItem('guest-userdata'))

    return (
      <div className="login-form-container">
      <Notifications/>
      <Loader loading={this.state.loading} />
        {isLogged != null &&
          <div>
            <h4>You are already logged in !</h4>
            <button className="button">Profile</button>
          </div> 
        }
        {isLogged == null && 
         <div>
          <div className="login-header">Login</div>
          <div className="login-subtext">Login to accese all features</div>
          <form className="form" onSubmit={this.handleSubmit}>
            <div className="inputOuter">
              <input placeholder="Email address" type="text" name="email" onChange={this.handleChange} />
            </div>

            <div className="inputOuter">
              <input placeholder="Password" type="password" name="password" onChange={this.handleChange} />
            </div>

            {this.state.loginErr &&
              <Alert className="error-alert" variant='danger'>
              {this.state.loginErr}
              </Alert>
            }
            <input type="submit" className="button" name="submit" value="Login"/>
          </form>
        </div> }
      </div>
    );
  }
}

export default (Login_form)