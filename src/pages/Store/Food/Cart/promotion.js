import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

export default class Promotion extends Component {

  render() {
    const {promo, onApply} = this.props
    return (  
      <div className="promotion-container">
        <Row className="pcode-row">
          <Col>
            <div className="promocode">{promo.promocode}</div>
            <div>{promo.discounttype === 'doller' ? `$${promo.discountvalue}` : `${promo.discountvalue}%`} Discount</div>
          </Col>

          <Col>
            <button onClick={() => onApply(promo)} className="back-to-menu">Apply</button>
          </Col>
        </Row>
       
      </div>
    );
  }
}
