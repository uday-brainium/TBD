import React, { Component } from 'react';
import Loader from './../components/simpleloader'
import Page_head from './../components/page_head';
import SalesPerHour from './salesPerHour'
import ReservationPerHour from './reservationPerHour'
import SalesPerItem from './sales_per_item'
import SocialPostPerHour from './socialPostsPerHour'
import MonthlyReport from './monthly_report'
import RevenueReport from './revenue_report'

const logged = localStorage.getItem('user-id')
export default class Reports extends Component {
  state = {
    loading: false
  }

  componentDidMount() {
    if(!logged) {
      this.props.history.push('/')
    }
  }

  render() {
    return (
      <div className="content-container">
        <Page_head title = "Business reports" icon="fas fa-clipboard"/>
        <Loader loading={this.state.loading} fill="no-fill" />
        <div className="container-inside">
          <SalesPerHour />
          <ReservationPerHour />  
          <SalesPerItem />
          <SocialPostPerHour />
          <MonthlyReport />
          <RevenueReport />
        </div>
      </div>
    );
  }
}
