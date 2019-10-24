import React, { Component } from 'react';
import Header from '../header'
import Navigation from '../navigation'
import ApiService from './../../../services/api'
import { withRouter } from "react-router-dom"
import Loader from '../../components/simpleloader'
import Title_head from './../page_title_head'
// import Footer from './../footer'
import { Row, Col, Card, Button } from 'react-bootstrap'
import Notifications, { notify } from 'react-notify-toast'
import Login_form from  './login_form'
import './login.css'

let path = window.location.pathname
let storeName = path.split('/')[1];

class Login extends Component {

  state = {
    storeDetails: {},
    loading: true
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

      </div>
    );
  }
}

export default withRouter(Login)
