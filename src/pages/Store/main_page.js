import React, { Component } from "react";
import ReactDOM from 'react-dom'
import { Route, Link, Redirect, withRouter } from "react-router-dom"
import { Button, Modal, Row, Col } from 'react-bootstrap';
import moment from 'moment';
import LinesEllipsis from 'react-lines-ellipsis'
import noUserImage from './../../images/profile-no-image.jpg'
import foodImage from './../../images/food.jpg'
import { Base_url } from './../../utilities/config'
import ApiService from './../../services/api'
import Loader from './../components/simpleloader'
import './../../styles/style_sheet.css'
import './store.css'
import Header from './header'
import Navigation from './navigation'

let path = window.location.pathname
let extension = path.substring(1)
var _ = require('lodash');


class Main_page extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      storeDetails: {},
      loading: true,
      timeModal: false,
      overlayStyle: {
        'display': 'none'
      },
      dummyText : "Fabulous food! We had ordered Clay pot chicken, Steamed Bhetki,mei fun noodles, yong chow fried rice. Annirudha our host suggested that we have the fried rice just with egg.",
      read_more1: 0,
      read_more2: 0,
      read_more3: 0
    }
  }

  componentDidMount() {
    this.setState({ loading: true })
    let path = window.location.pathname
    let extension = path.substring(1)
   
      ApiService.getBusinessProfbyUrl(extension)
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
        console.log('err---------', error)
      })
   
  }

  onEventClick = () => {
    this.props.history.push({
      pathname: `/${extension}/events/`,
      state: this.state.storeDetails
    })
  }

  
  render() {
    return (
      <div>
        <div className="backoverlay" onClick={this.hideOverlay} style={this.state.overlayStyle}></div>
        <Loader loading={this.state.loading} background='fill' />
         <Header 
          storebanner = {this.state.storeDetails.storebanner}
          rating = {4.7}
          votes = {67}
          businessname = {this.state.storeDetails.businessname}
          address = {this.state.storeDetails.address}
          phone = {this.state.storeDetails.phone}
          modalShow = {this.state.timeModal}
          timings = {this.state.storeDetails.timings}
          closedon = {this.state.storeDetails.closedon}
         />
        <div className="post_type_div">
        <div className="container">
          <Row>
            <Col md={4} s={4} xs={12}>
                <div className="singleProfile">
                    <div className="top_detail">
                          <Row>
                            <Col md={8} sm={8} xs={12}>
                                <div className="photo"><img src="http://portal.bilardo.gov.tr/assets/pages/media/profile/profile_user.jpg" alt="" /></div>
                                <div className="name-add-time">
                                    <h4>Prakash roy</h4>
                                    <p>Kolkata, India</p>
                                    <p>29 June 2017</p>
                                </div>
                            </Col>
                            <Col md={4} sm={4} xs={12}>
                                <div className="post_detail">
                                    <div className="postedinfacebook"><i className="fab fa-facebook" area-hidden='true'></i></div>
                                </div>
                            </Col>
                        </Row>
                    </div>
        
                    <div className="post_img"><img src="https://media.istockphoto.com/photos/health-food-for-fitness-picture-id855098134?k=6&m=855098134&s=612x612&w=0&h=eIWWpYWKTz_z2ryYAo0Dd97igUZVExzl4AKRIhUrFj4=" /></div>
                    <div className='body-content'>
                      <div className="post_middle_sec">
                         
                          <LinesEllipsis
                            text={this.state.dummyText}
                            maxLine={this.state.read_more1 == 0 ? 3 : this.state.read_more1}
                            ellipsis=' . . .'
                            trimRight 
                            basedOn='letters'
                          />
                           <span style={{color: 'blue', fontSize: 12}} onClick={() => this.setState({read_more1: this.state.read_more1 > 3 ? 3 : 10})}> { this.state.read_more1 == 0 || this.state.read_more1 == 3 ? 'Read more' : 'read less'} </span>
                          
                      </div>
                    </div>

                    <div className="post_reaction_box">
                      <Row>
                        <Col md={6} sm={8} xs={6}>
                            <ul>
                              <li><a href="#" className="reaction-icon"><img src={require('./../../images/like-logo.png')} /></a></li>
                              <li><a href="#" className="reaction-icon"><img src={require('./../../images/smile.png')} /></a></li>
                              <li><a href="#" className="reaction-icon"><img src={require('./../../images/fire.png')} /></a></li>
                            </ul>
                        </Col>
                        <Col  md={6} sm={4} xs={6}>
                            <div className="reactions">17 Reactions</div>
                        </Col>
                        </Row>
                      </div>
                  </div>
            </Col>
            <Col md={4} s={4} xs={12}>
                <div className="singleProfile">
                    <div className="top_detail">
                          <Row>
                            <Col md={8} sm={8} xs={12}>
                                <div className="photo"><img src="http://portal.bilardo.gov.tr/assets/pages/media/profile/profile_user.jpg" alt="" /></div>
                                <div className="name-add-time">
                                    <h4>Arundhuti Das</h4>
                                    <p>Kolkata, India</p>
                                    <p>29 June 2017</p>
                                </div>
                            </Col>
                            <Col md={4} sm={4} xs={12}>
                                <div className="post_detail">
                                    <div className="postedinfacebook"><i className="fab fa-facebook" area-hidden='true'></i></div>
                                </div>
                            </Col>
                        </Row>
                    </div>
        
                    <div className="post_img"><img src="https://media.istockphoto.com/photos/health-food-for-fitness-picture-id855098134?k=6&m=855098134&s=612x612&w=0&h=eIWWpYWKTz_z2ryYAo0Dd97igUZVExzl4AKRIhUrFj4=" /></div>
                    <div className='body-content'>
                      <div className="post_middle_sec">
                        
                          <LinesEllipsis
                            text={this.state.dummyText}
                            maxLine={this.state.read_more2 == 0 ? 3 : this.state.read_more2}
                            ellipsis=' . . .'
                            trimRight 
                            basedOn='letters'
                          />
                           <span style={{color: 'blue', fontSize: 12}} onClick={() => this.setState({read_more2: this.state.read_more2 > 3 ? 3 : 10})}> { this.state.read_more2 == 0 || this.state.read_more2 == 3 ? 'Read more' : 'read less'} </span>
                        
                      </div>
                    </div>
                    
                    <div className="post_reaction_box">
                      <Row>
                        <Col md={6} sm={8} xs={6}>
                            <ul>
                            <li><a href="#" className="reaction-icon"><img src={require('./../../images/like-logo.png')} /></a></li>
                              <li><a href="#" className="reaction-icon"><img src={require('./../../images/smile.png')} /></a></li>
                              <li><a href="#" className="reaction-icon"><img src={require('./../../images/fire.png')} /></a></li>
                            </ul>
                        </Col>
                        <Col  md={6} sm={4} xs={6}>
                            <div className="reactions">17 Reactions</div>
                        </Col>
                        </Row>
                      </div>
                  </div>
            </Col>
            <Col md={4} s={4} xs={12}>
                <div className="singleProfile">
                    <div className="top_detail">
                          <Row>
                            <Col md={8} sm={8} xs={12}>
                                <div className="photo"><img src="http://portal.bilardo.gov.tr/assets/pages/media/profile/profile_user.jpg" alt="" /></div>
                                <div className="name-add-time">
                                    <h4>Uday kumar</h4>
                                    <p>Kolkata, India</p>
                                    <p>29 June 2017</p>
                                </div>
                            </Col>
                            <Col md={4} sm={4} xs={12}>
                                <div className="post_detail">
                                    <div className="postedinfacebook"><i className="fab fa-facebook" area-hidden='true'></i></div>
                                </div>
                            </Col>
                        </Row>
                    </div>
        
                    <div className="post_img"><img src="https://media.istockphoto.com/photos/health-food-for-fitness-picture-id855098134?k=6&m=855098134&s=612x612&w=0&h=eIWWpYWKTz_z2ryYAo0Dd97igUZVExzl4AKRIhUrFj4=" /></div>
                    <div className='body-content'>
                      <div className="post_middle_sec">
                        
                          <LinesEllipsis
                            text={this.state.dummyText}
                            maxLine={this.state.read_more3 == 0 ? 3 : this.state.read_more3}
                            ellipsis=' . . .'
                            trimRight 
                            basedOn='letters'
                          />
                           <span style={{color: 'blue', fontSize: 12}} onClick={() => this.setState({read_more3: this.state.read_more3 > 3 ? 3 : 10})}> { this.state.read_more3 == 0 || this.state.read_more3 == 3 ? 'Read more' : 'read less'} </span>
                        
                      </div>
                    </div>
                    
                    <div className="post_reaction_box">
                      <Row>
                        <Col md={6} sm={8} xs={6}>
                            <ul>
                            <li><a href="#" className="reaction-icon"><img src={require('./../../images/like-logo.png')} /></a></li>
                              <li><a href="#" className="reaction-icon"><img src={require('./../../images/smile.png')} /></a></li>
                              <li><a href="#" className="reaction-icon"><img src={require('./../../images/fire.png')} /></a></li>
                            </ul>
                        </Col>
                        <Col  md={6} sm={4} xs={6}>
                            <div className="reactions">17 Reactions</div>
                        </Col>
                        </Row>
                      </div>
                  </div>
            </Col>
            </Row>
        </div>
      </div>
      <Navigation
        nav = {this.props.history}
        store = {extension}
        storeData = {this.state.storeDetails}
      />
      </div>
    )
    // }
  }
}

export default withRouter(Main_page)
