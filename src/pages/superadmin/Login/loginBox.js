import React, { Component } from 'react';
import ApiService from './../../../services/api'

export default class LoginBox extends Component {
  
  state = {
    email: '',
    password: '',
    error: false,
    errorCred: false
  }

  onChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    this.setState({[name]: value, error: false, errorCred: false})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const {email, password} = this.state
    if(email == '' || password == "") {
      this.setState({error: true})
    } else {
      const data = {
        email, password
      }
      ApiService.sa_login(data)
      .then(res => {
        if(res.status == 200) {
          this.props.loginResponse(res)
        } else {
          this.setState({errorCred: true})
        }
      })
    }
  }

  render() {
    const { error, errorCred } = this.state
    return (
      <div className="box-container">
       <img src={require('./../../../images/like-logo.png')} height={100} width={100} />
        <h4 className="header-text"> Login <sub>Superadmin</sub> </h4>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input type="email" name="email" onChange={this.onChange} placeholder="Email address" /><br></br>
          </div>
          
          <div>
            <input type="password" name="password" onChange={this.onChange} placeholder="Password" /><br></br>
          </div>
          {error &&
            <div style={{color: 'red', textAlign: 'center'}}>Both fields are required</div>
          }
           {errorCred &&
            <div style={{color: 'red', textAlign: 'center'}}>Invalid credentials supplied !</div>
          }
          <input type="submit" value="Login" />
        </form>
      </div>
    );
  }
}
