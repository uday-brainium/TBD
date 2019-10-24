import React, { Component } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import './store.css'

export default class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
     <div className="footer-container">
      <Row>
        <Col xs={4} lg={4} md={4} sm ={4}> 
          <p>Business address,</p>
          <p>EN-60, Shakti tower, Brainium Information Technology </p> 
        </Col>

        <Col xs={4} lg={4} md={4} sm ={4}>
          <p>About Us</p>
          <p>Contact Us</p>
          <p>Phone - 01-123-1231-123</p>
        </Col>

        <Col xs={4} lg={4} md={4} sm ={4}>
          <p>Order food</p>
          <p>Register Complain</p>
          <p>Phone - 01-123-1231-123</p>
        </Col>

      </Row>
     </div>
    )
  }
}
