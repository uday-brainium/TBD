import React, { Component } from 'react';
import ApiService from '../../../services/api';
import { Row, Col } from 'react-bootstrap'

export default class InactiveReports extends Component {

  state = {
    list: []
  }

  componentDidMount() {
    ApiService.inactivity_reports()
    .then(res => { 
      if(res.status == 200) {
        this.setState({list: res.data})
      }
    })
  }


  render() {
    const {list} = this.state
    return (
      <div className="editor-box" style={{marginTop: 40}}>
        <h6>Inactivity reports (Businesses has no sale in past 30 days)</h6>
        
        <div style={{marginTop: 30}}>
        {list.map(business => (
         <div key={business._id} className="editor-box">
            <Row >
              <Col lg={3}> 
                <h6>Business  </h6>
                <p style={{fontSize: 14, marginTop: -2, marginBottom: -2}}>{business.businessname}</p>
              </Col>
              <Col>
                <h6>Email</h6>
                <p style={{fontSize: 14, marginTop: -2, marginBottom: -2}}>{business.email}</p>
              </Col>
              <Col>
                <h6>Phone</h6>
                <p style={{fontSize: 14, marginTop: -2, marginBottom: -2}}>{business.phone}</p>
              </Col>
              <Col>
                <h6>City</h6>
                <p style={{fontSize: 14, marginTop: -2, marginBottom: -2}}>{business.city}</p>
              </Col>
              {/* <Col>
              <span>
                <button className="monitor-btn" onClick={() => onMonitor(business._id, business.businessname)}> Monitor </button>
                <button className="monitor-btn" onClick={() => alert('Are you sure ?')}> Blo </button>
              </span>
              </Col> */}
            </Row>
          </div>          
        ))}
        </div>
      </div>
    );
  }
}
