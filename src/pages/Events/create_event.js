import React, { Component } from 'react';
import './../../styles/style_sheet.css'
import { Route, Link, Redirect, withRouter } from "react-router-dom";
import { Alert } from 'reactstrap';
import ApiService from '../../services/api'
import Notifications, { notify } from 'react-notify-toast';
import Loader from '../components/simpleloader'
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import moment from 'moment';

let weekday = 1
let weektime = 1

const openTime = moment().hour(10).minute(0);
const closeTime = moment().hour(20).minute(0);
const format = 'h:mm a';

class Add_events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventtitle: '',
      eventdate: '',
      oncestarttime: '10:00 am',
      timestart: moment(),
      timeend: moment(),
      onceendtime: '8:00 pm',
      eventdescription: '',
      ticketprice: '',
      eventList: [],

      submitLoading: false,
      eventtype: '',
      entryfee: false,
      eventBanner: require('./../../images/img_place.png'),

      fieldArray: [],
      test: false
    };
  }


  componentDidMount() {
    let fieldObj = {
      dayname: `weekday_${weekday}`,
      starttimename: `weektime_start_${weektime}`,
      endtimename: `weektime_end_${weektime}`
    }
    this.setState({
      fieldArray: [fieldObj]
    })
  }

  addMoreFields = () => {
    if(weekday < 7) {
      weekday = weekday + 1
      let pushObj = {
        dayname: `weekday_${weekday}`,
        starttimename: `weektime_start_${weekday}`,
        endtimename: `weektime_end_${weekday}`
      }
      this.state.fieldArray.push(pushObj)
      this.setState({test: !this.state.test})
    }
  }

  removeField = (index) => {
    if(index > 0) {
      this.state.fieldArray.splice(index, 1)
      this.setState({test: !this.state.test})
    } 
  }

  handleChange = (e) => {
    let value = e.target.value
    let name = e.target.name
    name == 'entryfee' ? this.setState({entryfee: e.target.checked}) :
    this.setState({[name]: value})
   // this.validate()
   console.log('STATE', this.state);
  }

  handleTimeChange = (value, type) => {
    this.setState({[type]: value})
  }

  handleSubmit = (e) => {
    this.setState({submitLoading: true})
    e.preventDefault()
    let evetData = {
      businessid: localStorage.getItem('user-id'),
      title: this.state.eventtitle,
      date: this.state.eventdate,
      eventtype: this.state.eventtype,
      description: this.state.eventdescription,
      ticketprice: this.state.ticketprice,
      eventbanner: this.state.eventBanner,
      totalcapacity: this.state.attendeecapacity,
      freeformembers: this.state.entryfee,
      weeklyevent: [
        {weekday_1: this.state.weekday_1,
        weektime_start_1: this.state.weektime_start_1,
        weektime_end_1: this.state.weektime_end_1 },
        {weekday_2: this.state.weekday_2,
        weektime_start_2: this.state.weektime_start_2,
        weektime_end_2: this.state.weektime_end_2 },
        {weekday_3: this.state.weekday_3,
        weektime_start_3: this.state.weektime_start_3,
        weektime_end_3: this.state.weektime_end_3 },
        {weekday_4: this.state.weekday_4,
        weektime_start_4: this.state.weektime_start_4,
        weektime_end_4: this.state.weektime_end_4},
        {weekday_5: this.state.weekday_5,
        weektime_start_5: this.state.weektime_start_5,
        weektime_end_5: this.state.weektime_end_5},
        {weekday_6: this.state.weekday_6,
        weektime_start_6: this.state.weektime_start_6,
        weektime_end_6: this.state.weektime_end_6},
        {weekday_7: this.state.weekday_7,
        weektime_start_7: this.state.weektime_start_7,
        weektime_end_7: this.state.weektime_end_7 }       
      ],
      eventonce: {
        date: this.state.oncedate,
        starttime: this.state.oncestarttime,
        endtime: this.state.onceendtime
      },
      eventday: {
        timestart: this.state.timestart,
        timeend: this.state.timeend
      }
    }
    ApiService.add_new_event(evetData)
    .then((res) => res.json())
    .then((response) => {
      console.log(response);
      this.setState({eventList: response.response, submitLoading: false}, () => {
        this.props.history.push('/events')
      })
    })
  }


  handleFileUpload = (e) => {
    var base64 = ""
    var file    = document.querySelector('#event_banner').files[0];
    var reader  = new FileReader();
  
    reader.addEventListener("load", function () {
      //console.log(reader);
      base64 = reader.result
      //console.log("reader", reader);
    }, false);
  
    setTimeout(() => {
      this.setState({eventBanner: base64})
    },1000)
  
    if (file) {
      reader.readAsDataURL(file);
      console.log("FILE", file);
      }
    }
  


  render() {
    return (
        <div className="right">
        <Notifications />
          <div className="rightSideHeader">
            <ul className="breadcrumbNavigation">
                <li><i className="fas fa-calendar-week breadcumb-icon"></i></li>
                <li className="breadcumb-text"><span className="left-space">Create new event</span></li>
            </ul>
          </div>

          <Loader loading={this.state.submitLoading}/>

          <div className="container-inside">
          <form className="form" onSubmit={this.handleSubmit}>
            <div className="row">
            <div className="col-lg-2 col-md-2 col-sm-2 col-xs-0"> </div>

             <div className="col-lg-8 col-md-8 col-sm-8 col-xs-12"> 
              <div className="banner-container">
              <div className="event-banner">
              <img src={this.state.eventBanner} width="100%" height="100%"/> 
              <div className="event-banner-button">
               <span className="upload-banner-text-store">Upload event banner</span>
                <input
                  type="file"
                  name="event_banner"
                  value=""
                  id="event_banner"
                  onChange={this.handleFileUpload}
                  accept="image/*"
                />
                </div>
               </div>
              </div>
              </div>
              <div className="col-lg-2 col-md-2 col-sm-2 col-xs-0"></div>
             
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6">
                <div className="inputOuter">
                    <input name="eventtitle" type="text" placeholder="Event title" onChange={this.handleChange} required/>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6">
                <div className="inputOuter">
                  <select name="eventtype" onChange={this.handleChange} required>
                    <option value="">Choose event type</option>
                    <option value="once">Only once</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                  </select>
                </div>
              </div>
            </div>

            {this.state.eventtype == 'once' &&
              <div className="row animated fadeInDown">
              <div className="col-lg-6 col-md-6 col-sm-6">
              <span class="label-small left">Choose date</span>
                <div className="inputOuter">
                <div className="">
                    <input name="oncedate" className="date-picker" type="date" placeholder="Event date" onChange={this.handleChange} required/>
                </div>
                
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6">
                  <span class="label-small left">Start time</span>
                   <div className="inputOuter">
                    <TimePicker
                      id="timepickerEnd"
                      showSecond={false}
                      defaultValue={openTime}
                      className="xxx"
                      onChange={(value) => this.handleTimeChange(value, 'oncestarttime')}
                      format='h:mm a'
                      use12Hours
                      inputReadOnly
                    />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-6">
                  <span class="label-small left">End time</span>
                    <div className="inputOuter">
                    <TimePicker
                      id="timepickerEnd"
                      showSecond={false}
                      defaultValue={openTime}
                      className="xxx"
                      onChange={(value) => this.handleTimeChange(value, 'onceendtime')}
                      format='h:mm a'
                      use12Hours
                      inputReadOnly
                    />
                    </div>
                  </div>
                </div>
               
              </div>
            </div>
            }

            {this.state.eventtype == 'daily' &&
              <div className="row animated fadeInDown">
              <div className="col-lg-6 col-md-6 col-sm-6">
                <div className="inputOuter">
                <span class="label-small left">Start time</span>
                <TimePicker
                  id="timepickerStart"
                  showSecond={false}
                  defaultValue={openTime}
                  className="xxx"
                  onChange={(value) => this.handleTimeChange(value, 'timestart')}
                  format='h:mm a'
                  use12Hours
                  inputReadOnly
                />
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6">
                <div className="inputOuter">
                <span class="label-small left">End time</span>
                <TimePicker
                  id="timepickerEnd"
                  showSecond={false}
                  defaultValue={openTime}
                  className="xxx"
                  onChange={(value) => this.handleTimeChange(value, 'timeend')}
                  format='h:mm a'
                  use12Hours
                  inputReadOnly
                />
                </div>
              </div>
            </div>
            } 

            {this.state.eventtype == "weekly" &&
              this.state.fieldArray.map((data, index) => (
                <div className="row animated fadeInDown">
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                  <span className="label-small left">Select day</span>
                    <div className="inputOuter">
                    <div className="">
                      <select name={data.dayname} onChange={this.handleChange} required>
                        <option value="">Select day</option>
                        <option value="sunday">Sunday</option>
                        <option value="monday">Monday</option>
                        <option value="tuesday">Tuesday</option>
                        <option value="wednesday">Wednesday</option>
                        <option value="thursday">Thursday</option>
                        <option value="friday">Friday</option>
                        <option value="satarday">Saturday</option>
                      </select>
                    </div>
                  
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                    <div className="row">
                    <Col lg={4} sm={4} md={4} xs={6}>
                    <span className="label-small left">Start time</span>
                      <div className="inputOuter">
                      <TimePicker
                        id="weekly_timepicker"
                        showSecond={false}
                        defaultValue={openTime}
                        onChange={(value) => this.handleTimeChange(value, data.starttimename)}
                        format='h:mm a'
                        use12Hours
                        inputReadOnly
                      />
                      </div>
                    </Col>

                    <Col lg={4} sm={4} md={4} xs={6}>
                    <span className="label-small left">End time</span>
                     <div className="inputOuter">
                      <TimePicker
                        id="weekly_timepicker"
                        showSecond={false}
                        defaultValue={moment()}
                        onChange={(value) => this.handleTimeChange(value, data.endtimename)}
                        format='h:mm a'
                        use12Hours
                        inputReadOnly
                      />
                      </div>
                    </Col>
          
                    <Col lg={4} sm={4} md={4} xs={12}>
                      <Row className="gap-bottom">
                        <Col lg={6} md={6} sm={6} xs={6}>
                           <div className="add-more-btn" onClick={this.addMoreFields}>
                           <span><i class="fas fa-plus-circle"></i></span> 
                         </div>
                        </Col>
                        <Col lg={6} md={6} sm={6} xs={6}>
                        <div className="remove-btn" onClick={() => this.removeField(index)}>
                          <span><i class="fas fa-window-close"></i></span> 
                        </div>
                        </Col>
                      </Row>
                     
                    </Col>
                    </div>
                  
                  </div>
                </div>
              )) 
            }


            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="inputOuter">
                <textarea placeholder="Enter event description here" name="eventdescription" onChange={this.handleChange}>  
                </textarea>
              </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6">
                <div className="singleCheckbox top-fix">
                    <input id="terms" type="checkbox" name="entryfee" defaultChecked={this.state.entryfee} onChange={this.handleChange} />
                    <label htmlFor="terms"><span></span> Free entry for members</label>
                </div>
                <div className="inputOuter">
                    <input name="ticketprice" type="text" placeholder="Ticket price" onChange={this.handleChange} required/>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6">
              <input name="attendeecapacity" type="text" placeholder="Attendee capacity" onChange={this.handleChange} required/>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6">
              
              </div>
            </div>


            

            <div className="row">
              <div className="col-lg-3 col-md-3 col-sm-3">
              </div>

              <div className="col-lg-6 col-md-6 col-sm-6">
                <button type="submit" disabled={false} className="button">Create Event</button>
              </div>

              <div className="col-lg-3 col-md-3 col-sm-3">
              </div>
            </div>
            
           </form>
          </div>
      </div>
    );
  }
}

export default withRouter(Add_events)