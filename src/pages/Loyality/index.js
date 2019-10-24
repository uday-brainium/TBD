import React, { Component } from 'react';
import Loyality_member_form from './../components/members-offer-form'
import './loyality.css'
import { Row, Col } from 'react-bootstrap';
import Loader from './../components/simpleloader'
import ApiService from '../../services/api';
import Notifications, { notify } from 'react-notify-toast';
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
let token = localStorage.getItem('access-token-tbd')
let userid = localStorage.getItem('user-id')


 class Loyality_screen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
      foodpickup: false,
      reservation: false,
      eventbooking: 'undefined',
      reservationPoints: '',
      silverPrice: 10,
      goldPrice: 20,
      reRendered: 'none',
      loading: false,

      free_member_points: 'none',
      free_member_instant_promotion: 'no',
      free_member_birthday_promotion: 'yes',
      free_member_discount: '0',
      free_member_free_events: 'no',
      free_member_reservation: 'no',

      silver_member_points: 'double',
      silver_member_instant_promotion: 'yes',
      silver_member_birthday_promotion: 'yes',
      silver_member_discount: '3',
      silver_member_free_events: 'yes',
      silver_member_reservation: 'yes',
      silver_price: '10',

      gold_member_points: 'triple',
      gold_member_instant_promotion: 'yes',
      gold_member_birthday_promotion: 'yes',
      gold_member_discount: '5',
      gold_member_free_events: 'yes',
      gold_member_reservation: 'yes',

    };
  }

  componentDidMount() {
    let data = JSON.parse(localStorage.getItem('userdata')).data
      
    this.setState({
      userData: data,
      foodpickup: data.foodpickupservice,
      reservation: data.tablereservationservice,
      eventbooking: data.eventbooking,
      silverPrice: data.loyalitycardprice,
      minloyalitypoints: data.minloyalitypoints,

      eventPoints: data.eventbookingpoints,
      reservationPoints: data.pointsperreservation,
      pointsonsocialpost: data.fbsharepoints,
      goldPrice: data.memberservices.goldmember.gold_price,
      silverPrice: data.memberservices.silvermember.silver_price,
    })
    data.freemember != null ?
    this.setState({
      userData: data,
      reRendered: 'yes',
      
      free_member_points: data.memberservices.freemember.points,
      free_member_instant_promotion: data.memberservice.freemember.instant_promotion,
      free_member_birthday_promotion: data.memberservice.freemember.birthday_promotion,
      free_member_discount: data.memberservice.freemember.discount,
      free_member_free_events: data.memberservice.freemember.freeevents,
      free_member_reservation: data.freemember.reservation,

      silver_member_points: data.memberservices.silvermember.points,
      silver_member_instant_promotion: data.memberservices.silvermember.instant_promotion,
      silver_member_birthday_promotion: data.memberservices.silvermember.birthday_promotion,
      silver_member_discount: data.memberservices.silvermember.discount,
      silver_member_free_events: data.memberservices.silvermember.free_events,
      silver_member_reservation: data.memberservices.silvermember.reservation,
      silverPrice: this.state.silverPrice,

      gold_member_points: data.memberservices.goldmember.points,
      gold_member_instant_promotion: data.memberservices.goldmember.instant_promotion,
      gold_member_birthday_promotion: data.memberservices.goldmember.birthday_promotion,
      gold_member_discount: data.memberservices.goldmember.discount,
      gold_member_free_events: data.memberservices.goldmember.free_events,
      goldPrice: data.memberservices.goldmember.gold_price,
    }) : ''
    //console.log(data);
  }

  handelSubmit = (e) => {
    e.preventDefault()
    this.setState({loading: true})
    let updateData = {
      userid: userid,
      foodpickupservice: this.state.foodpickup,
      tablereservationservice: this.state.reservation,
      eventbooking: this.state.eventbooking,
      minloyalitypoints: this.state.minloyalitypoints,

      eventbookingpoints: this.state.eventPoints,
      pointsperreservation: this.state.reservationPoints,
      fbsharepoints: this.state.pointsonsocialpost,
      loyalitycardprice: this.state.silverPrice,
      memberservices: {
        freemember: {
          points: this.state.free_member_points,
          instant_promotion: this.state.free_member_instant_promotion,
          birthday_promotion: this.state.free_member_birthday_promotion,
          discount: this.state.free_member_discount,
          free_events: this.state.free_member_free_events,
          reservation: this.state.free_member_reservation,
       },
       silvermember: {
          points: this.state.silver_member_points,
          instant_promotion: this.state.silver_member_instant_promotion,
          birthday_promotion: this.state.silver_member_birthday_promotion,
          discount: this.state.silver_member_discount,
          free_events: this.state.silver_member_free_events,
          reservation: this.state.silver_member_reservation,
          silver_price: this.state.silverPrice, 
       },
       goldmember: {
          points: this.state.gold_member_points,
          instant_promotion: this.state.gold_member_instant_promotion,
          birthday_promotion: this.state.gold_member_birthday_promotion,
          discount: this.state.gold_member_discount,
          free_events: this.state.gold_member_free_events,
          reservation: this.state.gold_member_reservation,
          gold_price: (this.state.goldPrice)
       }
      }
    }

    ApiService.editLoyality(updateData, token)
    .then((res) => res.json())
    .then((response) => {
      if(response.status == '200') {
        this.setState({loading: false})
        notify.show('Updated successfully', 'success', 3000);
        let newData = {data: response.response}
        localStorage.setItem('userdata', JSON.stringify(newData))
      } else {
        notify.show('Failed to update ! try again', 'error', 3000);
        this.setState({loading: false})
      }
    })
  }

  renderOptions = () => {
    let i; let options = []
    for(i = 5; i < 26; i++) {
      options.push(<option key={i} value={i}>{`$ ${i}`}</option>)
    }
    return options
  }


  change = (e) => {
    let name = e.target.name
    let val = e.target.value
    if(name == "reservation") {
      this.setState({[name]: !this.state.reservation})
    } else {
      this.setState({[name]: val})
    }

    if(name == "eventbooking") {
      this.setState({[name]: !this.state.eventbooking})
    }
    if(name == "foodpickup") {
      this.setState({[name]: !this.state.foodpickup})
    }
    
  }

  loyalityPrice = (e) => {
    this.setState({silverPrice: e.target.value})
  }

  render() {

    return (
      <div className="content-container">
        <div>
          <div className="rightSideHeader">
            <ul className="breadcrumbNavigation">
                <li><i className="fas fa-cookie-bite breadcumb-icon"></i></li>
                <li className="breadcumb-text"><span className="left-space">Loyality & features</span></li>
            </ul>
          </div>
          <Loader loading={this.state.loading} fill="no-fill" />
          <Notifications/>
          <Row style={{padding: 20}}>
          <Col xs={12} md={12} lg={2} sm={12}></Col>
          <Col  xs={12} md={12} lg={8} sm={12} style={{paddingBottom: '50px'}}>
           <div className="feature-edit-container">
            <form className="form" onSubmit={this.handelSubmit}>

            <Row>
              <Col>
               <div className="inputOuter step3">
                  <div className=""> * Silver card price</div>
                    {/* <input placeholder="Loyality card price" type="text" name="loyalitycardprice" onChange={(e) => this.props.change(e)} /> */}
                    <select value={this.state.silverPrice} onChange={this.change} name="silverPrice">
                      {this.renderOptions()}
                    </select>
                </div>

              </Col>

              <Col>
              <div className="inputOuter step3">
                <div className=""> *Gold card price</div>
                  {/* <input placeholder="Loyality card price" type="text" name="loyalitycardprice" onChange={(e) => this.props.change(e)} /> */}
                  <select value={this.state.goldPrice} onChange={this.change} name="goldPrice">
                    {this.renderOptions()}
                  </select>
              </div>

              </Col>
            </Row>
           
            <div className="inputOuter">
                <div className=""> *Minimum loyality points</div>
                <input placeholder="Loyality points need to get promotion" type="text" defaultValue={this.state.minloyalitypoints} name="minloyalitypoints" onChange={this.change} />
            </div>

            <div className="inputOuter">
                <div className=""> *Points on social media post</div>
                <input placeholder="Loyality points on social post" defaultValue={this.state.pointsonsocialpost} type="text" name="pointsonsocialpost" onChange={this.change} />
            </div>

            <div className="singleCheckbox">
                <input id="foodpickup" type="checkbox" name="foodpickup" checked={this.state.foodpickup} onChange={this.change} />
                <label htmlFor="foodpickup"><span></span>Food pickup or Take out</label>
            </div>

            {this.state.foodpickup &&
            <div className="checkbox-details-text">
              <p className="info-text"> You need to setup food menu after login for this feture.</p>
            </div>}

            <div className="singleCheckbox">
                <input id="reservation" type="checkbox" name="reservation" checked={this.state.reservation} onChange={this.change} />
                <label htmlFor="reservation"><span></span>Table reservation</label>
            </div>

            {this.state.reservation &&
              <div className="inputOuter">
              <input placeholder="Points earning per reservation" defaultValue={this.state.reservationPoints} type="text" name="reservationPoints" onChange={this.change} />
              </div>
            }

            <div className="singleCheckbox">
              <input id="event" type="checkbox" name="eventbooking" checked={this.state.eventbooking} onChange={this.change} />
                <label htmlFor="event"><span></span>Event/Ticket booking</label>
              </div>

              {this.state.eventbooking &&
                <div className="inputOuter">
                <input placeholder="Points earning per Event/Ticket booking" defaultValue={this.state.eventPoints} type="text" name="eventPoints" onChange={this.change} />
                </div>
              }
          
              <div className="container-inside">
              <Loyality_member_form 
                foodpickup = {this.state.foodpickup}
                reservation = {this.state.reservation}
                eventbooking = {this.state.eventbooking}
                silverPrice = {this.state.silverPrice}
                goldPrice = {this.state.goldPrice}
                changeLoyalityPrice = {(e) => this.loyalityPrice(e)}
                defaults = {this.state.userData.memberservices}
                change = {this.change}
              />
              </div>

              <button className="button" type="submit"> Edit Features </button>
            </form>
            </div>
          </Col>
          <Col  xs={12} md={12} lg={2} sm={12}></Col>
        </Row>
       
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.primaryuserdata
  }
}

export default connect(mapStateToProps, null)(withRouter(Loyality_screen))
