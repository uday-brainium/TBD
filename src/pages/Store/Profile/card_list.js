import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

export default class Card_list extends Component {


  render() {
    const {cardnumber, expiry, deleteCard} = this.props
    return (
      <div>
        <div key={this.props.key} className="saved-cards animated slideInRight">
          <Row>
            <Col lg={3} md={3} sm={3} xs={3}>
              <img
                src="https://cdn4.iconfinder.com/data/icons/pretty_office_3/256/payment-card.png" 
                style={{width: '42px'}}
                />
            </Col>

            <Col lg={7} md={7} sm={7} xs={7}>
              <div className="card-info">
                <span>{cardnumber}</span><br />
                <span>Expire - {expiry}</span>
              </div>
            </Col>

            <Col lg={2} md={2} sm={2} xs={2}>
              <i onClick={() => deleteCard(cardnumber)} style={{ cursor: 'pointer' }} className="far fa-times-circle"></i>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
