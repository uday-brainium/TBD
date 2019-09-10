import React, { Component } from 'react';
import StripeCheckout from "react-stripe-checkout"  

const publishableKey = "pk_test_MhebVDLCLPG4eUKvXs2wyUNO000lIPFW7p";


export default function PaymentView(props) {

  return (
      <StripeCheckout
        label={`Book event`} //Component button text
        name="TBD LLC" //Modal Header
        description={`Place your food order`}
        panelLabel={'Pay '} //Submit button in modal
        amount={props.price * 100} //Amount in cents $9.99
        token={props.onToken}
        stripeKey={publishableKey}
        //image={} //Pop-in header image  
        billingAddress={false}
      />
  )

}