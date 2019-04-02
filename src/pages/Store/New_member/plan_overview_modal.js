import React, { Component } from 'react';
import { Row, Col, Modal, Button, Table} from 'react-bootstrap';
import Payment_btn from './payment_form'
import ApiService from './../../../services/api'
import {update_guest} from './update_guest'

export default class Plan_overview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: this.props.lastCreatedId,
    };
  }

   updateDb = (type, infoObj) => {
    let guestData = {
      userid: this.state.userid,
      member_type: type,
      payment_info: infoObj
    }
    ApiService.update_guest(guestData)
    .then(res => res.json())
    .then((response) => {
      console.log('response',response);
    })
  }

  chooseFree = () => {
    update_guest(this.state.userid, 'Free', null)
    this.props.moveToDone()
  }

  render() {
     const plan = this.props.plan
    return (
      <div>
        <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={this.props.show}
        onHide = {() => this.props.close()}
      >
      <center>
          <div className={`plan-heading-${plan}`} closeButton>
            <h5>{plan} Member</h5>
          </div>
        <Modal.Body className="plan-mal-body">
          <div className="plan-table">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Services</th>
                <th>Availibility</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Free Birthday Promotion</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>Earn Loyality Points</td>
                <td>{plan === 'Silver' || plan === 'Gold' ? 'Yes' : 'No'}</td>
              </tr>
              <tr>
                <td>Point bounus</td>
                <td>{plan === 'Silver'? 'Normal' : plan === 'Gold' ? 'Double points' : 'No'}</td>
              </tr>
              <tr>
                <td>Free Coupons</td>
                <td>{plan === 'Silver' || plan === 'Gold' ? 'Yes' : 'No'}</td>
              </tr>
              <tr>
                <td>Transaction Fees</td>
                <td>No (Zero)</td>
              </tr>
              <tr>
                <td>Free Delivery</td>
                <td>{plan === 'Silver'? '5 Free delivery / Month' : plan === 'Gold' ? 'Unlimited Free Delivery' : 'Delivery Charges Apply'}</td>
              </tr>
              <tr>
                <td>Free Event Tickets</td>
                <td>{plan === 'Silver'? 'Yes' : plan === 'Gold' ? 'Yes' : 'No'}</td>
              </tr>
            </tbody>
          </Table>
          </div>
         {plan === "Silver" &&
          <Payment_btn 
            plan = "Silver"
            price = {1000}
            userid = {this.state.userid}
            moveToDone = {this.props.moveToDone}
          />
         }
         {plan === "Gold" &&
          <Payment_btn 
           plan = "Gold"
           price = {2000}
           userid = {this.state.userid}
           moveToDone = {this.props.moveToDone}
          />
         }
         {plan === "Free" &&
          <Button className="plan-free-btn" onClick={this.chooseFree}>Choose Free</Button>
         }
        </Modal.Body>
        </center>
      </Modal>
      </div>
    );
  }
}
