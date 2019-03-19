import React, { Component } from 'react';
import './../../styles/style_sheet.css'

let lastpage = document.referrer
export default class Permission_denied extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  goBack = () => {
    console.log(document.refferer)
  }

  render() { 
    return (
      <center className="no-permission">
      <center>
        <div className="error-banner">
          Not enough permission to view <br></br>
          <a href='http://doublesat.com'><button className="btn btn-info">Back to Home</button></a>
        </div>
        
        </center>
      </center>
    );
  }
}
