import React, { Component } from 'react';
import Loader from './../components/simpleloader'
import Page_head from './../components/page_head';
import { Row, Col } from 'react-bootstrap'
import './styles.css'
import ApiService from '../../services/api';
import BankInfoModal from './bankDetails'
var ip = require('ip');

const userId = JSON.parse(localStorage.getItem('userdata')).data._id

export default class Payments extends Component {

  state = {
    loading: false,
    apikey: '',
    done: false,
    email: '',
    fullname: '',
    phone: '',
    isOpen: false,
    businessUrl: '',
    city: '',
    userid: '',
    token: '',

    error: null,
    success: null
  }

  componentDidMount() {
    const userData = userId ? JSON.parse(localStorage.getItem('userdata')) : []
    console.log("userData", userData);
    this.setState({
      email: userData.data.email,
      fullname: userData.data.fullName,
      phone: userData.data.phone,
      address: userData.data.address,
      businessUrl: userData.data.url,
      city: userData.data.city,
      zipcode: userData.data.zipcode,
      state: userData.data.state,
      userid: userId,
      token: userId.token,
      accountId: userData.data.payment.stripe_account ? userData.data.payment.stripe_account.id : ''
    })

  }
  // formSubmit = (e) => {
  //   e.preventDefault()
  //   console.log("Helo");
  //   if(userId) {
  //     this.setState({loading: true})
  //     const key = this.state.apikey
  //     ApiService.save_apikey(userId, key)
  //     .then(res => {
  //       if(res.status == 200) {
  //         this.setState({loading: false, done: true, apikey: ''})
  //         setTimeout(() => {
  //           this.setState({done: false})
  //         }, 5000)
  //       }
  //     })
  //   }    
  // }

  // changeApi = (e) => {
  //   const value = e.target.value
  //   this.setState({apikey: value})
  // }

  openBankModal = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  createStripe = (route, account, ssn) => {
    this.setState({ loading: true })
    const data = {
      type: 'custom',
      country: 'US',
      email: this.state.email,
      business_type: 'individual',
      individual: {
        email: this.state.email,
        first_name: this.state.fullname,
        phone: `+1${this.state.phone}`,
        dob: {
          day: '20',
          month: '06',
          year: '1994'
        },
        last_name: this.state.fullname,
        address: {
          line1: this.state.address,
          city: this.state.city,
          postal_code: this.state.zipcode,
          state: this.state.state
        },
        ssn_last_4: ssn
      },
      business_profile: {
        url: `https://doublesat.com/${this.state.businessUrl}`,
        //industry: 'food_and_drink__restaurants'
      },
      tos_acceptance: {
        date: parseInt(new Date().getTime() / 1000),
        ip: ip.address()
      },
      external_account: {
        object: 'bank_account',
        country: 'US',
        currency: 'USD',
        account_holder_name: this.state.fullname,
        account_holder_type: 'individual',
        routing_number: route,
        account_number: account,
        account_holder_name: this.state.fullname,
        industry: 'food_and_drink__restaurants',
      },
      requested_capabilities: ['card_payments', 'transfers']
    }

    ApiService.create_connect(data)
      .then(res => {
        if (res.error) {
          this.setState({ loading: false, error: res.error.message, success: null })
        } else {
          this.setState({ accountId: res.id })
          ApiService.add_stripe_account(this.state.userid, res)
            .then(res2 => {
              if (res2.status == 200) {
                const data = {
                  data: res2.response,
                  token: this.state.token
                }
                localStorage.setItem('userdata', JSON.stringify(data))
              }
            })
          this.setState({ loading: false, success: 'Stripe connected account created successfully.', error: null })
        }
      })
  }

  closeModal = () => {
    this.setState({ isOpen: false })
  }

  generateLink = () => {
    const {accountId} = this.state
    const amount = 100
    const details = "a test transfer"
    ApiService.transfer_money_to_business(accountId, amount, details)
    .then(res => {
      console.log("LINK", res);
      
    })
  }

  render() {
    const { done, isOpen, loading, error, success, accountId } = this.state
    return (
      <div className="content-container">
        <Page_head title="Payments" icon="fas fa-clipboard" />
        <Loader loading={loading} fill="no-fill" />
        <BankInfoModal
          isOpen={isOpen}
          close={this.closeModal}
          createStripe={(route, account, ssn) => this.createStripe(route, account, ssn)}
          error={error}
          success={success}
        />
        <div className="container-inside">
          <Row>
            <Col>
              <p style={{ textAlign: 'left' }}>
                For recieving payment seller/business must have a stripe account
                we will create a connected stripe account and you need to add your bank account
                to recieve payments.
             </p>
            </Col>
          </Row>

          {accountId == "" ?
            <center>
              <div className="step-1">
                <span>Create a connected stripe account</span><br></br>
                <button className="stripe-create" onClick={this.openBankModal}>Create stripe connect</button>
              </div>
            </center> :
            <div>
              <p>
                Stripe account created <br></br>
                ID - <span className="account-id">{accountId}</span>
              </p>

              {/* <button onClick={this.generateLink} className="generate-link">Generate login link</button> */}
            </div>
          }
          {/* <Row>
           <Col>
            <div className="key-form">
              <form onSubmit={this.formSubmit}>
               <label className="key-label">API key</label><br></br>
               <input className="key-input" onChange={this.changeApi} type="text" name="key" placeholder="Stripe API key" required/>
               <input className="key-input-btn" type="submit" value="Add"/>
              </form>
              {done && <p className="key-done">API key updated successfully !</p>}
            </div>
           </Col>
         </Row> */}
        </div>
      </div>
    );
  }
}
