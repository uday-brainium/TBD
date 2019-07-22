import React, { Component } from 'react';
import { Row, Col, Modal } from 'react-bootstrap';

export default class AlertBox extends Component {


  render() {
    console.log("props", this.props.type);
    
    return (
      <div>
        <Modal
          show={this.props.show}
          onHide={() => console.log('hide')}
          size="sm"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
       
          <Modal.Body style={{padding: 10, margin: 5, backgroundColor: '#53bbe6', color: '#fff', fontWeight: 'bold'}}>
            <div className="time-modal-container">
              <center>
                {this.props.message}
              </center>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}


