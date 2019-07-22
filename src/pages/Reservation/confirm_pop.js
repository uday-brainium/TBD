import React, { Component } from 'react';
import { Row, Col, Modal } from 'react-bootstrap';


export default class ConfirmPop extends Component {

  state = {
    time: 0
  }

  saveTime = () => {
    const rid = this.props.data.reservation._id
    const time = this.state.time
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
              Are you sure ?
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{margin: 0, padding: 2}}>
            <div className="time-modal-container">
            <center>
              <div className="modal-desc-text">
               {!this.props.delete ?
                'By making table ready user will notified that there table is ready to sit.'
               : 'This post will be deleted !'}
              </div>
              <div className="row btn-row">
                  <button onClick={() => this.props.onSave(this.props.data)} style={{backgroundColor: '#ff6400', marginRight: 10}} className="col wait-time-btn">Continue</button>
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
