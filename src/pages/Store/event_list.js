import React, { Component } from 'react';
import { Base_url } from './../../utilities/config'
import ApiService from './../../services/api'
import Loader from './../components/simpleloader'
import { Row, Col } from 'react-bootstrap';
import { withRouter } from "react-router-dom"
import moment from 'moment';
import LinesEllipsis from 'react-lines-ellipsis'
import './../../styles/style_sheet.css'
import './store.css'
import Header from './header'
import Navigation from './navigation'
import EventBookModal from './../Store/Events/eventBookModal'

// let token = localStorage.getItem('access-token-tbd')
let userdata = JSON.parse(localStorage.getItem('guest-userdata'))

let path = window.location.pathname
let storeName = path.split('/')[1];

class Event_list extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storeDetails: {},
      events: [],
      overlayStyle: {
        'display': 'none'
      },
      animateComponent: true,
      loading: false,
      bookingModal: false,
      eventData: {}
    };
  }

  componentDidMount() {
    setTimeout(()=>{
      this.setState({animateComponent: false})
    },600)

    ApiService.getBusinessProfbyUrl(storeName)
      .then(res => res.json())
      .then(response => {
        if (response.status == 200) {
          this.setState({
            storeDetails: response.response,
            loading: false
          }, () => {
            let businessid = this.state.storeDetails.businessid
            ApiService.getEventList(businessid)
            .then((res) => res.json())
            .then((response) => {
              this.setState({events: response.response.reverse(), loading: false}, () => {
                this.comingFromReservation()
              })
            })
          })
          if(this.state.animateComponent == false && this.state.events == '') {this.setState({loading: true})}
        } else {
          this.props.history.push('/')
        }
      })
      .catch(function (error) {
        console.log('err---------', error)
      })

      this.update_stripe_secret()
  }

  update_stripe_secret = () => {
    const sKey = localStorage.getItem('stripe_secret_key')    
    if (sKey == null) {
      ApiService.get_keys()
        .then(res => {
          if (res.status == 200) {
            const secret = res.response.selectedKey.secret
            localStorage.setItem('stripe_secret_key', JSON.stringify(secret))
            window.location.reload()
          }
        })
    }
  }

  comingFromReservation = () => {
    let path = window.location.search
    let eventid = path.replace('?', '')

    this.state.events.map(data => {
      if(data._id == eventid) {
        this.setState({eventData: data}, () => {
          this.setState({bookingModal: true})
        })   
      }
    })

    
  }
  
  currentPage = () => {
    console.log('You are here');
  }

  goToHome = () => {
    this.props.history.push({
      pathname: `/${this.state.storeDetails.extension}`,
      state: this.state.storeDetails
    })
  }

  bookEvent = (eventData) => {
    console.log("eventID", eventData);
    this.setState({eventData}, () => this.setState({bookingModal: true}))
  }

  onBooking = (eventID) => {
    if(!userdata) {
      alert('userid not found !')
    } 
    console.log("eventID", eventID, userdata._id);
    
  }

  imageErr= (e) => {
    e.target.src = require('./../../images/event-placeholder.png')
  }

  isEventExpired = (event) => {
    let isExpired = false
    if (event.eventonce) {
      const today = new Date().getTime()
      const eventDate = new Date(event.eventonce.date).getTime()

      if (event.eventtype == "once" && eventDate < today) {
        isExpired = true
      }
    }
    return isExpired
  }

  render() {  
    const {events, eventData} =this.state
    userdata = JSON.parse(localStorage.getItem('guest-userdata'))
    
    return (
      <div className="">
        <div className="backoverlay" onClick={this.hideOverlay} style={this.state.overlayStyle}></div>
        <Loader loading={this.state.loading} background='no-fill' />
        <EventBookModal event={eventData} show={this.state.bookingModal} close={() => this.setState({bookingModal: false})} onBooking={(eventid) => this.onBooking(eventid)}/>
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
        <div className="heading"><i class="far fa-calendar-alt"></i> Event list </div>
        <div className="post_type_div">
        <div className="container">
        <Row>
        {events.map((data, i) => {
         if(!this.isEventExpired(data)) {
          return(
          <Col key={i} md={4} s={4} xs={12}>
            <div className="singleProfile">
              <div className="top_detail">
                <Row>
                  <Col md={12} sm={12} xs={12}>
                    <div className="name-add-time">
                        <h4><i className="far fa-calendar-alt  event-icon"></i>   {data.title}</h4>
                        <p><i className="fab fa-elementor"></i> Event type: {data.eventtype}</p>
                          {data.eventtype == 'once' ?
                          <div>
                          <span></span>
                            <p>
                              <i className="fas fa-calendar-check"></i> Date: {data.eventonce.date}
                            </p>
                            <p>
                              <i className="far fa-clock"></i>  Time: {moment(data.eventonce.starttime).format("hh:mm a")}  - {moment(data.eventonce.endtime).format('hh:mm a')}
                            </p>
                          </div> :
                          data.eventtype == 'weekly' ?
                            data.weeklyevent.map((weekData, weekIndex) => 
                            weekData != null ?
                            <p>
                              <i className="fas fa-calendar-check"></i> {Object.values(weekData)[0]}:   {moment(Object.values(weekData)[1]).format('hh:mm a')} - {moment(Object.values(weekData)[2]).format('hh:mm a')} 
                            </p>
                            :
                            ''
                            ) :
                            data.eventtype == 'daily' ?
                            <div>
                              <p>
                                <i className="fas fa-calendar-check"></i> Date: Daily event
                              </p>
                              <p>
                                <i className="far fa-clock"></i>  Time: {moment(data.eventday.timestart).format('hh:mm a')} - {moment(data.eventday.timeend).format("hh:mm a")}
                              </p>
                            </div> : ''
                          }
                    </div> 
                  </Col> 
                </Row>
              </div>
          
                <div className="post_img">
                {data.eventbanner ? 
                  <img onError={this.imageErr} className="event-image" src={`${Base_url}${data.eventbanner}`} /> :
                  <img className="event-image" src={require('./../../images/event-placeholder.png')} />
              } 
              </div>
                <div className='body-content'>
                  <div className="post_middle_sec">
                      <p>
                      <LinesEllipsis
                        text={data.description}
                        maxLine={typeof this.state[i] == 'undefined' ? 3 : this.state[i]}
                        ellipsis=' . . .'
                        trimRight 
                        basedOn='letters'
                      />
                      <span style={{color: 'blue', fontSize: 12}} onClick={() => this.setState({[i]: this.state[i] > 3 ? 3 : 10})}> { typeof this.state[i] == 'undefined' || this.state[i] == 3 ? 'Read more' : 'read less'} </span>
                      </p>
                  </div>
                </div>
                <div className="footer-details">
                  <p>Ticket price: $ {data.ticketprice}</p>
                  <p>Free for members: {data.freeformembers ? 'yes' : 'No'}</p>
                  <p>Capacity: {data.totalcapacity} person</p>
                </div>
                <div className="post_reaction_box" style={{paddingTop: 10}}>
                  <Row>
                    <Col md={6} sm={8} xs={6}>
                        <ul onClick={() => this.bookEvent(data)}>
                          <li className="going btn btn-primary">Book event</li>
                        </ul>
                    </Col>
                    <Col  md={6} sm={4} xs={6}>
                        <div className="reactions">{data.bookedusers ? data.bookedusers.length : 0} Attending</div>
                    </Col>
                    </Row>
                  </div>
              </div>
            </Col>
          ) 
         }
        }
          )}
          </Row>
          {this.state.events.length < 1 && 
            <div className="no-events">There are no events available</div>
          }
         </div>
        </div>
        <Navigation 
         nav = {this.props.history}
         store = {storeName}
         storeData = {this.state.storeDetails}
        />
      </div>
    );
  }
}

export default withRouter(Event_list)