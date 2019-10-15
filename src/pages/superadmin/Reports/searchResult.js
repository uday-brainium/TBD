import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

export default class SearchResult extends Component {
  render() {
    const {result, onMonitor, blockUnblock} = this.props

    return (
      <div>
        <h6 style={{marginTop: 10, marginBottom: -5}}>Matching businesses</h6>
        <hr></hr>
        <div className="result-box">
        {result.map(business => (
          <div key={business._id} className="editor-box">
            <Row >
              <Col lg={3}> 
                <h6>Business Name</h6>
                <p style={{fontSize: 14, marginTop: -2, marginBottom: -2}}>{business.businessname}</p>
              </Col>
              <Col>
                <h6>State</h6>
                <p style={{fontSize: 14, marginTop: -2, marginBottom: -2}}>{business.state}</p>
              </Col>
              <Col>
                <h6>City</h6>
                <p style={{fontSize: 14, marginTop: -2, marginBottom: -2}}>{business.city}</p>
              </Col>
              <Col>
                <h6>Zipcode</h6>
                <p style={{fontSize: 14, marginTop: -2, marginBottom: -2}}>{business.zipcode}</p>
              </Col>
              <Col>
              <span>
                <button className="monitor-btn" onClick={() => onMonitor(business._id, business.businessname)}> Monitor </button>
                <button className={business.isBlocked ? `monitor-btn` : `monitor-btn-block` } onClick={() => blockUnblock(business._id)}>{business.isBlocked ? 'Unblock' : 'Block'}  </button>
              </span>
              </Col>
            </Row>
          </div> 
          ))}

          {result.length < 1 && 
          <div>
            <h4 style={{textAlign: 'center'}}>No result found !</h4>
          </div>}
        </div>

      </div>
    );
  }
}
