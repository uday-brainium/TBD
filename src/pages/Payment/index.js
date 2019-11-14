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
    success: null,

    create_isOpen: false,
    create_error: '',
    create_success: '',

    default_account_bank: '',
    default_account_number: ''
  }

  componentDidMount() {
    const userData = userId ? JSON.parse(localStorage.getItem('userdata')) : []
    // console.log("userData", userData);
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
      accountId: userData.data.payment.stripe_account ? userData.data.payment.stripe_account.id : '',
    })
    this.getkeys()
    this.get_active_account(userData)
  }

  getkeys = async () => {
    const sKey = localStorage.getItem('stripe_secret_key')
    if (sKey == null) {
      ApiService.get_keys()
        .then(res => {
          if (res.status == 200) {
            const secret = res.response.selectedKey.secret
            localStorage.setItem('stripe_secret_key', JSON.stringify(secret))
            window.location.reload()
          }
        })
    }
  }

  get_active_account = (userData) => {
    if (userData.data.payment.stripe_account) {
      const external_account = userData.data.payment.stripe_account.external_accounts
      external_account.data.map(account => {
        if (account.default_for_currency == "true") {
          this.setState({
            default_account_bank: account.bank_name,
            default_account_number: account.last4
          })
        }
      })
    }
  }


  openBankModal = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  createStripe = (route, account, ssn) => {
    this.setState({ loading: true })
    const data = {
      type: 'custom',
      country: 'US',
      email: this.state.email,
      // business_type: 'company',
      // individual: {
      //   email: this.state.email,
      //   first_name: this.state.fullname,
      //   phone: `+1${this.state.phone}`,
      //   dob: {
      //     day: '20',
      //     month: '06',
      //     year: '1994'
      //   },
      //   last_name: this.state.fullname,
      //   address: {
      //     line1: this.state.address,
      //     city: this.state.city,
      //     postal_code: this.state.zipcode,
      //     state: this.state.state
      //   },
      //   ssn_last_4: ssn
      // },
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
                setTimeout(() => {
                  window.location.reload()
                }, 1000)
              }
            })
          this.setState({ loading: false, success: 'Stripe connected account created successfully.', error: null })
        }
      })
  }

  closeModal = () => {
    this.setState({ isOpen: false })
  }
  create_closeModal = () => {
    this.setState({ create_isOpen: false })
  }

  generateLink = () => {
    const { accountId } = this.state
    const amount = 100
    const details = "a test transfer"
    ApiService.transfer_money_to_business(accountId, amount, details)
      .then(res => {
        console.log("LINK", res);

      })
  }

  set_secret_key = async () => {
    await ApiService.get_keys()
      .then(res => {
        if (res.status == 200) {
          const secret = res.response.selectedKey.secret
          localStorage.setItem('stripe_secret_key', JSON.stringify(secret))
        }
      })
  }

  update_bank = async (route, account, ssn) => {
    this.setState({ loading: true })
    const { accountId, fullname, userid, token } = this.state
    await this.set_secret_key()
    const data = {
      external_account: {
        object: 'bank_account',
        country: 'US',
        currency: 'USD',
        account_holder_name: fullname,
        account_holder_type: 'individual',
        routing_number: route,
        account_number: account,
        default_for_currency: true
      }
    }
    ApiService.update_connect(accountId, data)
      .then(res => {
        if (res.error) {
          this.setState({ error: res.error.message, success: '', loading: false })
        } else {
          ApiService.fetch_connect(accountId)
            .then(res2 => {
              if (!res2.error) {
                ApiService.add_stripe_account(userid, res2)
                  .then(res3 => {
                    if (res3.status == 200) {
                      const data = {
                        data: res3.response,
                        token: token
                      }
                      localStorage.setItem('userdata', JSON.stringify(data))
                    }
                  })
              }
            })

          this.setState({ success: "Bank account upadated successfully !", error: '' })
          setTimeout(() => {
            this.setState({ create_isOpen: false })
            window.location.reload()
          }, 2000)
        }
      })
  }

  updateBank = () => {
    this.setState({ create_isOpen: true })
  }

  render() {
    const { done, isOpen, loading, error, success, accountId, create_isOpen, create_error, create_success } = this.state
    return (
      <div className="content-container">
        <Page_head title="Payments" icon="fas fa-clipboard" />
        <Loader loading={loading} fill="no-fill" />
        <BankInfoModal
          update={false}
          isOpen={isOpen}
          close={this.closeModal}
          createStripe={(route, account, ssn) => this.createStripe(route, account, ssn)}
          error={error}
          success={success}
        />

        <BankInfoModal
          update={true}
          isOpen={create_isOpen}
          close={this.create_closeModal}
          createStripe={(route, account, ssn) => this.update_bank(route, account, ssn)}
          error={error}
          success={success}
        />
        <div className="container-inside">
          <Row>
            <Col>
              <p style={{ textAlign: 'left' }}>
                For receiving payment seller/business must have a connected Stripe Account.
                To create a Stripe Account add your banking details to receive payments.
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

              <div>
                <button className="stripe-create" onClick={this.updateBank}>Update bank account</button>
              </div>

              <p style={{ marginTop: 10, fontSize: 14 }}>** For more information contact with superadmin with this account ID</p>

              <hr></hr>
              {/* BANK ACCOUNT DETAILS */}
              <div className="active_bank">
                <p><b>Active BANK ACCOUNT</b></p>
                <span><b>BANK</b> - </span> {this.state.default_account_bank} <br></br>
                <span><b>ACCOUNT NUMBER</b> - </span> ********{this.state.default_account_number}
              </div>
              <hr></hr>
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
