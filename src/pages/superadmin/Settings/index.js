import React, { Component } from "react"
import { Row, Col, Modal } from 'react-bootstrap';
import Loader from './../../components/simpleloader'
import ApiService from "../../../services/api";
import { withRouter } from "react-router-dom"

class Settings extends Component {

  state = {
    loading: false,
    email: '',
    password: '',
    done: false, 
    done2: false,
    show: false,
    error: ''
  }

  changeField = (e) => {
    const name = e.target.name
    const value = e.target.value

    this.setState({ [name]: value })
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.setState({ loading: true })
    const data = {
      email: this.state.email,
      password: this.state.password
    }
    ApiService.superadmin_login_edit(data)
      .then(res => {
        if (res.status == 200) {
          this.setState({ loading: false, done: true })
          setTimeout(() => {
            localStorage.removeItem('sa-authtoken')
            localStorage.removeItem('sa-username')
            localStorage.removeItem('sa-userdata')

            this.props.history.push('/sa_login')
          }, 5000)
        }
      })
  }

  reset = () => {
    this.setState({show: true})
  }

  handleClose = () => {
    this.setState({show: false})
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

  render() {
    const { done } = this.state
    return (
      <div style={{ margin: 15 }}>
        <div className="page-container">
          <Loader loading={this.state.loading} background='no-fill' />
          <h5 className="heading-text"><i className="fas fa-chart-bar"></i> Setting</h5>
          <hr></hr>

          <div className="content">
            <Row>
              <Col></Col>
              <Col>
                <p>Update super admin login information</p>
                {done && <p style={{ color: 'green' }}>Login details has been updated successfully ! Please login again</p>}
                <form onSubmit={this.onSubmit}>
                  <div>
                    <label>Email</label>
                    <input type="text" name="email" placeholder="Email address" onChange={this.changeField} required />
                  </div>

                  <div>
                    <label>Password</label>
                    <input type="password" name="password" placeholder="please enter password" onChange={this.changeField} required />
                  </div>

                  <button type="submit" style={{ marginTop: 10, backgroundColor: 'orange', color: '#fff', width: "95%" }} className="">Save</button>
                </form>

                <p style={{ marginTop: 20 }}>Forgot superadmin password ? <a style={{ cursor: 'pointer', color: 'blue' }} onClick={this.reset}>Reset now</a></p>
              </Col>
              <Col></Col>
            </Row>
          </div>


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
      </div>
    )
  }

}

export default withRouter(Settings)