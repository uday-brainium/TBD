import React, { Component } from 'react';
import './style.css'
import BusinessList from './onlineList'
import WeeklyRev from './../Stats/weeklyRevenue'
import LoyalityCards from './../Stats/loyalityCards'
import GuestOnline  from './../Stats/onlineGuests'

export default class OnlineUsers extends Component {


  render() {
    return (
      <div className="page-container">
        <h5 className="heading-text"><i className="fas fa-sliders-h"></i>  Dashboard</h5>
        <hr></hr>

        <div className="content">
          <WeeklyRev />
          <LoyalityCards />
          <BusinessList />
          <GuestOnline />
        </div>
      </div>
    );
  }
}
