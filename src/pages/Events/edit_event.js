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
import {Base_url} from './../../utilities/config'
import moment from 'moment';

let weekday = 1
let weektime = 1

const openTime = moment().hour(10).minute(0);
const closeTime = moment().hour(20).minute(0);
const format = 'h:mm a';

class Edit_event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventid: '',
      eventtitle: '',
      eventdate: '',
      oncestarttime: '',
      timestart: '',
      timeend: '',
      onceendtime: '',
      eventdescription: '',
      ticketprice: '',
      totalcapacity: '',
      oncestarttime: 0,
      onceendtime: 0,
      oncedate: '',
      eventList: [],

      submitLoading: false,
      eventtype: '',
      entryfee: false,
      eventBanner: require('./../../images/img_place.png'),

      fieldArray: [],
      test: false,

      editData: []
    };
  }


  componentDidMount() {
    if(typeof this.props.location.state == 'undefined') {
      this.props.history.push('/events')
    } else {
      this.setState({editData: this.props.location.state}, () => {
        this.setState({
          eventid: this.state.editData._id,
          eventBanner: `${Base_url}${this.state.editData.eventbanner}`,
          eventtitle: this.state.editData.title,
          eventdescription: this.state.editData.description,
          ticketprice: this.state.editData.ticketprice,
          entryfee: this.state.editData.freeformembers,
          eventtype: this.state.editData.eventtype,
          totalcapacity: this.state.editData.totalcapacity,
          oncestarttime: this.state.editData.eventonce.starttime,
          onceendtime: this.state.editData.eventonce.endtime,
          oncedate: this.state.editData.eventonce.date,
          timestart: this.state.editData.eventday.timestart,
          timeend: this.state.editData.eventday.timeend
          //fieldArray: this.state.editData.weeklyevent
         }, () => {
          let weeklyData = this.state.editData.weeklyevent
          weeklyData.map((data, i) => {
           if(data !== null) {
             weekday = weekday + 1
            this.state.fieldArray.push(data)
           }
          })
          console.log("ARRAY", this.state.fieldArray.length);
          this.setState({test: !this.state.test})
        })
      })
      
      console.log("PROPS", this.props.location.state);
     // console.log("ARRAY", this.props.location.state.eventonce.starttime);
      
    } 
  }

  addMoreFields = () => {
    if(weekday < 7) {
      weekday = weekday + 1
      let pushObj = {
        dayname: `weekday_${weekday}`,
        timename: `weektime_${weekday}`
      }
      this.state.fieldArray.push(pushObj)
      //For re-rendering the component
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
  }

  handleTimeChange = (value, type) => {
    this.setState({[type]: value})
  }

  handleSubmit = (e) => {
    this.setState({submitLoading: true})
    e.preventDefault()
    let evetData = {
      eventid: this.state.eventid,
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
        weektime_1: this.state.weektime_1},
        {weekday_2: this.state.weekday_2,
        weektime_2: this.state.weektime_2},
        {weekday_3: this.state.weekday_3,
        weektime_3: this.state.weektime_3},
        {weekday_4: this.state.weekday_4,
         weektime_4: this.state.weektime_4},
        {weekday_5: this.state.weekday_5,
        weektime_5: this.state.weektime_5},
        {weekday_6: this.state.weekday_6,
        weektime_6: this.state.weektime_6},
        {weekday_7: this.state.weekday_7,
        weektime_7: this.state.weektime_7}       
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
    ApiService.edit_event(evetData)
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
      base64 = reader.result;
    }, false);
  
    setTimeout(() => {
      this.setState({eventBanner: base64})
    },1000)
  
    if (file) {
      reader.readAsDataURL(file); 
      }
    }
  render() {
    return (
        <div className="right">
        <Notifications />
          <div className="rightSideHeader">
            <ul className="breadcrumbNavigation">
                <li><i className="fas fa-calendar-week breadcumb-icon"></i></li>
                <li className="breadcumb-text"><span className="left-space">Edit event</span></li>
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
               <span className="upload-banner-text-store">Upload store banner</span>
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
                    <input name="eventtitle" value={this.state.eventtitle} type="text" placeholder="Event title" onChange={this.handleChange} required/>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6">
                <div className="inputOuter">
                  <select name="eventtype" value={this.state.eventtype} onChange={this.handleChange} required>
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
                <div className="inputOuter">
                <div className="">
                  <input name="oncedate" value={moment(this.state.oncedate).format('YYYY-MM-DD')} className="date-picker" type="date" onChange={this.handleChange} required/>
                </div>
                
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6">
                   <div className="inputOuter">
                    <TimePicker
                      id="timepickerEnd"
                      showSecond={false}
                      value={moment(this.state.oncestarttime)}
                      onChange={(value) => this.handleTimeChange(value, 'oncestarttime')}
                      format='h:mm a'
                      use12Hours
                      inputReadOnly
                    />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="inputOuter">
                    <TimePicker
                      id="timepickerEnd"
                      showSecond={false}
                      defaultValue={moment(this.state.onceendtime)}
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
                <span class="info-text left">Start time</span>
                <TimePicker
                  id="timepickerStart"
                  showSecond={false}
                  defaultValue={moment(this.state.timestart)}
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
                <span class="info-text left">End time</span>
                <TimePicker
                  id="timepickerEnd"
                  showSecond={false}
                  defaultValue={moment(this.state.timeend)}
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
                    <div className="inputOuter">
                    <div className="">
                      <select name={`weekday_${index + 1}`}  defaultValue={Object.values(data)[0]} onChange={this.handleChange}>
                        <option>Select day</option>
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
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                      <div className="inputOuter">
                      <TimePicker
                        id={data.timename}
                        showSecond={false}
                        defaultValue={moment(data.weektime_1)}
                        onChange={(value) => this.handleTimeChange(value, `weektime_${index + 1}`)}
                        format='h:mm a'
                        use12Hours
                        inputReadOnly
                      />
                      </div>
                    </div>
          
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                      <Row className="gap-bottom">
                        <Col lg={6} md={6} sm={6} xs={6}>
                           <div className="add-more-btn" onClick={this.addMoreFields}>
                           <span><i class="fas fa-plus-circle"></i> Add</span> 
                         </div>
                        </Col>
                        <Col lg={6} md={6} sm={6} xs={6}>
                        <div className="remove-btn" onClick={() => this.removeField(index)}>
                          <span><i class="fas fa-window-close"></i></span> 
                        </div>
                        </Col>
                      </Row>
                     
                    </div>
                    </div>
                  
                  </div>
                </div>
              )) 
            }


            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="inputOuter">
                <textarea placeholder="Erite some event description" value={this.state.eventdescription} name="eventdescription" onChange={this.handleChange}>  
                </textarea>
              </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6">
                <div className="singleCheckbox top-fix">
                    <input id="terms" type="checkbox" name="entryfee" checked={this.state.entryfee} defaultChecked={this.state.entryfee} onChange={this.handleChange} />
                    <label htmlFor="terms"><span></span> Free entry for members</label>
                </div>
                <div className="inputOuter">
                    <input name="ticketprice" type="text" value={this.state.ticketprice} placeholder="Ticket price" onChange={this.handleChange} required/>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6">
              <input name="attendeecapacity" type="text" value={this.state.totalcapacity} placeholder="Attendee capacity" onChange={this.handleChange} required/>
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

export default withRouter(Edit_event)