import React, { Component } from 'react';
import FoodFees from './Fees/foodFee'
import TicketFees from './Fees/ticketSellFee'
import LoyalityCharges from './Fees/loyalityCardFee'
import ReservationUpFee from './Fees/reservationUsageFee'
import ApiService from '../../../services/api';
import ReservationFee from './Fees/reservationCharge'
import './../Dashboard/style.css'
import './styles.css'


export default class AddCharges extends Component {

  state = {
    foodFee: {},
    ticketFee: {},
    loyalityFee: {},
    reservationFee: {},
    reservationUpFee: {},
    done: false
  }

  componentDidMount() {
    ApiService.get_keys()
    .then(res => {
      if(res.status == 200) {
        this.setState({
          foodFee: res.response.feeForFood,
          ticketFee: res.response.feeForTicket,
          loyalityFee: res.response.feeForLoyalityCard,
          reservationFee: res.response.feeForReservation,
          reservationUpFee: res.response.usageFeeReservation
        })
      }
    })
  }

  showMessage = () => {
    this.setState({done: true})
    setTimeout(() => {
      this.setState({done: false})
    }, 5000)
  }

  render() {
    const {foodFee, ticketFee, loyalityFee, reservationFee, reservationUpFee, done} = this.state
    return (
      <div className="editor-box">
        <h6>Charges for businessess</h6>
        {done && <span style={{color: 'green', textAlign: 'center', marginLeft: 10}}>Updated successfully</span>}
        {foodFee.type && <div>
          <FoodFees value={foodFee} alert={() => this.showMessage()}/>
          <TicketFees value={ticketFee} alert={() => this.showMessage()}/>
          <LoyalityCharges value={loyalityFee} alert={() => this.showMessage()}/>
          <ReservationUpFee value={reservationUpFee} alert={() => this.showMessage()}/>
          <ReservationFee value={reservationFee} alert={() => this.showMessage()}/>
        </div> }
      </div>
    );
  }
}
