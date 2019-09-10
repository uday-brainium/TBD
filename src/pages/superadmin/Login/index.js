import React, { Component } from 'react';
import LoginBox from './loginBox'
import './style.css'

export default class Login extends Component {

  loginRes = (res) => {
    if(res.status == 200) {
      this.saveLocalData(res.response).then(res => {
        this.props.history.push('/sa_dashboard')
      })
    } else {
      alert('Login failed')
    }
  }

  saveLocalData = (res) => {
    console.log("res", res);
    
    return new Promise(async (resolve, reject) => {
     await localStorage.setItem('sa-authtoken', res.token)
     await localStorage.setItem('sa-username', res.userName)
     await localStorage.setItem('sa-userdata', JSON.stringify(res))

     resolve('saved')
    })
  }

  render() {
    console.log("PROp", this.props);
    
    return (
      <div className="login-container">
        <LoginBox loginResponse={(res) => this.loginRes(res)}/>
      </div>
    );
  }
}
