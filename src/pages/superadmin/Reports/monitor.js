import React, { Component } from 'react';
import { withRouter } from "react-router-dom"
import SalesPerHour from './../../Reports/salesPerHour'
import ReservationPerHour from './../../Reports/reservationPerHour'
import SalesPerItem from './../../Reports/sales_per_item'
import SocialPostPerHour from './../../Reports/socialPostsPerHour'
import MonthlyReport from './../../Reports/monthly_report'
import RevenueReport from './../../Reports/revenue_report'
// import './../../Reports/styles.css'

class MonitorBusiness extends Component {

  state = {
    businessId: '',
    business: ''
  }

  componentDidMount() {
    const {id, name} = this.props.location.state
    this.setState({ businessId: id, business: name })
  }

  render() {
    const businessId = this.props.location.state.id
    return (
      <div className="content-container">
        <h5 className="heading-text"><i className="fas fa-chart-bar"></i> {this.state.business}</h5>
        <hr></hr>
        <div className="container-inside">
          <SalesPerHour businessId={businessId} />
          <ReservationPerHour businessId={businessId} />
          <SalesPerItem businessId={businessId} />
          <SocialPostPerHour businessId={businessId} />
          <MonthlyReport businessId={businessId} />
          <RevenueReport businessId={businessId} />
        </div>
      </div>
    );
  }
}


export default withRouter(MonitorBusiness)

