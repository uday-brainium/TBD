import React, { Component } from 'react';
import ApiService from '../../services/api';


export default class Payback {

  static initiatePayback = (data) => {
    console.log("API", data);
    
    ApiService.profileData("", data.order.businessid)
    .then(res => res.json())
    .then(res => {
      if(res.success) {
        ApiService.get_keys()
        .then(fees => {
          if(fees.status == 200) {
            const paymentAcc = res.data.payment.stripe_account.id
            const price = data.order.paymentinfo.amount / 100
            const foodFee = fees.response.feeForFood.amount
            const amountType = fees.response.feeForFood.type

            const username = `${data.user.firstname} ${data.user.lastname}`
            let toDeduct = 0

            if(amountType == 'Percent') {
              toDeduct = ((price * foodFee) / 100)
            } else {
              toDeduct = foodFee
            }
            const payToBusiness = (price - toDeduct)
            const stripeFormatAmount = payToBusiness * 100
            console.log("deduct", payToBusiness);  

            //Pay amount to business
            ApiService.transfer_money_to_business(paymentAcc, stripeFormatAmount, username)
            .then(payout => {
              console.log("Paymnet done", payout);
            })
          }
        })
      
      }
    })
  }
}
