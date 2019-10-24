import React, { Component } from 'react';
import Member_form_part from './members-offer-form'
import { Row, Col } from 'react-bootstrap';
var scrollToElement = require('scroll-to-element');


export default class Step3 extends Component {

  constructor(props) {
    super(props)
    this.state = {
      foodpickup : false,
      eventservice: false,
      reservation: false,
      loyalityPoints: 10,
      silver_price: 10,
      gold_price: 20
    }
    scrollToElement(".step3")
  }
  
  renderOptions = () => {
    let i; let options = []
    for(i = 5; i < 26; i++) {
      options.push(<option key={i} value={i}>{`$ ${i}`}</option>)
    }
    return options
  }

  foodPickupChoose = (e) => {
    this.props.change(e)
    this.setState({foodpickup: e.target.checked})
  }
  eventServiceChoose = (e) => {
    this.props.change(e)
    this.setState({eventservice: e.target.checked})
  }
  reservationChoose = (e) => {
    this.props.change(e)
    this.setState({reservation: e.target.checked})
  }

  loyalityPoints = (e) => {
    this.setState({loyalityPoints: e.target.value})
    this.props.change(e)
  }

  change = (e) => {
    if(e.target.name == 'silver_price') {
      this.setState({silver_price: e.target.value})
    } else {
      this.setState({gold_price: e.target.value})
    }
    
    this.props.change(e)
  }


  loyalityChange = (e) => {
    console.log(e.target.value);
    
    this.setState({loyalityPoints: e.target.value})
    let event = {
      target: {
        value: e.target.value,
        name: 'loyalitycardprice'
      }
    }
    this.props.change(event)
  }

  render() {
    return (
      <div className="animated slideInRight delay-0.5s" >
      
            <Row>
              <Col>
               <div className="inputOuter step3">
                  <div className=""> * Silver card price</div>
                    {/* <input placeholder="Loyality card price" type="text" name="loyalitycardprice" onChange={(e) => this.props.change(e)} /> */}
                    <select value={this.state.silver_price} onChange={this.change} name="silver_price">
                      {this.renderOptions()}
                    </select>
                </div>

              </Col>

              <Col>
              <div className="inputOuter step3">
                <div className=""> *Gold card price</div>
                  {/* <input placeholder="Loyality card price" type="text" name="loyalitycardprice" onChange={(e) => this.props.change(e)} /> */}
                  <select defaultValue={this.state.gold_price} value={this.state.gold_price} onChange={this.change} name="gold_price">
                    {this.renderOptions()}
                  </select>
              </div>
              </Col>
            </Row>

        <div className="inputOuter">
            <input placeholder="Loyality points need to get promotion" type="text" name="minloyalitypoints" onChange={(e) => this.props.change(e)} />
        </div>

        <div className="inputOuter">
            <input placeholder="Loyality points on social post"  type="text" name="pointsonsocialpost" onChange={(e) => this.props.change(e)} />
        </div>

        <div className="singleCheckbox">
            <input id="foodpickup" type="checkbox" name="foodpickup" defaultChecked={this.props.foodpickup} onChange={(e) => this.foodPickupChoose(e)} />
            <label htmlFor="foodpickup"><span></span>Food pickup or Take out</label>
        </div>

        {this.props.foodpickup &&
        <div className="checkbox-details-text">
          <p className="info-text"> You need to setup food menu after login for this restaurant.</p>
        </div>}

        <div className="singleCheckbox">
            <input id="reservation" type="checkbox" name="reservation" defaultChecked={this.props.reservation} onChange={(e) => this.reservationChoose(e)} />
            <label htmlFor="reservation"><span></span>Table reservation</label>
        </div>

        {this.props.reservation &&
          <div className="inputOuter">
           <input placeholder="Points earning per reservation" type="text" name="pointsperreservation" onChange={(e) => this.props.change(e)} />
          </div>
        }

        <div className="singleCheckbox">
          <input id="event" type="checkbox" name="eventbooking" defaultChecked={this.props.eventbooking} onChange={(e) => this.eventServiceChoose(e)} />
            <label htmlFor="event"><span></span>Event/Ticket booking</label>
          </div>

          {this.props.eventbooking &&
            <div className="inputOuter">
            <input placeholder="Points earning per Event/Ticket booking" type="text" name="eventbookingpoints" onChange={(e) => this.props.change(e)} />
            </div>
          }
          <div>
          <div className="info-text member-label">* Services for members</div>
           <Member_form_part 
            foodpickup = {this.state.foodpickup}
            reservation = {this.state.reservation}
            eventbooking = {this.state.eventservice}
            silverPrice = {this.state.silver_price}
            goldPrice = {this.state.gold_price}
            changeLoyalityPrice = {(e) => this.loyalityChange(e)}
            defaults = {0} //Important to render
            change = {this.props.change}/>
          </div>
          

        </div>
    );
  }
}
