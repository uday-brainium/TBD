import React, { Component } from 'react';
import { Row, Col, Modal } from 'react-bootstrap';


export default class ConfirmPop extends Component {



  render() {

    return (
      <div>
          <Modal
          show={this.props.show}
          onHide={() => this.props.close()}
          size="sm"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton style={{padding: 10, }}>
            <Modal.Title id="contained-modal-title-vcenter">
            Redeem This Voucher
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{margin: 0, padding: 2}}>
            <div className="time-modal-container">
            <center>
              <div className="modal-desc-text">
                You are redeeming this voucher this at resturent. Resturent owner should give you discount as the value of the voucher
              </div>
              <div className="row btn-row">
                  <button onClick={this.props.onRedeme} style={{backgroundColor: '#ff6400', marginRight: 10}} className="col wait-time-btn">Continue</button>
                  <button onClick={this.props.close} className="col wait-time-btn" >Cancel</button>
              </div>
            </center>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
