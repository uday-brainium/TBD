import React, { Component } from 'react';
import StripeCheckout from "react-stripe-checkout"  

const publishableKey = "pk_test_MhebVDLCLPG4eUKvXs2wyUNO000lIPFW7p";


export default function PaymentView(props) {

  return (
    <div className="payment-view">
      Total amount to be paid -
         <br></br><p className="payment-price">$ {props.price}</p>

      <StripeCheckout
        label={`Make payment`} //Component button text
        name="TBD LLC" //Modal Header
        description={`Place your food order`}
        panelLabel={'Pay '} //Submit button in modal
        amount={props.price * 100} //Amount in cents $9.99
        token={props.onToken}
        stripeKey={publishableKey}
        //image={} //Pop-in header image  
        billingAddress={false}
      />
    </div>
  )

}