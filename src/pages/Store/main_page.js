import React, { Component } from "react";
import ReactDOM from 'react-dom'
import { Route, Link, Redirect, withRouter } from "react-router-dom"
import { Button, Modal, Row, Col } from 'react-bootstrap';
import moment from 'moment';
// images
import noUserImage from './../../images/profile-no-image.jpg'
import foodImage from './../../images/food.jpg'
import { Base_url } from './../../utilities/config'
import ApiService from './../../services/api'
import Loader from './../components/simpleloader'
import './../../styles/style_sheet.css'
import './store.css'
var _ = require('lodash');


class Main_page extends React.Component {
  constructor(props) {
    super(props)

    this.toggleOverlay = this.toggleOverlay.bind(this)
    this.hideOverlay = this.hideOverlay.bind(this)

    this.state = {
      storeDetails: {},
      loading: true,
      timeModal: false,
      'settingsButtonClass': 'settingsBtn',
      'settingsClass': 'setings',
      // overlay
      'overlayShowing': false,
      'overlayStyle': {
        'display': 'none'
      },
      'settingsIconClass': '',
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

  toggleOverlay() {
    if (this.state.overlayShowing) {
      this.setState({
        'overlayShowing': false,
        'settingsButtonClass': 'settingsBtn',
        'settingsClass': 'setings',
        'overlayStyle': {
          'display': 'none'
        },
        'settingsIconClass': ''
      })
    }
    else {
      this.setState({
        'overlayShowing': true,
        'settingsClass': 'setings open',
        'settingsButtonClass': 'settingsBtn active',
        'overlayStyle': {
          'display': 'block'
        },
        'settingsIconClass': 'displayed'
      })
    }
  }

  hideOverlay() {
    if (this.state.overlayShowing) {
      this.setState({
        'overlayShowing': false,
        'settingsButtonClass': 'settingsBtn',
        'settingsClass': 'setings',
        'overlayStyle': {
          'display': 'none'
        },
        'settingsIconClass': ''
      })
    }
  }

  
  render() {
   console.log('store-details', this.state.storeDetails);
   
    return (
      <div>
        <div className="backoverlay" onClick={this.hideOverlay} style={this.state.overlayStyle}></div>
        <Loader loading={this.state.loading} background='fill' />
        <header className="header innerPage">
          <div className="container-fluid">
            <div className="row">
              <div className="businessProfileBanner"
                style={{ backgroundImage: "url(" + Base_url + "" + this.state.storeDetails.storebanner + ")", backgroundSize: 'cover' }}>
                <div className="businessProfileHeader">
                  <div className="bannerContent">
                    <div className="bannerright">
                      <span className="counter hidden">4.7 <span>/5</span> </span>
                      <div className="votes hidden">683 votes</div>
                    </div>
                    <div className="bannerleft">
                      <h1>
                        {this.state.storeDetails.businessname}
                      </h1>
                      <p>
                        {this.state.storeDetails.address}
                      </p>
                      <div className="bottomRow">
                        <span className="phoneNumber">
                          {this.state.storeDetails.phone}
                        </span>
                        <span className="foodName">


                          {this.state.storeDetails.menu != null &&
                            this.state.storeDetails.menu.map((rowdata, index) => {
                              return (<div key={index}>
                                {rowdata.title} &nbsp;
                                                          </div>)

                            })
                          }
                        </span>
                        <span className="time show-time" onClick={() => this.setState({timeModal: true})}>Opening times
                        </span>
                        <Modal
                          size="md"
                          show={this.state.timeModal}
                          onHide={() => this.setState({timeModal: false})}
                          aria-labelledby="example-modal-sizes-title-md"
                        >
                        <Modal.Header closeButton>
                          <Modal.Title id="example-modal-sizes-title-sm">
                            Store opening & closing times
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body className='time-modal'>
                        {this.state.storeDetails.timings != null &&
                         <div>
                         <Row className="time-row">
                           <Col>Monday</Col>
                           <Col>
                           {this.state.storeDetails.closedon != 'Monday' ?
                              <div>{moment(this.state.storeDetails.timings.mondayOpen).format('hh:mm a')} - {moment(this.state.storeDetails.timings.mondayClose).format('hh:mm a')}</div>
                               :
                              <div className="closed">Closed</div>
                           }
                           </Col>
                         </Row>
                         <Row className="time-row">
                          <Col>Tuesday</Col>
                          <Col>
                          {this.state.storeDetails.closedon != 'Tuesday' ?
                              <div>{moment(this.state.storeDetails.timings.tuesdayOpen).format('hh:mm a')} - {moment(this.state.storeDetails.timings.tuesdayClose).format('hh:mm a')}</div>
                               :
                              <div className="closed">Closed</div>
                           }
                          </Col>
                        </Row>
                        <Row className="time-row">
                          <Col>Wednesday</Col>
                          <Col>
                          {this.state.storeDetails.closedon != 'Wednesday' ?
                              <div>{moment(this.state.storeDetails.timings.wednesdayOpen).format('hh:mm a')} - {moment(this.state.storeDetails.timings.wednesdayClose).format('hh:mm a')}</div>
                               :
                              <div className="closed">Closed</div>
                           }
                          </Col>
                        </Row>
                        <Row className="time-row">
                          <Col>Thursday</Col>
                          <Col>
                          {this.state.storeDetails.closedon != 'Thursday' ?
                              <div>{moment(this.state.storeDetails.timings.thursdayOpen).format('hh:mm a')} - {moment(this.state.storeDetails.timings.thursdayClose).format('hh:mm a')}</div>
                               :
                              <div className="closed">Closed</div>
                           }
                          </Col>
                        </Row>
                        <Row className="time-row">
                          <Col>Friday</Col>
                          <Col>
                          {this.state.storeDetails.closedon != 'Friday' ?
                              <div>{moment(this.state.storeDetails.timings.fridayOpen).format('hh:mm a')} - {moment(this.state.storeDetails.timings.fridayClose).format('hh:mm a')}</div>
                               :
                              <div className="closed">Closed</div>
                           }
                          </Col>
                        </Row>
                        <Row className="time-row">
                          <Col>Saturday</Col>
                          <Col>
                          {this.state.storeDetails.closedon != 'Saturday' ?
                              <div> {moment(this.state.storeDetails.timings.saturdayOpen).format('hh:mm a')} - {moment(this.state.storeDetails.timings.saturdayClose).format('hh:mm a')}</div>
                               :
                              <div className="closed">Closed</div>
                           }
                          </Col>
                        </Row>
                        <Row className="time-row">
                          <Col className="dayname">Sunday</Col>
                          <Col>
                          {this.state.storeDetails.closedon != 'Thursday' ?
                              <div>{moment(this.state.storeDetails.timings.sundayOpen).format('hh:mm a')} - {moment(this.state.storeDetails.timings.sundayClose).format('hh:mm a')}</div>
                               :
                              <div className="closed">Closed</div>
                           }
                          </Col>
                        </Row>
                       </div>
                        }

                        </Modal.Body>
                      </Modal>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
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
                                    <h4>Arundhuti Bhaumik</h4>
                                    <p>Kolkata, India</p>
                                    <p>29 June 2017</p>
                                </div>
                            </Col>
                            <Col md={4} sm={4} xs={12}>
                                <div className="post_detail">
                                    <div className="postedinfacebook"><i class="fab fa-facebook" area-hidden='true'></i></div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className='body-content'>
                      <div className="post_middle_sec">
                          <p>Fabulous food! We had ordered Clay pot chicken, Steamed Bhetki, mei fun noodles, yong chow fried rice. Annirudha our host suggested that we have the fried rice just with egg.</p>
                      </div>
                      <div className="post_img"><img src="https://media.istockphoto.com/photos/health-food-for-fitness-picture-id855098134?k=6&m=855098134&s=612x612&w=0&h=eIWWpYWKTz_z2ryYAo0Dd97igUZVExzl4AKRIhUrFj4=" /></div>
                   </div>
                    <div className="post_reaction_box">
                      <Row>
                        <Col md={6} sm={8} xs={6}>
                             <ul>
                                <li><a href="#" className="reaction-icon"><img src="https://www.freeiconspng.com/uploads/restaurant-icon-png-7.png" /></a></li>
                                <li><a href="#" className="reaction-icon"><img src="https://cdn4.iconfinder.com/data/icons/reaction/33/love-512.png" /></a></li>
                                <li><a href="#" className="reaction-icon"><img src="https://www.freeiconspng.com/uploads/fire-vector-icon-png-27.png" /></a></li>
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
                                    <h4>Arundhuti Bhaumik</h4>
                                    <p>Kolkata, India</p>
                                    <p>29 June 2017</p>
                                </div>
                            </Col>
                            <Col md={4} sm={4} xs={12}>
                                <div className="post_detail">
                                    <div className="postedinfacebook"><i class="fab fa-facebook" area-hidden='true'></i></div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className='body-content'>
                      <div className="post_middle_sec">
                          <p>Fabulous food! We had ordered Clay pot chicken, Steamed Bhetki, mei fun noodles, yong chow fried rice. Annirudha our host suggested that we have the fried rice just with egg.</p>
                      </div>
                      <div className="post_img"><img src="https://media.gettyimages.com/photos/traditional-maharashtrian-vegetarian-thali-where-each-food-item-is-picture-id859066572?s=612x612" /></div>
                    </div>
                    <div className="post_reaction_box">
                      <Row>
                        <Col md={6} sm={6} xs={6}>
                             <ul>
                                <li><a href="#" className="reaction-icon"><img src="https://www.freeiconspng.com/uploads/restaurant-icon-png-7.png" /></a></li>
                                <li><a href="#" className="reaction-icon"><img src="https://cdn4.iconfinder.com/data/icons/reaction/33/love-512.png" /></a></li>
                                <li><a href="#" className="reaction-icon"><img src="https://www.freeiconspng.com/uploads/fire-vector-icon-png-27.png" /></a></li>
                            </ul>
                        </Col>
                        <Col  md={6} sm={6} xs={6}>
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
                                    <h4>Arundhuti Bhaumik</h4>
                                    <p>Kolkata, India</p>
                                    <p>29 June 2017</p>
                                </div>
                            </Col>
                            <Col md={4} sm={4} xs={12}>
                                <div className="post_detail">
                                    <div className="postedinfacebook"><i class="fab fa-facebook" area-hidden='true'></i></div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className='body-content'>
                      <div className="post_middle_sec">
                          <p>Fabulous food! We had ordered Clay pot chicken, Steamed Bhetki, mei fun noodles, yong chow fried rice. Annirudha our host suggested that we have the fried rice just with egg.</p>
                      </div>
                      <div className="post_img"><img src="https://upload.wikimedia.org/wikipedia/commons/6/64/Foods_%28cropped%29.jpg" /></div>
                    </div>
                    <div className="post_reaction_box">
                      <Row>
                        <Col md={6} sm={6} xs={6}>
                            <ul>
                                <li><a href="#" className="reaction-icon"><img src="https://www.freeiconspng.com/uploads/restaurant-icon-png-7.png" /></a></li>
                                <li><a href="#" className="reaction-icon"><img src="https://cdn4.iconfinder.com/data/icons/reaction/33/love-512.png" /></a></li>
                                <li><a href="#" className="reaction-icon"><img src="https://www.freeiconspng.com/uploads/fire-vector-icon-png-27.png" /></a></li>
                            </ul>
                        </Col>
                        <Col  md={6} sm={6} xs={6}>
                            <div className="reactions">17 Reactions</div>
                        </Col>
                        </Row>
                      </div>
                  </div>
            </Col>
            </Row>
        </div>
    </div>

        <div className={this.state.settingsButtonClass} onClick={this.toggleOverlay}>
          <button>+</button>
        </div>
        <div className={this.state.settingsClass}>
          <ul>
            <li className={this.state.settingsIconClass}>
              <a className="becomeAmember">
                <span>
                  Become a Member
                                    </span>
              </a>
            </li>
            <li className={this.state.settingsIconClass}>
              <a className="bookAtable">
                <span>
                  Book a Table
                                    </span>
              </a>
            </li>
            <li className={this.state.settingsIconClass}>
              <a className="foodItems">
                <span>
                  Food Items
                                    </span>
              </a>
            </li>
            <li className={this.state.settingsIconClass}>
              <a className="games">
                <span>Calender / Tickets</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    )
    // }
  }
}

export default withRouter(Main_page)
