import React, { Component } from 'react';
import Header from '../header'
import Navigation from '../navigation'
import ApiService from './../../../services/api'
import { withRouter } from "react-router-dom"
import Loader from '../../components/simpleloader'
import Title_head from './../page_title_head'
// import Footer from './../footer'
import { Row, Col, Card } from 'react-bootstrap'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Notifications, { notify } from 'react-notify-toast'
import Login_form from  './login_form'
import './login.css'

let path = window.location.pathname
let storeName = path.split('/')[1];

class Login extends Component {

  state = {
    storeDetails: {},
    loading: true,
    forgotPasswordModal: false,
    email: '',
    emailSent: ''
  }

  componentDidMount() {
    this.checkLogin()
    ApiService.getBusinessProfbyUrl(storeName)
    .then(res => res.json())
    .then(response => {
      if (response.status == 200) {
        this.setState({
          storeDetails: response.response,
          loading: false
        })
      } else {
        this.props.history.push('/')
      }
    })
    .catch(function (error) {
      console.log('err-', error)
    })
  }

  loginData = (userdata) => {
    this.props.history.push(`profile`)
  }

  checkLogin = () => {
    let data = localStorage.getItem('guest-userdata')
    if(JSON.parse(data))
      this.props.history.push('profile')
  }

  toggleModal = () => {
    this.setState({forgotPasswordModal: !this.state.forgotPasswordModal})
  }

  resetPass = () => {
    this.setState({loading: true})
    ApiService.forgot_password_guest(this.state.email)
    .then(res => {
      this.setState({loading: false, emailSent: 'New password has been sent to your email address !'})
      console.log("res", res);
      
    })
  }

  render() {
    return (
        <div>
        {this.state.storeDetails != null &&
           <Header
           storebanner = {this.state.storeDetails.storebanner}
           rating = {4.7}
           votes = {75}
           businessname = {this.state.storeDetails.businessname}
           address = {this.state.storeDetails.address}
           phone = {this.state.storeDetails.phone}
           modalShow = {this.state.timeModal}
           timings = {this.state.storeDetails.timings}
           closedon = {this.state.storeDetails.closedon}
         />
        }
       <Notifications />
       <Title_head title = "Login" fa_icon_class ="fas fa-user-plus"/>
       <Loader loading={this.state.loading} background='no-fill' />
       <div className="page-container">
        <Row className="login-row">
          <Col lg={4} xs={0} sm={3}></Col>
          <Col lg={4} xs={12} sm={6}>
            <Login_form redirect="profile" callback={(userdata) => this.loginData(userdata)}/>
            <p style={{marginTop: 20, textAlign: 'center'}}>Forgot your password ? <a onClick={() => this.setState({forgotPasswordModal: true})} href="javascript:void()">Click here</a></p>
          </Col>
          <Col lg={4} xs={0} sm={3}></Col>
        </Row>
       
       </div>
       {/* <Footer/> */}
       <Navigation 
        nav = {this.props.history}
        store= {storeName}
        storeData = {this.state.storeDetails}
      />

      <Modal isOpen={this.state.forgotPasswordModal} toggle={this.toggleModal}>
        <ModalHeader toggle={this.toggleModal }>Forgot password </ModalHeader>
        <ModalBody>
          <div>
            <label>Email: </label><br></br>
            <input type="text" placeholder="Enter your email" onChange={(e) => this.setState({email: e.target.value})}/>
          </div>
          <p style={{color: 'green', marginTop: 10}}>{this.state.emailSent}</p>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.resetPass}>Reset password</Button>{' '}
          <Button color="secondary" onClick={this.toggleModal}>Close</Button>
        </ModalFooter>
      </Modal>

      </div>
    );
  }
}

export default withRouter(Login)
