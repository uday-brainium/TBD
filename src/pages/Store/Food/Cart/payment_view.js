import React, { Component } from 'react';
import StripeCheckout from "react-stripe-checkout"
import ApiService from '../../../../services/api';

// const publishableKey = "pk_test_MhebVDLCLPG4eUKvXs2wyUNO000lIPFW7p";

export default class PaymentView extends Component {

  state = {
    apiKey: ''
  }

  componentDidMount() {
    ApiService.get_keys()
      .then(res => {
        if (res.status == 200) {
          const key = res.response.selectedKey.trim()
          this.setState({ apiKey: key })
        }
      })
  }

  render() {
    const { props } = this
    const { apiKey } = this.state
    return (
      <div className="payment-view">
        Total amount to be paid -
         <br></br><p className="payment-price">$ {props.price}</p>
        {apiKey != '' &&
          <StripeCheckout
            label={`Make payment`} //Component button text
            name="TBD LLC" //Modal Header
            description={`Place your food order`}
            panelLabel={'Pay '} //Submit button in modal
            amount={props.price * 100} //Amount in cents $9.99
            token={props.onToken}
            stripeKey={apiKey}
            //image={} //Pop-in header image  
            billingAddress={false}
          />}
      </div>
    )
  }

}