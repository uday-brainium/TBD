import React, { Component } from 'react';
import { Row, Col, Modal } from 'react-bootstrap';


export default class TimeModal extends Component {

  state = {
    time: 0
  }

  saveTime = () => {
    const rid = this.props.data.reservation._id
    const time = this.props.waitTime
    this.props.onSave(rid, time)
  }

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
              Customer arrived
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{margin: 0, padding: 2}}>
            <div className="time-modal-container">
            <center>
            <div className="modal-desc-text">Customer is present at resturent</div>
          
              {/* <div className="time-btn-div">
                <button onClick={this.saveTime} className="wait-time-btn">Okay</button>
              </div> */}
              <div className="row btn-row">
                  <button onClick={this.saveTime} style={{backgroundColor: '#ff6400', marginRight: 10}} className="col wait-time-btn">Continue</button>
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
