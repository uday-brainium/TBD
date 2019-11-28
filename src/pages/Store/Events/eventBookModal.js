import React, { Component } from 'react';
import { Row, Col, Modal, Button } from 'react-bootstrap';
import './style.css'
import PaymentView from './paymentView'
import ApiService from '../../../services/api';
import Loader from './../../components/simpleloader'
import moment from 'moment';
import PaymentModal from './paymentModal'
import GeneratePdf from './eventTicket';
import { Base_url, live_url } from './../../../utilities/config'

let userdata = JSON.parse(localStorage.getItem('guest-userdata'))

export default class Event_booking extends Component {

  state = {
    loading: false,
    payModal: false
  }

  onToken = (token, price, eventid) => {
    this.setState({ loading: true })
    let data = {
      currency: 'AUD',
      amount: price * 100,
      source: token
    }
    ApiService.chargeStripe(data)
      .then(res => res.json())
      .then(response => {
        if (response.status == "succeeded") {
          this.setState({ payment: true }, () => {
            let bookdata = {
              eventid, userid: userdata._id,
              username: `${userdata.firstname} ${userdata.lastname}`,
              email: userdata.email,
              event: this.props.event,
              paid: true
            }
            ApiService.book_event(bookdata)
              .then(result => result.json())
              .then(responseData => {
                if(responseData.status == 200) {
                  // console.log("save payment booking", responseData);
                  this.setState({ loading: false, booked: true, payModal: false }, () =>{
                    this.initiatePayback(responseData.response)
                    this.fbShare()
                  })
                }
              })
          })
        }
      })
  }

  initiatePayback = (data) => {
    const totalPrice = data.ticketprice
    const businessid = data.businessid

    ApiService.profileData("", businessid)
    .then(userData => userData.json())
    .then(userResponse => {
      if(userResponse.success) {
        const paymentAcc = userResponse.data.payment.stripe_account.id
        ApiService.get_keys()
        .then(charge => {
          if(charge.status == 200) {
            console.log("Charge", charge);
           const type = charge.response.feeForTicket.type
           const amount = charge.response.feeForTicket.amount
    
           let toDeduct = 0
    
           if(type == 'Percent') {
             toDeduct = (totalPrice * (amount / 100))
           } else {
             toDeduct = amount
           }
           
           const toPayback = Math.round(parseInt((totalPrice - toDeduct) * 100))
           const description = `Event book - ${data.title}`
    
           ApiService.transfer_money_to_business(paymentAcc, toPayback, description)
           .then(payback => { 
             console.log("PAYback done", payback);
              
           })
    
          }
        })
      }
    })


    // ApiService.transfer_money_to_business() 
    // .then(res => {

    // })
 
  }

  findAlreadyBooked = () => {
    if (userdata) {
      const { bookedusers } = this.props.event
      const userid = userdata._id
      const bookedList = bookedusers ? bookedusers : []
      let isBooked = 0
      bookedList.map(data => {
        if (data.userid == userid) {
          isBooked = 1
        }
      })
      return isBooked
    }
  }

  getDates = (startDate, stopDate) => {
    var dateArray = [];
    var currentDate = moment(startDate);
    var stopDate = moment(stopDate);
    while (currentDate <= stopDate) {
      dateArray.push(moment(currentDate).format('YYYY-MM-DD'))
      currentDate = moment(currentDate).add(1, 'days');
    }
    return dateArray;
  }

  isEventRunning_once = () => {
    const { event } = this.props
    const { eventtype } = event
    let isRunning

    if (eventtype == 'once') {
      const startTime = new Date(event.eventonce.starttime).toLocaleTimeString()
      const endTime = new Date(event.eventonce.endtime).toLocaleTimeString()
      const eventDate = new Date(event.eventonce.date).toLocaleDateString()
      const today = new Date().toLocaleDateString()
      const currentTime = new Date().toLocaleTimeString()

      if (today == eventDate && (currentTime > startTime && currentTime < endTime)) {
        console.log("Running");
        isRunning = true
      } else {
        isRunning = false
      }
      return isRunning
    }
  }

  isEventRunning_weekly = () => {
    const { event } = this.props
    const { eventtype } = event
    let isRunning = false

    if (eventtype == 'weekly') {

      const startDate = (event.weeklyeventstartend.startdate)
      const endDate = (event.weeklyeventstartend.enddate)

      var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

      const weekday1 = event.weeklyevent[0] ? event.weeklyevent[0].weekday_1 : 'otherday'
      const weekday2 = event.weeklyevent[1] ? event.weeklyevent[1].weekday_2 : 'otherday'
      const weekday3 = event.weeklyevent[2] ? event.weeklyevent[2].weekday_3 : 'otherday'
      const weekday4 = event.weeklyevent[3] ? event.weeklyevent[3].weekday_4 : 'otherday'
      const weekday5 = event.weeklyevent[4] ? event.weeklyevent[4].weekday_5 : 'otherday'
      const weekday6 = event.weeklyevent[5] ? event.weeklyevent[5].weekday_6 : 'otherday'
      const weekday7 = event.weeklyevent[6] ? event.weeklyevent[6].weekday_7 : 'otherday'

      const weekTimeStart1 = event.weeklyevent[0] ? new Date(event.weeklyevent[0].weektime_start_1).toLocaleTimeString() : 'othertime'
      const weekTimeEnd1 = event.weeklyevent[0] ? new Date(event.weeklyevent[0].weektime_end_1).toLocaleTimeString() : 'othertime'

      const weekTimeStart2 = event.weeklyevent[1] ? new Date(event.weeklyevent[1].weektime_start_2).toLocaleTimeString() : 'othertime'
      const weekTimeEnd2 = event.weeklyevent[1] ? new Date(event.weeklyevent[1].weektime_end_2).toLocaleTimeString() : 'othertime'

      const weekTimeStart3 = event.weeklyevent[2] ? new Date(event.weeklyevent[2].weektime_start_3).toLocaleTimeString() : 'othertime'
      const weekTimeEnd3 = event.weeklyevent[2] ? new Date(event.weeklyevent[2].weektime_end_3).toLocaleTimeString() : 'othertime'

      const weekTimeStart4 = event.weeklyevent[3] ? new Date(event.weeklyevent[3].weektime_start_4).toLocaleTimeString() : 'othertime'
      const weekTimeEnd4 = event.weeklyevent[3] ? new Date(event.weeklyevent[3].weektime_end_4).toLocaleTimeString() : 'othertime'

      const weekTimeStart5 = event.weeklyevent[4] ? new Date(event.weeklyevent[4].weektime_start_5).toLocaleTimeString() : 'othertime'
      const weekTimeEnd5 = event.weeklyevent[4] ? new Date(event.weeklyevent[4].weektime_end_5).toLocaleTimeString() : 'othertime'

      const weekTimeStart6 = event.weeklyevent[5] ? new Date(event.weeklyevent[5].weektime_start_6).toLocaleTimeString() : 'othertime'
      const weekTimeEnd6 = event.weeklyevent[5] ? new Date(event.weeklyevent[5].weektime_end_6).toLocaleTimeString() : 'othertime'

      const weekTimeStart7 = event.weeklyevent[6] ? new Date(event.weeklyevent[6].weektime_start_7).toLocaleTimeString() : 'othertime'
      const weekTimeEnd7 = event.weeklyevent[6] ? new Date(event.weeklyevent[6].weektime_end_7).toLocaleTimeString() : 'othertime'

      const currentTime = new Date().toLocaleTimeString()

      const allDates = this.getDates(startDate, endDate)

      allDates.map(date => {
        const d1 = new Date(date)
        const d2 = new Date()
        const day = days[d1.getDay()]
        const todayName = days[d2.getDay()]

        if (weekday1 == day && (currentTime >= weekTimeStart1 && currentTime <= weekTimeEnd1)) {
          //console.log("RUNNING...WEEKLY");
          isRunning = true
        } else if (weekday2 == day && (currentTime >= weekTimeStart2 && currentTime <= weekTimeEnd2)) {
          isRunning = true
        } else if (weekday3 == day && (currentTime >= weekTimeStart3 && currentTime <= weekTimeEnd3)) {
          isRunning = true
        } else if (weekday4 == day && (currentTime >= weekTimeStart4 && currentTime <= weekTimeEnd4)) {
          isRunning = true
        } else if (weekday5 == day && (currentTime >= weekTimeStart5 && currentTime <= weekTimeEnd5)) {
          isRunning = true
        } else if (weekday6 == day && (currentTime >= weekTimeStart6 && currentTime <= weekTimeEnd6)) {
          isRunning = true
        } else if (weekday7 == day && (currentTime >= weekTimeStart7 && currentTime <= weekTimeEnd7)) {
          isRunning = true
        }
      })

      return isRunning
    }
  }


  isEventRunning_daily = () => {
    const { event } = this.props
    const { eventtype } = event
    let isRunning

    if (eventtype == 'daily') {
      const startTime = new Date(event.eventday.timestart).toLocaleTimeString()
      const endTime = new Date(event.eventday.timeend).toLocaleTimeString()
      const currentTime = new Date().toLocaleTimeString()

      const startDate = new Date(event.eventday.datestart).toLocaleDateString()
      const endDate = new Date(event.eventday.dateend).toLocaleDateString()
      const today = new Date().toLocaleDateString()


      if ((today >= startDate && today <= endDate) && currentTime > startTime && currentTime < endTime) {
        console.log("Running-daily");
        isRunning = true
      } else {
        isRunning = false
      }
      return isRunning
    }
  }

  isEventExpired = () => {
    const { event } = this.props
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

  bookEventFree = (eventid) => {
    this.setState({loading: true})
    let bookdata = {
      eventid, userid: userdata._id,
      username: `${userdata.firstname} ${userdata.lastname}`,
      paid: true
    }
    ApiService.book_event(bookdata)
      .then(result => result.json())
      .then(responseData => {
        if(responseData.status == 200) {
          this.setState({ loading: false, booked: true })
        }
      })
  }

  fbShare = () => {
    let path = window.location.pathname
    let extension = path.substring(1)

    const { event, store } = this.props
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: 353429871985553,
        cookie: true,  // enable cookies to allow the server to access
        // the session
        xfbml: true,  // parse social plugins on this page
        version: 'v2.1' // use version 2.1
      });


      window.FB.ui({
        method: 'feed',
        name: ''+event.title+'',
        link: ''+live_url+'/'+extension+'/events',
        picture: ' '+Base_url+''+store.storebanner+'',
        caption: 'Doublesat TBD',
        description: ''+store.extension+'/events'
      },  (response) => {
        if (response) {
          this.savePost().then(res => {
            this.earnReward().then((resolve) => {
              window.location.reload();
            })
          })       
        } else {
          alert('failed to share post try again')
          window.location.reload();
        }

      });

    }.bind(this);

    // Load the SDK asynchronously
    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  render() {
    const { event, show, close, store, onBooking } = this.props
    const bookedusers = event.bookedusers ? event.bookedusers.length : 0
    const available = ((event.totalcapacity - bookedusers))
    userdata = JSON.parse(localStorage.getItem('guest-userdata'))
    const isPaidMember = userdata ? userdata.membership_type != "Free" ? true : false : false
    const freeForMembers = event ? event.freeformembers : ''
    const transactionFee = this.props.fees.amount ? this.props.fees.amount : 0 
    const transactionFeeType = this.props.fees.type ? this.props.fees.type : 'Dollar' 
    
    const additionPrice = transactionFeeType === "Percent" ? ((transactionFee / 100 ) *  event.ticketprice) : (parseFloat(transactionFee))
    const eventPrice = (parseFloat(event.ticketprice) + additionPrice)
    
    const ticketPrice = !isPaidMember ? parseFloat(eventPrice) : parseFloat(event.ticketprice)
    // console.log("Additon---", additionPrice, transactionFeeType);
    // console.log('Once_Ecvent', this.isEventRunning_weekly());
    // console.log("EVENT", this.isEventExpired());
     console.log("IS PAID", isPaidMember);
    

    return (
      <div>
        <Modal
          show={show}
          onHide={() => close()}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Book this event
          </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ padding: 10, margin: 0 }}>
            <Loader loading={this.state.loading} />
            <PaymentModal show={this.state.payModal} onToken={(token) => this.onToken(token, event.ticketprice, event._id)} handleClose={() => this.setState({payModal: false})} />
            
            <Row>
              <Col lg={6} md={6} sm={6} xs={12}>
                <h6>{event.title}</h6>
                <div style={{ fontSize: 12 }}>{event.description}</div>
                <img src={`${Base_url}${event.eventbanner}`} height="200" width="200" />

              </Col>
              <Col lg={6} md={6} sm={6} xs={12}>
                <center>
                  <div className="price-div">Ticket price - ${ticketPrice}</div>
                  <div className="trans-fee">Transaction fee - ${additionPrice.toFixed(2)} (Included)</div>
                  <div className="available">Available - {event.totalcapacity - bookedusers}</div>
                  {/* <p>{event}</p> */}
                  {userdata ?
                    <div>
                      {available < 0 &&
                        <div style={{ color: 'red' }}>Booking not available</div>
                      }

                      {available > 0 && !this.state.booked && !this.findAlreadyBooked() == 1 && !this.isEventRunning_daily() && !this.isEventRunning_once() && !this.isEventRunning_weekly() && !this.isEventExpired() ?
                        <div className="book-event">
                          {freeForMembers == 'true' && isPaidMember == true ?
                          <button onClick={() => this.bookEventFree(event._id)} className="free-event-btn"> Book now (Free) </button>
                          : <button onClick={() => this.setState({payModal: true})} className="free-event-btn"> Book now</button>
                          }
                          </div> : ''
                      }

                      {this.isEventExpired() &&
                        <div style={{marginTop: 10, color: 'red'}}>
                          <span>Event expired !</span>
                        </div>
                      }

                      {this.state.booked ?
                        <div>
                          <div className="bokking-done">
                            Event Booking done
                            <p style={{color: 'blue', textAlign: 'center'}} onClick={() => GeneratePdf.Ticket(event, store)}>Print Ticket</p>
                         </div>
                         <div className="facebook-share" onClick={this.fbShare}>
                           Share on Facebook
                        </div>
                      </div> : ''
                      }

                      {this.findAlreadyBooked() == 1 && !this.isEventExpired() ?
                        <div className="already-booked">
                          Event already booked
                          <p style={{color: 'blue', textAlign: 'center'}} onClick={() => GeneratePdf.Ticket(event, store)}>Print Ticket</p>
                          <div className="facebook-share" onClick={this.fbShare}>
                           Share on Facebook
                        </div>
                      </div> : ''
                      }
                      {event.eventtype == 'once' && this.isEventRunning_once() ?
                        <div className="already-booked">
                          Event is running can not book now
                      </div> :
                        event.eventtype == 'daily' && this.isEventRunning_daily() ?
                          <div className="already-booked">
                            Event is running can not book now
                     </div> :
                          event.eventtype == 'weekly' && this.isEventRunning_weekly() ?
                            <div className="already-booked">
                              Event is running can not book now
                      </div> : null
                      }

                    </div> :
                    <div className="already-booked">
                      You need to login to book events
                  </div>
                  }
                </center>
              </Col>
            </Row>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
