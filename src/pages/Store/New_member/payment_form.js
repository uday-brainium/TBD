import React, { Component } from 'react';
import StripeCheckout from "react-stripe-checkout";
import {icon} from './../../../images/icon.png'
import ApiService from '../../../services/api';
import {update_guest} from './update_guest'

//const publishableKey =  "pk_test_MhebVDLCLPG4eUKvXs2wyUNO000lIPFW7p";
export default class Payment_stripe extends Component {
  
   state = {
     stripe: null,
     apikey: ''
    };


  componentDidMount() {
    ApiService.get_keys()
      .then(res => {
        if (res.status == 200) {
          const key = res.response.selectedKey.trim()
          this.setState({ apikey: key })
        }
      }) 
  }

 
   onToken = token => {
     console.log("APP", this.props.businessid);
     
    ApiService.profileData("", this.props.businessid)
    .then(profile => profile.json())
    .then(profile => {
      if(profile.success) {
        ApiService.get_keys()
        .then(fees => {
          if(fees.status == 200) {
            const paymentAcc = profile.data.payment.stripe_account.id
            const foodFee = fees.response.feeForFood.amount
            const amountType = fees.response.feeForFood.type
            const price = ( this.props.price / 100 )

            let toDeduct = 0

            if(amountType == 'Percent') {
              toDeduct = ((price * foodFee) / 100)
            } else {
              toDeduct = foodFee
            }

            const details = `loyality card ${this.props.plan}`
            const payToBusiness = (price - toDeduct)
            const stripeFormatAmount = Math.round(payToBusiness * 100)

            ApiService.transfer_money_to_business(paymentAcc, stripeFormatAmount, details)
            .then(payout => {
              console.log("Paymnet done", payout);
            })
          }
        })
      }
    })
    const body = {
      currency: "aud",
      amount: this.props.price,
      source: token.id,
    };
    ApiService.chargeStripe(body)
    .then(res => res.json())
    .then((response) => {
      update_guest(this.props.userid, this.props.plan, response)
      this.props.moveToDone()
      setTimeout(() => {

      }, 1000)
    })
  }

  render() {
    const {apikey} = this.state
    return (
      <div>
        {apikey != "" && 
        <StripeCheckout
         label={`Choose`} //Component button text
         name="TBD LLC" //Modal Header
         description={`Became a premium ${this.props.plan} member today.`}
         panelLabel={`${this.props.plan} Member`} //Submit button in modal
         amount={this.props.price} //Amount in cents $9.99
         token={this.onToken}
         stripeKey={apikey}
         image={icon} //Pop-in header image
         billingAddress={false}
        /> }
      </div>
    )
  }
}

