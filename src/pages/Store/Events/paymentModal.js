import React, { Component } from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap'
import './../Profile/profile.css'
import ApiService from '../../../services/api';
import Loader from './../../components/simpleloader'
import SimpleCrypto from "simple-crypto-js";

var _secretKey = "doublesat_encryption_1231231239980";
var simpleCrypto = new SimpleCrypto(_secretKey);

export default class PaymentModal extends Component {
  
  state = {
    cardnumber: '',
    name: '',
    month: '01',
    year: '2018',
    cvv: '',
    savedCards: [],
    loading: false,
    error: ''
  }

  componentDidMount() {
    const savedCards = localStorage.getItem('guest-userdata')
    const cards = savedCards ? JSON.parse(savedCards).saved_cards : []
    this.setState({savedCards: cards})
  }

  changeField = (e) => {
    const name = e.target.name
    const value = e.target.value
    console.log('NAMe', name, value);
    if (name == "cardnumber") {
      let cardn = e.target.value.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
      this.setState({cardnumber: cardn})
    } else {
       this.setState({[name]: value})
    }
  }
  
  generateToken = (e) => {
    e.preventDefault()
    const { cardnumber, month, year, cvv, name } = this.state
    this.setState({loading: true, error: ''})
    const data = {
      number: cardnumber,
      exp_month: month,
      exp_year: year,
      cvc: cvv,
      name
    }
    ApiService.create_token(data)
    .then(res => {
      console.log("test", res);
      
      if(!res.error) {
         this.props.onToken(res.id)
      } else {
        this.setState({loading: false, error: res.error.message})
      }
    })
  }

  renderYear = () => {
    let years = []
    for(let i=2018; i < 2050; i++) {
      years.push(<option key={i} value={i}>{i}</option>)
    }
   return years
  }

  useCard = (card) => {
    console.log("CARD", card);
    this.setState({
      cardnumber: simpleCrypto.decrypt(card.cardnumber),
      month: card.month,
      year: card.year,
      name: card.name
    })
  } 

  render() {
    const { show, handleClose } = this.props
    const {savedCards} = this.state
    return (
      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Make payment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
             <Loader loading={this.state.loading} />
              <span>Saved cards</span>
              <div className="card-list">
                <Row>
                {savedCards.map(data => (
                  <Col ls={6} md={6} sm={6} xs={12}>
                    <div className="card" onClick={() => this.useCard(data)}>
                      <i>Card: ******{simpleCrypto.decrypt(data.cardnumber).substr(simpleCrypto.decrypt(data.cardnumber).length - 5)}</i>
                      <i>Expiry: {data.month}/{data.year}</i>
                    </div>
                  </Col>
                ))}
                </Row>
              </div>
              <span style={{color: 'red', fontSize: 14, textAlign: 'center'}}>{this.state.error}</span>
              <div className="add-new-card animated slideInRight">

                <form onSubmit={this.generateToken}>
                  <div>
                    <span>Card number</span>
                    <input maxLength="19" value={this.state.cardnumber} name="cardnumber" type="text" onChange={this.changeField} className="card-input" required />
                  </div>

                  <Row>
                    <Col>
                      <div>
                        <span>Name on card</span>
                        <input name="name" value={this.state.name} type="text" onChange={this.changeField} className="card-input" required />
                      </div>
                    </Col>

                    <Col>
                      <div>
                        <span>CVV</span>
                        <input name="cvv" maxLength={3} type="password" onChange={this.changeField} className="card-input" required />
                      </div>
                    </Col>
                  </Row>

                  <Row>

                    <Col>
                      <div>
                        <span>Month</span>
                        <select value={this.state.month} name="month" onChange={this.changeField} className="card-input" required>
                          <option value="01">Jan</option>
                          <option value="02">Feb</option>
                          <option value="03">March</option>
                          <option value="04">April</option>
                          <option value="05">May</option>
                          <option value="06">June</option>
                          <option value="07">July</option>
                          <option value="08">August</option>
                          <option value="09">September</option>
                          <option value="10">October</option>
                          <option value="11">November</option>
                          <option value="12">December</option>
                        </select>
                      </div>
                    </Col>

                    <Col>
                      <div>
                        <span>Year</span>
                        <select value={this.state.year} name="year" onChange={this.changeField} className="card-input" required>
                          {this.renderYear()}
                        </select>
                      </div>
                    </Col>
                  </Row>
                  <input type="submit" name="submit" value="Pay Now" className="add-payment btn" />
                </form>
              </div>
            </div>

          </Modal.Body>
        </Modal>
      </div>
    )
  }

}