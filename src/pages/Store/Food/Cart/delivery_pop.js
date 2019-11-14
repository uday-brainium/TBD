import React, { Component } from 'react';
import { Row, Col, Modal } from 'react-bootstrap';
import ApiService from '../../../../services/api';
import Loader from './../../../components/simpleloader'
import PaymentView from './payment_view'
import PaymentModal from './../../Events/paymentModal'
import './../../Events/style.css'

export default class Delivery_modal extends Component {

  state = {
    addNewClick: false,
    loading: false,
    addressSaved: false,
    address: '',
    zipcode: '',
    chodeAddress: {},
    payment: false,
    step: 1,
    deliverOption: false,
    pickup: true,
    payModal: false
  }

  componentDidMount () {
    const {userdata} = this.props
    if(userdata.address2 != null) {
      this.setState({address: userdata.address2.address, zipcode: userdata.address2.zipcode})
    }

  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log("OPTION", this.props.isDelivery, nextProps.isDelivery);
    
    if(nextProps.isDelivery) {
      this.setState({step: 2})
    } else {
      this.setState({step: 1})
    }
  }


  changeFields = (e) => {
    const name = e.target.name;
    const value = e.target.value

    this.setState({[name] : value})
  }

  editAddress = () => {
    this.setState({addressSaved: false, addNewClick: true})
  }

  saveAddress = () => {
    this.setState({loading: true})
    const {userdata} = this.props
    const data = {
      guestid: userdata._id,
      address: this.state.address,
      zipcode: this.state.zipcode,
      city: userdata.city,
      state: userdata.state,
      country: userdata.country
    }
    ApiService.addNewAddress(data)
    .then(res => res.json())
    .then(response => {
     // console.log('Hello world', response);
      if(response.status == 200) {
       const data = response.response
       localStorage.setItem('guest-userdata', JSON.stringify(data))
       this.setState({loading: false, addressSaved: true, addNewClick: false})
      }
    })
  }

  placeorder = (addressType) => { 
    const { userdata, show, close } = this.props
    const address = new Promise((resolve) => {
      if(addressType === 'default') {
        const deliveryAddress = {
          address: userdata.address,
          zipcode: userdata.zipcode,
          city: userdata.city,
          state: userdata.state,
          country: userdata.counrty
        }
        resolve(deliveryAddress)
      } else {
        const deliveryAddress = {
          address: this.state.address,
          zipcode: this.state.zipcode,
          city: userdata.city,
          state: userdata.state,
          country: userdata.counrty
        }
        resolve(deliveryAddress)
      }
    })

    address.then(address => {
      this.setState({chosenAddress: address, payment: true})
    })

  }

  onToken = (token, secret) => {        
    const body = {
      currency: "aud",
      amount: (this.props.overallPrice * 100),
      source: token,
    };
    ApiService.chargeStripe(body)
    .then(res => res.json())
    .then((response) => {
      console.log('PAYMENT-LOG', response);
      const paymentObj = {
        chargeId: response.id, 
        amount: response.amount,
        status: response.status
      }
      this.props.placeOrder(this.state.chosenAddress, paymentObj)
    })
  }

  handleChange = (e) => {
    const value = e.target.value
    const name = e.target.name
    
    if(name == "deliverOption" && value == 'on') {
      this.setState({deliverOption: true, pickup: false})
    } else if(name == "pickup" && value == 'on') {
      this.setState({deliverOption: false, pickup: true})
    }
   
  }

  moveToNext = () => {
    const {deliverOption, pickup } = this.state
    if(deliverOption == true) {
      this.setState({step: 2})
    } else {
      this.setState({step: 4})
    }
  }


  render() {
    const { userdata, show, close } = this.props
    const {addNewClick, addressSaved, step} = this.state
    // console.log(userdata.address2);
    
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
             {step == 1 ? 'Payment' : 'Delivery address'}
          </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ width: '100%' }}>  
            {!this.state.payment && this.state.step == 2 ?
            <Row>
              
              <Loader loading={this.state.loading}/>
              <Col lg={6} md={6} sm={6} xs={12}>
                <div className="my-address">
                  {userdata.address} <br></br>
                  City : {userdata.city}  <br></br>
                  State : {userdata.state} <br></br>
                  PIN : {userdata.zipcode} <br></br>
                  <div onClick={() => this.placeorder('default')} className="deliver-btn">Deliver to this</div>
                </div>
              </Col>
              <Col lg={6} md={6} sm={6} xs={12}>

                {!addNewClick && !addressSaved && userdata.address2 == null ? <div onClick={() => this.setState({addNewClick: true})} className="add-address">Add new address</div> : ''}
                {addNewClick && !addressSaved ?
                  <div className="my-address">
                    Add new address
                    <div className="input-wrapper">
                      <label className="label-small">Flat No., Landmark</label>
                      <textarea onChange={(e) => this.changeFields(e)} value={this.state.address} name="address"></textarea>
                    </div>
                    <div className="input-wrapper">
                      <label className="label-small">Zipcode</label>
                      <input maxLength={6} onChange={(e) => this.changeFields(e)} value={this.state.zipcode} name="zipcode" type="text" />
                    </div>
                    <div className="input-wrapper">
                      <label className="label-small">City</label>
                      <input disabled="disabled" value={userdata.city} type="text" />
                    </div>
                    <div className="input-wrapper">
                      <label className="label-small">State</label>
                      <input disabled="disabled" value={userdata.state} type="text" />
                    </div>
                    <div className="input-wrapper">
                      <label className="label-small">Country</label>
                      <input disabled="disabled" value={userdata.country} type="text" />
                    </div>
                    <div onClick={this.saveAddress} className="deliver-btn">Save address</div>
                  </div> : ''}

                  {addressSaved && !addNewClick ? 
                    <div className="my-address">
                      <p onClick={this.editAddress} style={{color: 'blue'}}>Edit address</p>
                      {this.state.address} <br></br>
                      City : {userdata.city}  <br></br>
                      State : {userdata.state} <br></br>
                      PIN : {this.state.zipcode} <br></br>
                      <div onClick={() => this.placeorder('new')} className="deliver-btn">Deliver to this</div>
                    </div> : ''
                  }

                  { !addressSaved && !addNewClick && userdata.address2 != null ? 
                    <div className="my-address">
                      <p onClick={this.editAddress} style={{color: 'blue'}}>Edit address</p>
                      {userdata.address2.address} <br></br>
                      City : {userdata.city}  <br></br>
                      State : {userdata.state} <br></br>
                      PIN : {userdata.address2.zipcode} <br></br>

                      <div onClick={() => this.placeorder('new')} className="deliver-btn">Deliver to this</div>
                    </div> : ''
                  }
                
              </Col>
            </Row>       
              : 
              <div style={{textAlign: 'center'}}>
                 <PaymentModal show={this.state.payModal} onToken={(token) => this.onToken(token)} handleClose={() => this.setState({payModal: false})} />
                 <p>Total amount: <span style={{color: 'green', fontWeight: 'bold'}}>${this.props.overallPrice}</span> </p>
                 <button onClick={() => this.setState({payModal: true})} className="free-event-btn"> Make payment</button>
              </div>
            // <PaymentView price={this.props.overallPrice} onToken={this.onToken}/>
            }
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}
