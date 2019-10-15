import React, { Component } from 'react';
import Header from '../header'
import Navigation from '../navigation'
import ApiService from './../../../services/api'
import Loader from '../../components/simpleloader'
import Title_head from './../page_title_head'
// import Footer from './../footer'
import { Row, Col, Card, Button } from 'react-bootstrap';
import Notifications, { notify } from 'react-notify-toast';
import Price_card from './pricing_cards'
import Register_done from './Registration_complete'
import Plan_overview_modal from './plan_overview_modal'
import Payment from './payment_form.js'
import './member.css'
var scrollToElement = require('scroll-to-element');

let path = window.location.pathname
let storeName = path.split('/')[1];

export default class Became_member extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storeDetails: {},
      loading: true,
      state: {},
      cities: {},
      countries: {},
      statejsx: [],
      cityval: '',
      countryval: 'USA',
      stateval: 'Alaska',
      passwordErr: '',
      submitDisabled: true,
      step: 1,
      lastCreatedId: '',
      lastCreatedName: '',
      plan_overview: false,
      plan_details: "Free"
    };
  }

  componentDidMount() {
    this.setState({storeDetails: this.props.history.location.state })
  
    ApiService.getBusinessProfbyUrl(storeName)
    .then(res => res.json())
    .then(response => {
      if (response.status == 200) {
        this.setState({
          storeDetails: response.response,
          loading: false
        })
      } else {
        this.props.history.push('/')
      }
    })
    .catch(function (error) {
      console.log('err---------', error)
    })

    ApiService.get_countries_list()
    .then((res) => res.json()
    ).then((data) => {
      this.setState({countries: data.result})
    })

    //default country USA states 
    ApiService.get_states_by_country('US')
    .then((res) => res.json())
    .then((data) => this.setState({states: data.result}))
    .then(() => {
      this.renderStates()
    })

    //Defult state albama cities
    ApiService.get_cities_by_state('AL')
    .then((res) => res.json())
    .then((data) => this.setState({cities: data.result}))
  }

  countryChange = (e) => {
    let selected = e.target.options[e.target.selectedIndex].text;
    let cId = e.target.value > 0 ?
    parseInt(parseInt(e.target.value) + 1) :
    e.target.value
    
    ApiService.get_states_by_country(cId)
    .then((res) => res.json())
    .then((data) => this.setState({states: data.result}))
    //saving data to primary state

    this.setState({countryval: selected})
  }

  stateChange = (e) => {
    let selected = e.target.options[e.target.selectedIndex].text;
    
    this.setState({cityLoader: true})
    let stateId = `${e.target.value}`
    ApiService.get_cities_by_state(stateId)
    .then((res) => res.json())
    .then((data) => this.setState({cities: data.result, cityLoader: false})  )
  
    //saving data to primary state
   this.setState({stateval: selected})
  }


  change = (e) => {
    let name = e.target.name
    let val = e.target.value
    this.setState({[name]: val})
    if(name == "confirmpassword" || name == 'password') {
      if(val != this.state.password) {
        this.setState({passwordErr: 'Passwords does not match !', submitDisabled: true})
      } else {
        this.setState({passwordErr: '', submitDisabled: false})
      }
    }
  }



  handleSubmit = (e) => {
    this.setState({loading: true})
    e.preventDefault()
    let formdata = {
      businessid: this.state.storeDetails.businessid,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      mobile: this.state.mobile,
      dob: this.state.dob,
      address: this.state.address,
      city: this.state.cityval,
      state: this.state.stateval,
      country: this.state.countryval,
      zipcode: this.state.zipcode,
      password: this.state.password
    }
    ApiService.registerGuesUser(formdata)
    .then(res => res.json())
    .then((response) => {
       if(response.status == 200){
         this.setState({loading: false,
          lastCreatedId: response.response._id, 
          lastCreatedName: response.response.firstname,
          step: 2
        })
        scrollToElement('#priceCards');
       } else {
        this.setState({loading: false})
        notify.show('Something went wrong ! Please try again', 'error', 3000)
       }
    })
  }

  renderStates() {
    for(var key in this.state.states) {
      if (this.state.states.hasOwnProperty(key)) {
       if(this.state.statejsx.length < 51) {
          this.state.statejsx.push(
            {'id' : key.replace(/['"]+/g, ''), name: this.state.states[key]}
        );
       }
      }
    }
   return this.state.statejsx
  }

  chooseFree = () => {
    this.setState({plan_overview: true, plan_details: 'Free'}) 
  }

  chooseSilver = () => {
    console.log('silver');
    this.setState({plan_overview: true, plan_details: 'Silver'})    
  }

  chooseGold = () => {
    this.setState({plan_overview: true, plan_details: 'Gold'}) 
  }

  render() {
    
    const countriesList = Object.values(this.state.countries)
    const citiList = Object.values(this.state.cities)
    return (
      <div>
        {this.state.storeDetails != null &&
           <Header
           storebanner = {this.state.storeDetails.storebanner}
           rating = {4.7}
           votes = {75}
           businessname = {this.state.storeDetails.businessname}
           address = {this.state.storeDetails.address}
           phone = {this.state.storeDetails.phone}
           modalShow = {this.state.timeModal}
           timings = {this.state.storeDetails.timings}
           closedon = {this.state.storeDetails.closedon}
         />   
        }
       <Notifications />
       <Title_head title = "Membership" fa_icon_class ="fas fa-user-plus"/>
       <Loader loading={this.state.loading} background='no-fill' />
      <div className="container-fluid full">
        <Row>
          {/* <Col lg={4} md={4} sm={4} xs={12} className="became-member-left">
            {this.state.storeDetails != null &&
             <div className="bam-head"><i className="fas fa-hamburger"></i> {this.state.storeDetails.businessname}</div>
            }
            <div className="bam-card1 bam-cards">
              <Card>
                <Card.Header><i className="far fa-grin-alt"></i> User Benifits</Card.Header>
                <Card.Body>
                  <Card.Title> <i className="fas fa-user"></i> For free members</Card.Title>
                  <Card.Text>
                  It is a long established fact that a reader will be 
                  distracted by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less normal 
                  distribution of letters, as opposed to using 
                  'Content here, content here', making it look like readable English.
                  </Card.Text>

                  <Card.Title><i className="fas fa-user-secret"></i> For Paid members</Card.Title>
                  <Card.Text>
                  It is a long established fact that a reader will be 
                  distracted by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less normal 
                  distribution of letters, as opposed to using 
                  'Content here, content here', making it look like readable English.
                  </Card.Text>
                  
                </Card.Body>
              </Card>
              </div>
             
          </Col> */}
          <Col className="became-member-right">
           <div className="bam-right-head">
            <i className="fas fa-user-plus"></i> 
            {this.state.step == 1 ? ' Register as a member & Get Rewards' : ` Hi ${this.state.lastCreatedName}, Choose membership type`}
           </div>
           <div className="bam-form">
           {this.state.step == 1 &&
           <center>
            <Card className="bam-form-card">
             <Card.Header style={{textAlign: 'left'}}> <i class="fas fa-user-edit"></i> Fiil out this form</Card.Header>
              <Card.Body>
              <div className="registerForm" id="regForm">
                <form className="form" onSubmit={this.handleSubmit}>
                <Row>
                  <Col xs={12} lg={6} md={6} sm={6}>
                    <div className="inputOuter">
                    <p className="info-text left">* First name</p>
                      <input placeholder="First Name" type="text" name="firstname" onChange={(e) => this.change(e)} required/>
                    </div>
                  </Col>
                  <Col xs={12} lg={6} md={6} sm={6}>
                   <div className="inputOuter">
                   <p className="info-text left">* Last name</p>
                    <input placeholder="Last name" type="text" name="lastname" onChange={(e) => this.change(e)} required/>
                   </div>
                  </Col>
                </Row>
                
                <Row>
                  <Col xs={12} lg={6} md={6} sm={6}>
                    <div className="inputOuter">
                    <p className="info-text left">* Email</p>
                      <input placeholder="Email address" type="email" name="email" onChange={(e) => this.change(e)} required/>
                    </div>
                  </Col>
                  <Col xs={12} lg={6} md={6} sm={6}>
                   <div className="inputOuter">
                   <p className="info-text left">* Mobile</p>
                    <input placeholder="Mobile" minLength="10" type="text" name="mobile" onChange={(e) => this.change(e)} required/>
                   </div>
                  </Col>
                </Row>

                <Row>
                  <Col xs={12} lg={6} md={6} sm={6}>
                    <div className="inputOuter">
                    <p className="info-text left">* Password</p>
                      <input minLength="5" placeholder="Enter password" type="password" name="password" onChange={(e) => this.change(e)} required/>
                    </div>
                  </Col>
                  <Col xs={12} lg={6} md={6} sm={6}>
                    <div> 
                    <div className="inputOuter">
                      <p className="info-text left">* Confirm password</p>
                      <input minLength="5" placeholder="Confirm password" type="password" name="confirmpassword" onChange={(e) => this.change(e)} required/>
                    </div>
                    <p className="validation-err">{this.state.passwordErr}</p>
                    </div>
                  </Col>
                </Row>


                <Row>
                  <Col xs={12} lg={6} md={6} sm={6}>
                    <div className="inputOuter">
                      <p className="info-text left">* Date of birth</p>
                      <input placeholder="Date of birth" type="date" name="dob" onChange={(e) => this.change(e)} required />
                    </div>
                  </Col>
                  <Col xs={12} lg={6} md={6} sm={6}>
                    <div className="inputOuter" id="textarea">
                    <p className="info-text left">* Address</p>
                      <textarea placeholder="Address" type="text" name="address" onChange={(e) => this.change(e)} required></textarea>
                    </div>
                  </Col>
                </Row>

                <Row>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                  
                    <div className="inputOuter">
                    <p className="info-text left">* City</p>
                    <select name="cityval" onChange={this.change} required>
                        <option disabled="disabled" selected="selected">
                        {this.state.cityLoader ? 'Loading....' : 'Choose city'}</option>
                        { !this.state.cityLoader ?
                          citiList.map((value, i) => 
                          <option key={i} value={value}>{value}</option> ) :
                          <option>Loading...</option>  
                          }
                      </select>
                    </div>
                  </div>
                  
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                    <div className="inputOuter">
                    <p className="info-text left">* State</p>
                      <select name="state" defaultValue={3919} onChange={(e) => this.stateChange(e)}>
                        <option disabled="disabled">Choose state</option>
                        {this.renderStates().map((val, i) => 
                          <option key={i} value={val.id} >{val.name}</option>
                        )}
                      </select>
                    </div>
                  </div>
                  </Row>


                  <Row>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                    <div className="inputOuter">
                    <p className="info-text left">* Zipcode</p>
                      <input placeholder="Zipcode" type="text" maxLength="6" name="zipcode" onChange={(e) => this.change(e)} required/>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                  <div className="inputOuter">
                   <p className="info-text left">* Country</p>
                      <select name="country" value={230} onChange={(e) => this.countryChange(e)}>
                      <option disabled="disabled" selected="selected">Choose country</option>
                        { countriesList.map((value, i) =>
                          value == 'United States' ?
                          <option key={i} value={value}>{value}</option> :
                          ''
                        )
                        }
                      </select>
                    </div>
                  </div>
                  </Row>
                <button className="bam-button button" disabled={this.state.submitDisabled}>Register</button>
                </form>
              </div>
              </Card.Body>
            </Card>
           </center> }
            {this.state.step == 2 &&
             <div id="priceCards" className="animated slideInRight">
             <Row className="flex-column-reverse flex-lg-row flex-md-row flex-sm-row">
               <Col xs={12} lg={4} md={4} sm={4} className="order-xs-3">
                  <Price_card 
                    membership = "Gold"
                    userid = {this.state.lastCreatedId}
                    moveToDone = {() => this.setState({step: 3})}
                    serviceProps = {this.state.storeDetails}
                  />
               </Col>
               <Col xs={12} lg={4} md={4} sm={4} className="order-xs-2">
                 {this.state.storeDetails && <Price_card 
                    membership = "Silver"
                    userid = {this.state.lastCreatedId}
                    moveToDone = {() => this.setState({step: 3})}
                    serviceProps = {this.state.storeDetails}
                  />
                 }
               </Col>
               <Col xs={12} lg={4} md={4} sm={4} className="order-xs-1">
                  <Price_card 
                    membership = "Free"
                    userid = {this.state.lastCreatedId}
                    moveToDone = {() => this.setState({step: 3})}
                    serviceProps = {this.state.storeDetails}
                  />
               </Col>
             </Row>
             
              </div>

            }
            {this.state.step === 3 &&
              <Register_done />
            }
           </div>
          </Col>
        </Row>
      </div>

      {/* <Footer /> */}
        
       <Navigation 
        nav = {this.props.history}
        store= {storeName}
        storeData = {this.state.storeDetails}
      />
      </div>
    );
  }
}
