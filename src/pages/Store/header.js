import React, { Component } from "react";
import { Button, Modal, Row, Col } from 'react-bootstrap';
import moment from 'moment';
import { Base_url } from './../../utilities/config'
import './../../styles/style_sheet.css'
import './store.css'
import ApiService from "../../services/api";


export default class Store_header extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    
    const logged = localStorage.getItem('guest-userdata')
    if(logged) {
      const userId = JSON.parse(localStorage.getItem('guest-userdata'))._id
      ApiService.set_guest_user_active(userId)
      .then(res => {
        console.log("User set to active", res);
      })
        setInterval(() => {
          ApiService.set_guest_user_active(userId)
          .then(res => {
            console.log("User set to active", res);
          })
        }, 60000)
    } 
  }

  render() {
    return (
      <div>
        <header className="header innerPage">
          <div className="container-fluid">
            <div className="row">
              <div className="businessProfileBanner"
                style={{ backgroundImage: "url(" + Base_url + "" + this.props.storebanner + ")", backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="businessProfileHeader">
                  <div className="bannerContent">
                    <div className="bannerright">
                      <span className="counter hidden">{this.props.rating}<span>/5</span> </span>
                      <div className="votes hidden">{this.props.votes} votes</div>
                    </div>
                    <div className="bannerleft">
                      <h1>
                        {this.props.businessname}
                      </h1>
                      <p>
                        {this.props.address}
                      </p>
                      <div className="bottomRow">
                        <span className="phoneNumber">
                          {this.props.phone}
                        </span>
                        
                        <span className="time show-time" onClick={() => this.setState({ timeModal: true })}>Opening times
                        </span>
                        <Modal
                          size="md"
                          show={this.state.timeModal}
                          onHide={() => this.setState({ timeModal: false })}
                          aria-labelledby="example-modal-sizes-title-md"
                        >
                          <Modal.Header closeButton>
                            <Modal.Title id="example-modal-sizes-title-sm">
                              Store opening & closing times
                          </Modal.Title>
                          </Modal.Header>
                          <Modal.Body className='time-modal'>
                            {this.props.timings != null &&
                              <div>
                                <Row className="time-row">
                                  <Col>Monday</Col>
                                  <Col>
                                    {this.props.closedon != 'Monday' ?
                                      <div>{moment(this.props.timings.mondayOpen).format('hh:mm a')} - {moment(this.props.timings.mondayClose).format('hh:mm a')}</div>
                                      :
                                      <div className="closed">Closed</div>
                                    }
                                  </Col>
                                </Row>
                                <Row className="time-row">
                                  <Col>Tuesday</Col>
                                  <Col>
                                    {this.props.closedon != 'Tuesday' ?
                                      <div>{moment(this.props.timings.tuesdayOpen).format('hh:mm a')} - {moment(this.props.timings.tuesdayClose).format('hh:mm a')}</div>
                                      :
                                      <div className="closed">Closed</div>
                                    }
                                  </Col>
                                </Row>
                                <Row className="time-row">
                                  <Col>Wednesday</Col>
                                  <Col>
                                    {this.props.closedon != 'Wednesday' ?
                                      <div>{moment(this.props.timings.wednesdayOpen).format('hh:mm a')} - {moment(this.props.timings.wednesdayClose).format('hh:mm a')}</div>
                                      :
                                      <div className="closed">Closed</div>
                                    }
                                  </Col>
                                </Row>
                                <Row className="time-row">
                                  <Col>Thursday</Col>
                                  <Col>
                                    {this.props.closedon != 'Thursday' ?
                                      <div>{moment(this.props.timings.thursdayOpen).format('hh:mm a')} - {moment(this.props.timings.thursdayClose).format('hh:mm a')}</div>
                                      :
                                      <div className="closed">Closed</div>
                                    }
                                  </Col>
                                </Row>
                                <Row className="time-row">
                                  <Col>Friday</Col>
                                  <Col>
                                    {this.props.closedon != 'Friday' ?
                                      <div>{moment(this.props.timings.fridayOpen).format('hh:mm a')} - {moment(this.props.timings.fridayClose).format('hh:mm a')}</div>
                                      :
                                      <div className="closed">Closed</div>
                                    }
                                  </Col>
                                </Row>
                                <Row className="time-row">
                                  <Col>Saturday</Col>
                                  <Col>
                                    {this.props.closedon != 'Saturday' ?
                                      <div> {moment(this.props.timings.saturdayOpen).format('hh:mm a')} - {moment(this.props.timings.saturdayClose).format('hh:mm a')}</div>
                                      :
                                      <div className="closed">Closed</div>
                                    }
                                  </Col>
                                </Row>
                                <Row className="time-row">
                                  <Col className="dayname">Sunday</Col>
                                  <Col>
                                    {this.props.closedon != 'Thursday' ?
                                      <div>{moment(this.props.timings.sundayOpen).format('hh:mm a')} - {moment(this.props.timings.sundayClose).format('hh:mm a')}</div>
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
      </div>
    );
  }
}
