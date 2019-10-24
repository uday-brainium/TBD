import React, { Component } from 'react';
import AddCharge from './addCharges'

export default class Charges extends Component {
  render() {
    return (
      <div className="page-container">
        <h5 className="heading-text"><i className="fas fa-chart-bar"></i> Fees & Charges</h5>
        <hr></hr>

        <div className="content">
          <AddCharge />
        </div>
      </div>
    );
  }
}
