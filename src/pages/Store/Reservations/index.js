import React, { Component } from 'react';
import Header from '../header'
import Navigation from '../navigation'
import { withRouter } from "react-router-dom"
import ApiService from './../../../services/api'
import Loader from '../../components/simpleloader'
import Title_head from './../page_title_head'
import Footer from './../footer'
import { Row, Col, Modal } from 'react-bootstrap';
import Notifications, { notify } from 'react-notify-toast';
import './style.css'
import moment from 'moment';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import Reservations_modal from './reservation_modal'
import FilterTab from './filterTabs'
// import './main.scss'

let path = window.location.pathname
let storeName = path.split('/')[1];


class Reservations extends Component {
  state = {
    storeDetails: [],
    loading: false,
    reservationModal: false,
    bookingDetails: {},
    userReservation: [],
    filterTab: 0,
    stage: 0
  }


  componentDidMount() {
    //check if the user is looged in 
    let data = localStorage.getItem('guest-userdata')
    if (JSON.parse(data) == null) {
      this.props.history.push('login')
    } else {
      ApiService.getBusinessProfbyUrl(storeName)
        .then(res => res.json())
        .then(response => {
          if (response.status == 200) {
            this.setState({
              storeDetails: response.response,
              loading: false
            }, () => {
              this.getReservationList()
              this.getUserReservation()
            })
          } else {
            this.props.history.push('/')
          }
        })
        .catch(function (error) {
          console.log('err', error)
        })
    }
  }

  getReservationList = () => {
    const data = {
      resturentId: this.state.storeDetails.businessid
    }
    ApiService.getReservations(data)
      .then(res => res.json())
      .then(response => {
        this.setState({ reservationList: response.response })
      })

    ApiService.getBookingDetails(this.state.storeDetails.businessid)
      .then(res => res.json())
      .then(response => {
        this.setState({ bookingDetails: response.response })
      })
  }

  getUserReservation = () => {
    this.setState({loading: true})
    const data = localStorage.getItem('guest-userdata')
    const userid = JSON.parse(data)._id
    const stage = this.state.stage
    ApiService.getUserReservation(userid, stage)
      .then(res => res.json())
      .then(response => {
        this.setState({loading: false})
        this.setState({ userReservation: response.response })
      })
  }

  renderEvents = () => {
    let events = []
    if (this.state.reservationList) {
      this.state.reservationList.map((data, i) => {
        const test = moment(data.reservation.reservationDate).format('YYYY-MM-DD')
        const test2 = moment(data.reservation.reservationTime).format('hh:mm')
        const dateTimeString = `${test}T${test2}Z`
        const dateTime = Date.parse(dateTimeString)
    //    console.log(data);

        events.push(
          { title: `${data.reservation.tables} Tables`, date: dateTime }
        )
      })
    }
    return events
  }

  changeTab = (tab) => {
    this.setState({stage: tab, filterTab: tab}, () => {
      this.getUserReservation()
    })
  }
 
  closeModal = () => {
    this.setState({reservationModal: false})
    this.getUserReservation()
  }

  render() {
    const totalTables = this.state.bookingDetails.totalseats
    const booked = this.state.bookingDetails.booked
    const available = (totalTables - booked)
    return (
      <div>
        <Header
          storebanner={this.state.storeDetails.storebanner}
          rating={4.7}
          votes={75}
          businessname={this.state.storeDetails.businessname}
          address={this.state.storeDetails.address}
          phone={this.state.storeDetails.phone}
          modalShow={this.state.timeModal}
          timings={this.state.storeDetails.timings}
          closedon={this.state.storeDetails.closedon}
        />
        <Notifications />
        <Title_head title="Book a table" fa_icon_class="far fa-id-badge" hasRightmenu={true} username={true} />
        <Loader loading={this.state.loading} background='no-fill' />
        <Reservations_modal
          nav={this.props.history}
          show={this.state.reservationModal}
          close={this.closeModal}
          loader={(loader) => { this.setState({ loading: loader }); this.getReservationList() }}
        />
        <div className="container">
          <center className='center-content'>
            

            <hr></hr>

            <div>
              <Row>
                <Col lg={4} md={4} sm={8} xs={12} className="pad">
                  <button onClick={() => this.setState({ reservationModal: true })} className="button">Book a table</button>
                  <hr></hr>
                  <div className="my-booked-head"> <i className="fas fa-clipboard-list"></i> My booked tables</div>
                  {/* <div className="no-booking"> No booked table </div> */}
                  <FilterTab changeTab={(tab) => this.changeTab(tab)} active={this.state.filterTab}/>
                  {this.state.userReservation.length > 0 ?
                    this.state.userReservation.map(data => {
                    return (
                      <Row className="list-row">
                        <Col className="reservations-list">
                        <Row className="justified">
                         <Col lg={3} md={3} sm={3} xs={3}>
                          <div className="left-image">
                           { data.guestid === 0 ?
                              <img className="person-image" src={require('./../../../images/user.jpg')} /> :
                              <img className="person-image" src={require('./../../../images/user.jpg')} />
                            }
                           <div className="status-heading">
                           {data.stage === '0' ? <span style={{color: "green"}}>Booked</span> : 
                              data.stage === '2' ? <span style={{color: "green"}}>Ready</span> :
                              data.stage === '4' ? <span style={{color: "green"}}>Completed</span> : ''}
                           </div>

                          </div>
                         </Col>
                         <Col lg={9} md={9} sm={9} xs={9}>
                         <div>Name: {data.name}</div>
                          <div>Date: {new Date(data.reservationDate).toLocaleDateString()}</div>
                          <div>Time: {new Date(data.reservationTime).toLocaleTimeString()}</div>
                          <div>Table's: {data.tables}</div>
                          <div>Person's: {data.persons}</div>
                          <div>Status: {data.stage === '0' ? <span style={{color: "orange"}}>Booked</span> : 
                              data.stage === '2' ? <span style={{color: "green"}}>Ready to sit</span> :
                              data.stage === '4' ? <span style={{color: "green"}}>Completed</span> : ''}</div>
                          </Col>
                        </Row>
                        </Col>

                      </Row>
                    )
                  }) : <div style={{padding: 40}}>No data found !</div>}

                </Col>
                <Col lg={8} md={8} sm={4} xs={12}>
                  <div style={{ marginTop: 20 }}>
                    <FullCalendar 
                     defaultView="dayGridMonth" 
                     plugins={[ dayGridPlugin ]} 
                     events={this.renderEvents()}
                    />

                    <div className="">

                    </div>
                  </div>
                </Col>
              </Row>

            </div>
          </center>
        </div>
        <Navigation
          nav={this.props.history}
          store={storeName}
          storeData={this.state.storeDetails}
        />
        <Footer />
      </div>
    );
  }
}

export default withRouter(Reservations)