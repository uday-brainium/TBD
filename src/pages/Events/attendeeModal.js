import React, { Component } from 'react';
import { Row, Col, Modal, Table } from 'react-bootstrap';

export default class AttendeeModal extends Component {


  render() {
    const { show, close, attending } = this.props
    return (
      <div>
        <Modal
          show={show}
          onHide={() => close()}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Attending persons
          </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ width: '100%', padding: 0 }}>
            <div>
              <Table striped bordered hover size="sm" style={{width: '96%'}}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Username</th>
                    <th>Payment</th>
                  </tr>
                </thead>
                <tbody>
                  {attending.map((data, i) => (
                    <tr>
                      <td>{i+1}</td>
                      <td>{data.username}</td>
                      <td style={{color: 'green'}}>{data.paid ? 'Done' : 'Pending'}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              {attending.length < 1 && 
                <div className="no-attend">No user attending</div>
              }
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
