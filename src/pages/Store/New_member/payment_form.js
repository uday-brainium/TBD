import React, { Component } from 'react';
import StripeCheckout from "react-stripe-checkout";
import {icon} from './../../../images/icon.png'
import ApiService from '../../../services/api';
import {update_guest} from './update_guest'
const publishableKey = "pk_test_MhebVDLCLPG4eUKvXs2wyUNO000lIPFW7p";


export default class Payment_stripe extends Component {
  constructor() {
    super();
    this.state = {stripe: null};
  }
 
   onToken = token => {
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
    })
  }

  render() {

    return (
      <div>
        <StripeCheckout
         label={`Choose`} //Component button text
         name="TBD LLC" //Modal Header
         description={`Became a premium ${this.props.plan} member today.`}
         panelLabel={`${this.props.plan} Member`} //Submit button in modal
         amount={this.props.price} //Amount in cents $9.99
         token={this.onToken}
         stripeKey={publishableKey}
         image={icon} //Pop-in header image
         billingAddress={false}
        />
      </div>
    )
  }
}

