import React, { Component } from 'react';
import { Row, Col, Modal } from 'react-bootstrap';

export default class Add_to_cart extends Component {
 
  render() {
    return (
     <div>
        <Modal
          show={this.props.show}
          onHide={() => this.props.close()}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
             Add to cart
          </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h6>{this.props.data.itemtitle}</h6>
          </Modal.Body>
        </Modal>
     </div>
    );
  }
}
