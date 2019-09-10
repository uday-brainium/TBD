import React, { Component } from "react";
import {
  Container,
  Col,
  Row, 
  Alert
} from 'reactstrap';
import './style.css'
import { Link } from "react-router-dom"
import ApiService from "../services/api";

class ContactPage extends React.Component {

  state = {
    email: '',
    name: '',
    message: '',
    reason: '',
    alert: false
  }

  sendMail = (e) => {
    e.preventDefault()
    const { email, name, message, reason } = this.state
    const data = {
      from: email, name, reason, body: message
    }
    ApiService.send_contact_email(data)
    .then(res => {
      if(res.status == 200) {
        this.setState({email: '', name: '', message: ''}, () => {
          this.setState({alert: true})
          setTimeout(() => {
            this.setState({alert: false})
          }, 5000)
        })
        console.log(res);
      }
    })
  }

  changeField = (e) => {
    const name = e.target.name
    const value = e.target.value
    this.setState({[name]: value})
  }
  

  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col>
              <h3>Contact us</h3>
            </Col>
          </Row>
          <hr></hr>
          {this.state.alert && <Alert color="success">
            Thank you for contacting us, We will get back to you soon !
          </Alert> }
          <Row>
            <Col></Col>

            <Col className="contact-us-container">
            <form onSubmit={this.sendMail}>
              <div>
                <label>From email</label>
                <input type="email" onChange={this.changeField} name="email" placeholder="Enter your e-mail address" required/>
              </div>
              <div>
                <label>From name</label>
                <input type="text" name="name" onChange={this.changeField} placeholder="Enter your name" required/>
              </div>
              <div>
                <label>Reason</label>
                  <select name="reason" onChange={this.changeField}>
                    <option value="general">General Questions </option>
                    <option value="support">Customer Support</option>
                    <option value="inquiry">Third Party Inquiry</option>
                  </select>
              </div>
              <div>
                <label>Message</label>
                <textarea name="message" onChange={this.changeField} required></textarea>
              </div>
              <input type="submit" name="submit" value="Send" />

              </form>
            </Col>

            <Col></Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default ContactPage
