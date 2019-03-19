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


class Edit_event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventid: '',
      eventtitle: '',
      eventdate: '',
      oncestarttime: moment(),
      timestart: moment(),
      timeend: moment(),
      onceendtime: moment(),
      eventdescription: '',
      ticketprice: '',
      totalcapacity: '',
      oncedate: '',
      eventList: [],

      submitLoading: false,
      eventtype: '',
      entryfee: false,
      eventBanner: require('./../../images/img_place.png'),

      fieldArray: [],
      test: false,

      editData: [],
    };
  }


  componentDidMount() {
    if(typeof this.props.location.state == 'undefined') {
      this.props.history.push('/events')
    } else {
      weekday = 0
      this.setState({editData: this.props.location.state}, () => {
        this.setState({
          eventid: this.state.editData._id,
          eventBanner: this.state.editData.eventbanner != null ? this.state.editData.eventbanner : '',
          eventtitle: this.state.editData.title,
          eventdescription: this.state.editData.description,
          ticketprice: this.state.editData.ticketprice,
          entryfee: JSON.parse(this.state.editData.freeformembers),
          eventtype: this.state.editData.eventtype,
          totalcapacity: this.state.editData.totalcapacity,
          oncestarttime: this.state.editData.eventonce.starttime != null ? moment(this.state.editData.eventonce.starttime) : moment(),
          onceendtime: this.state.editData.eventonce.endtime != null ? moment(this.state.editData.eventonce.endtime) : moment(),
          oncedate: this.state.editData.eventonce.date,
          timestart: moment(this.state.editData.eventday.timestart),
          timeend: moment(this.state.editData.eventday.timeend)
          //fieldArray: this.state.editData.weeklyevent
         }, () => {
         // console.log("oncestarttime", this.state.oncestarttime);
           
          let weeklyData = this.state.editData.weeklyevent
          weeklyData.map((data, i) => {
           if(data !== null) {
             weekday = weekday + 1
            this.state.fieldArray.push(data)
            this.setState({[Object.keys(data)[0]]: Object.values(data)[0]})
            this.setState({[Object.keys(data)[1]]: moment(Object.values(data)[1])})
            this.setState({[Object.keys(data)[2]]: moment(Object.values(data)[2])}) 
           }
          })
          this.setState({test: !this.state.test}, () => {
            let fields = this.state.fieldArray
            if(fields.length == 0) {
              weekday = weekday + 1
              let dayKey = `weekday_${weekday}`
              let timeKey = `weektime_${weekday}`
              let pushObj = {
                dayKey:  '',
                timeKey: moment()
              }
              this.state.fieldArray.push(pushObj)
            }
          })
        })
      })
      
     // console.log("ARRAY", this.props.location.state.eventonce.starttime);
      
    } 
  }

  addMoreFields = () => {
    if(weekday < 7) {
      weekday = weekday + 1
      let dayKey = `weekday_${weekday}`
      let timeStartKey = `weektime_start_${weekday}`
      let timeEndKey = `weektime_end_${weekday}`
      let pushObj = {
        dayKey:  '',
        timeEndKey: moment(),
        timeStartKey: moment()
      }
      this.state.fieldArray.push(pushObj)
      //For re-rendering the component
      this.setState({test: !this.state.test})
    }
  }

  removeField = (index) => {
    if(index > 0) {
      let dayKey = `weekday_${index + 1}`.trim()
      let timeStartKey = `weektime_start_${index + 1}`.trim()
      let timeEndKey = `weektime_end_${index + 1}`.trim()
      this.state.fieldArray.splice(index, 1)
      this.setState({[dayKey]: undefined, [timeStartKey]: undefined, [timeEndKey]: undefined})
    }
  }

  handleChange = (e) => {
    let value = e.target.value
    let name = e.target.name
    if(name == 'entryfee') {
      this.setState({entryfee: e.target.checked})
    } else {
      this.setState({[name]: value})
    }
   // this.validate()
   console.log("change", this.state.entryfee);
   
  }

  handleTimeChange = (value, type) => {
    this.setState({[type]: value})
  }

  clearWeeklyData = async () => {
    for(let i=1; i < 8; i++) {
      let dayKey = `weekday_${i}`.trim()
      let timeStartKey = `weektime_start_${i}`.trim()
      let timeEndKey = `weektime_end_${i}`.trim()
      this.setState({[dayKey]: undefined, [timeStartKey]: undefined, [timeEndKey]: undefined})
    }
  }

  organiseDataForSubmit = () => {
    let eventData = {
      eventid: this.state.eventid,
      title: this.state.eventtitle,
      date: this.state.eventdate,
      eventtype: this.state.eventtype,
      description: this.state.eventdescription,
      ticketprice: this.state.ticketprice,
      eventbanner: this.state.eventBanner,
      totalcapacity: this.state.totalcapacity,
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
  return eventData
  }

  handleSubmit = (e) => {
    this.setState({submitLoading: true})
    e.preventDefault()
    if(this.state.eventtype != 'weekly') {
      this.clearWeeklyData()
      .then(() => {
        let eventData = this.organiseDataForSubmit();
        ApiService.edit_event(eventData)
        .then((res) => res.json())
        .then((response) => {
          console.log(response);
          this.setState({eventList: response.response, submitLoading: false}, () => {
            this.props.history.push('/events')
          })
        })
      })
    } else {
      let eventData = this.organiseDataForSubmit();
      ApiService.edit_event(eventData)
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        this.setState({eventList: response.response, submitLoading: false}, () => {
          this.props.history.push('/events')
        })
      })
    }
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
              <img src={this.state.eventBanner.length > 300 ? this.state.eventBanner : `${Base_url}${this.state.eventBanner}`} width="100%" height="100%"/> 
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
              <span className="label-small left">Choose date</span>
                <div className="inputOuter">
                <div className="">
                  <input name="oncedate" value={moment(this.state.oncedate).format('YYYY-MM-DD')} className="date-picker" type="date" onChange={this.handleChange} required/>
                </div>
                
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6">
                  <span className="label-small left">Start time</span>
                   <div className="inputOuter">
                    <TimePicker
                      id="timepickerEnd"
                      showSecond={false}
                      value={this.state.oncestarttime}
                      onChange={(value) => this.handleTimeChange(value, 'oncestarttime')}
                      format='h:mm a'
                      use12Hours
                      inputReadOnly
                    />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-6">
                  <span className="label-small left">End time</span>
                    <div className="inputOuter">
                    <TimePicker
                      id="timepickerEnd"
                      showSecond={false}
                      defaultValue={this.state.onceendtime}
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
                  defaultValue={this.state.timestart}
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
                <span className="label-small left">End time</span>
                <TimePicker
                  id="timepickerEnd"
                  showSecond={false}
                  defaultValue={this.state.timeend}
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

            <div>
            {this.state.eventtype == "weekly" &&
              this.state.fieldArray.map((data, index) => (

                <div key={index} className="row animated fadeInDown">
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                  <span className="label-small left">Select day</span>
                    <div className="inputOuter">
                    <div className="">
                      <select name={`weekday_${index + 1}`}  defaultValue={Object.values(data)[0]} onChange={this.handleChange} required>
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
                        defaultValue={moment(Object.values(data)[1])}
                        onChange={(value) => this.handleTimeChange(value, `weektime_start_${index + 1}`)}
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
                        defaultValue={moment(Object.values(data)[2])}
                        onChange={(value) => this.handleTimeChange(value, `weektime_end_${index + 1}`)}
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
                           <span><i className="fas fa-plus-circle"></i></span> 
                         </div>
                        </Col>
                        <Col lg={6} md={6} sm={6} xs={6}>
                        <div className="remove-btn" onClick={() => this.removeField(index)}>
                          <span><i className="fas fa-window-close"></i></span> 
                        </div>
                        </Col>
                      </Row>
                    </Col>
                    </div>
                  
                  </div>
                </div>
              )) 
            }
            </div>


            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="inputOuter">
                <textarea placeholder="Write some event description" value={this.state.eventdescription} name="eventdescription" onChange={this.handleChange}>  
                </textarea>
              </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6">
                <div className="singleCheckbox top-fix">
                    <input id="entryfee" type="checkbox" name="entryfee" defaultChecked={this.props.history.location.state.freeformembers == 'true' ? true : false} onChange={this.handleChange} />
                    <label htmlFor="entryfee"><span></span>Free entry for members</label>
                </div>
                <div className="inputOuter">
                    <input name="ticketprice" type="text" value={this.state.ticketprice} placeholder="Ticket price" onChange={this.handleChange} required/>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6">
              <input name="totalcapacity" type="text" value={this.state.totalcapacity} placeholder="Attendee capacity" onChange={this.handleChange} required/>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6">
              
              </div>
            </div>


            

            <div className="row">
              <div className="col-lg-3 col-md-3 col-sm-3">
              </div>

              <div className="col-lg-6 col-md-6 col-sm-6">
                <button type="submit" disabled={false} className="button">Edit Event</button>
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