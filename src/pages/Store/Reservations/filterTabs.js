import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

export default class FilterTabs extends Component {


  render() {
    const {active, changeTab} = this.props
    return (
      <div className="filter-container">
        <Row className="f-row">
          <Col onClick={() => changeTab(0)} className={active === 0 ? `f-tab f-active` : `f-tab` }>
            Upcoming 
          </Col>
          
          <Col onClick={() => changeTab(2)} className={active === 2 ? `f-tab f-active` : `f-tab` }>
            Ready 
          </Col>
          
          <Col onClick={() => changeTab(4)} className={active === 4 ? `f-tab f-active` : `f-tab` }>
            Completed
          </Col>
        </Row>
      </div>
    );
  }
}
