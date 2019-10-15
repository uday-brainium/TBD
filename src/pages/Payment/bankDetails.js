import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class BankDetails extends Component {

  state = {
    routing: '',
    account: '',
    ssn: ''
  }

  createAccount = () => {
    const {routing, account, ssn} = this.state
    this.props.createStripe(routing, account, ssn)
  }

  close = () => {
    this.props.close()
  }

  changeField = (e) => {
    const name = e.target.name
    const value = e.target.value
    this.setState({[name] : value})
  }

  render() {
    const {isOpen, error, success} = this.props
    return (
      <center>
         <Modal isOpen={isOpen} toggle={this.close}>
          <ModalHeader toggle={this.toggle}>Add Bank with Stripe Connect</ModalHeader>
          <ModalBody>
            <p style={{textAlign: 'center', color: 'red', fontSize: 12}} >
              {error}
            </p>
            <p style={{textAlign: 'center', color: 'green', fontSize: 12}} >
              {success}
            </p>
            <div className="input-div">
              <div>
                 <label>SSN number last 4 digit</label>
                 <input className="bank-input" type="text" onChange={this.changeField} maxLength={4} placeholder="SSN number (Last 4 digit)" name="ssn" />
              </div>

              <div className="input-div">
                 <label>Routing number</label>
                 <input className="bank-input" type="text" onChange={this.changeField} placeholder="Routing Number" name="routing" />
              </div>

              <div className="input-div">
                 <label>Account number</label>
                 <input className="bank-input" type="text" onChange={this.changeField} placeholder="Account Number" name="account" />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.createAccount}>Submit</Button>{' '}
            <Button color="secondary" onClick={this.close}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </center>
    );
  }
}
