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
              </Col>
              <Col></Col>
            </Row>
          </div>
        </div>
      </div>
    )
  }

}

export default withRouter(Settings)