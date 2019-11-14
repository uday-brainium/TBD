import React, { Component } from 'react';
import LoginBox from './loginBox'
import { Modal } from 'react-bootstrap';
import ApiService from './../../../services/api'
import Loader from './../../components/simpleloader'
import './style.css'

export default class Login extends Component {

  state = {
    show: false,
    done: false,
    done2: false,
    loading: false,
    resetEmail: ''
  }

  loginRes = (res) => {
    if(res.status == 200) {
      this.saveLocalData(res.response).then(res => {
        this.props.history.push('/sa_main_page')
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

  reset = () => {
    this.setState({show: true})
  }

  changeField = (e) => {
    const name = e.target.name
    const value = e.target.value

    this.setState({ [name]: value })
  }

  resetPassword = (e) => {
    this.setState({loading: true})
    e.preventDefault()
    const email = this.state.resetEmail
    ApiService.reset_sa_password(email)
    .then(res => {
      if(res.status == 200) {
        this.setState({loading: false, done2: true})
      } else {
        this.setState({loading: false, error: 'Email does not exist !'})
      }
    })
  }

  handleClose = () => {
    this.setState({show: false})
  }


  render() {
    return (
      <div className="login-container">
        <Loader loading={this.state.loading} />
        <LoginBox loginResponse={(res) => this.loginRes(res)} reset={this.reset}/>

        <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Password reset</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <div>
                {this.state.done2 && <p style={{color: 'green'}}>Password has been reset, new login credentials has been sent to your email.</p>}
                <p style={{color: 'red'}}>{this.state.error}</p>
                <form onSubmit={this.resetPassword}>
                  <div>
                    <label>Email address</label><br></br>
                    <input style={{width: '100%'}} name="resetEmail" placeholder="Email address" onChange={this.changeField} />
                  </div>

                  <button style={{ marginTop: 10, backgroundColor: 'orange', color: '#fff', width: "95%"}} name="submit">Reset password</button>
                </form>
              </div>
            </Modal.Body>
          </Modal>
      </div>
    );
  }
}
