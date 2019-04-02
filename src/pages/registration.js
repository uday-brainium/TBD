import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Nav
} from 'reactstrap';
import { Link, withRouter, Redirect, NavLink as RRNavLink } from 'react-router-dom'
import Notifications, { notify } from 'react-notify-toast';
import ApiService from '../services/api'
import Minheader from './views/minheader'
import Footer from './views/footer'
import logo from '../images/logo.png'
import Step1 from './components/registration_step_1'
import Step2 from './components/registration_step_2'
import Step3 from './components/registration_step_3'
import Step4 from './components/registration_step_4'
import '../styles/style_sheet.css'
import LoadingOverlay from 'react-loading-overlay';
import moment from 'moment';

const md5 = require('md5');
const format = 'h:mm a';
const accessToken = localStorage.getItem('access-token-tbd')


class RegistrationPage extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      submitDisabled: true,
      formDisabled: false,
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      businessname: '',
      terms: false,
      bannerImage: '',
      offerImage: '',
      urlextension: '',
      mondayColse: moment('10:00 PM', 'HH:mm a'),
      mondayOpen: moment('08:00 PM', 'HH:mm a'),
      tuesdayClose: moment('08:00 PM', 'HH:mm a'),
      tuesdayOpen: moment('10:00 PM', 'HH:mm a'),
      wednesdayClose: moment('08:00 PM', 'HH:mm a'),
      wednesdayOpen: moment('10:00 PM', 'HH:mm a'),
      thursdayClose: moment('08:00 PM', 'HH:mm a'),
      thursdayOpen: moment('10:00 PM', 'HH:mm a'),
      fridayClose: moment('08:00 PM', 'HH:mm a'),
      fridayOpen: moment('10:00 PM', 'HH:mm a'),
      saturdayClose: moment('08:00 PM', 'HH:mm a'),
      saturdayOpen: moment('10:00 PM', 'HH:mm a'),
      sundayClose: moment('08:00 PM', 'HH:mm a'),
      sundayOpen: moment('10:00 PM', 'HH:mm a'),

      free_member_points: 'none',
      free_member_instant_promotion: 'no',
      free_member_birthday_promotion: 'yes',
      free_member_discount: '0',
      free_member_free_events: 'no',
      free_member_reservation: 'no',

      silver_member_points: 'double',
      silver_member_instant_promotion: 'yes',
      silver_member_birthday_promotion: 'yes',
      silver_member_discount: '3',
      silver_member_free_events: 'yes',
      silver_member_reservation: 'yes',
      silver_price: '10',

      gold_member_points: 'triple',
      gold_member_instant_promotion: 'yes',
      gold_member_birthday_promotion: 'yes',
      gold_member_discount: '5',
      gold_member_free_events: 'yes',
      gold_member_reservation: 'yes',

      closedon: '',
      businesscontact: '',
      businessaddress: '',
      state: '1',
      city: '',
      country: 'United States',
      zipcode: '',
      currency: '',
      pointsonsocialpost: '',
      loyalitycardprice: '10',
      minloyalitypoints: '',
      foodpickup: false,
      reservation: false,
      pointsperreservation: '',
      eventbooking: false,
      eventbookingpoints: '',
      emailnotification: false,
      appnotification: false,
      pointsonusersignup: '',
      offerdetails: '',

      currentStep: 1,
      movedfromstep: 1,
      loading: false,
      emailExist: Boolean
    }
  }

  componentDidMount() {
    if (accessToken !== null) {
      this.props.history.push('/dashboard')
    }
  }

  handleChange(e) {
    console.log(this.state.loyalitycardprice);
    
    this.setState({ [e.target.name]: e.target.value })

    if (e.target.name === 'terms') {
      this.setState({
        terms: e.target.checked
      })
    }
    if (e.target.name === 'state') {
      this.setState({
        state: e.target.value
      })
    }
   if (e.target.name === 'city') {
       this.setState({
        city: e.target.value
      })
    }

    if (e.target.name === 'foodpickup') {
      this.setState({
        foodpickup: e.target.checked
      })
    }

    if (e.target.name === 'reservation') {
      this.setState({
        reservation: e.target.checked
      })
    }
    if (e.target.name === 'eventbooking') {
      this.setState({
        eventbooking: e.target.checked
      })
    }
    if (e.target.name === 'emailsubscription') {
      this.setState({
        emailnotification: e.target.checked
      })
    }
    if (e.target.name === 'appnotification') {
      this.setState({
        appnotification: e.target.checked
      })
    }

    if (!this.checkEmptyFields()) {
      this.setState({
        submitDisabled: false
      })
    }
  }

  imageBase64 = (base64) => {
    //console.log("image-BASE", base64);
    this.setState({bannerImage: base64})
  }

  imageBase64Offer = (base64) => {
    this.setState({offerImage: base64})
  }

  saveOCtimes = (value, day) => {
    //let val = value.format(format)
    this.setState({[day]: value})
  }

  checkEmail = () => {
  let a = ''
     ApiService.chechEmailExist(this.state.email)
    .then(res => res.json())
    .then((response) => {
      if(response.status == 400){
        //this.setState({emailExist: true})
        a = 'true'
      } else {
       // this.setState({emailExist: false})
         a = 'false'
      }
    })
   return a
  }

  validateForStep1= () => {
    ApiService.chechEmailExist(this.state.email)
    .then(res => res.json())
    .then((response) => {
      if(response.status == '400'){
        notify.show('Email already exist', 'error', 3000);
      } else {
        if (!(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(this.state.email)) {
          notify.show('Invalid Email Address', 'error', 5000);
          this.setState({submitDisabled: true})
        }
        else if (this.state.password.length < 5) {
          notify.show('Password must be atleast 6 characters', 'error', 5000);
          this.setState({submitDisabled: true})
        }
        else if (this.state.password !== this.state.confirmPassword) {
          notify.show('Passwords do not match', 'error', 5000);
          this.setState({submitDisabled: true})
        }
        else if (this.state.terms === false) {
          notify.show('You must agree to our terms and conditions', 'error', 5000)
          this.setState({submitDisabled: true})
        } else if(this.checkEmptyFields()) {
          notify.show('All fields are required', 'error', 3000);
          this.setState({loading: false})
        } else {
          this.setState({submitDisabled: false, currentStep: 2})
        }
      }
    })
  }

  validateForStep2 = () => {
    let format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if(this.checkEmptyFields()) {
      notify.show('All fields are required', 'error', 3000);
    } else if(this.state.urlextension.indexOf(' ') >= 0 || format.test(this.state.urlextension)) {
      notify.show('URL extension should not contain space or spacial character', 'error', 3000);
    } else {
      this.setState({submitDisabled: false, currentStep: 3})
    }
  }

  validateForStep3 = () => {
    if(this.state.reservation && this.state.pointsperreservation == '') {
      notify.show('Please enter points value per reservation', 'error', 3000);
    } else if(this.state.eventbooking && this.state.eventbookingpoints == '') {
      notify.show('Please enter points value per event booking', 'error', 3000);
    } else if(!this.state.eventbooking && !this.state.reservation && !this.state.foodpickup){
      notify.show('Please choose at least one service', 'error', 3000);
    } else if(this.checkEmptyFields()) {
      notify.show('Please enter field values', 'error', 3000);
    } else {
      this.setState({submitDisabled: false, currentStep: 4})
    }
    
  }
  validateForStep4 = () => {
    this.setState({submitDisabled: false})
    this.saveUserData()

  }
  

  handleSubmit(event) {
    event.preventDefault()
    if(this.state.currentStep == 1) {
      this.validateForStep1()
    } else if(this.state.currentStep == 2) {
      this.validateForStep2()
    } else if(this.state.currentStep == 3) {
      this.validateForStep3()
    } else if (this.state.currentStep == 4) {
      this.validateForStep4()
    }
}
  
  saveUserData = () => {
    let fullName = this.state.firstname + ' ' + this.state.lastname
          const formData = {
             fullName : fullName,
             password : md5(this.state.password),
             email: this.state.email,
             bannerImage: this.state.bannerImage,
             offerImage: this.state.offerImage,
             url: this.state.urlextension,
             businessname: this.state.businessname,
             openingtime: this.state.openingtime,
             closingtime: this.state.closingtime,
             phone: this.state.businesscontact,
             address: this.state.businessaddress,
             city: this.state.city,
             country: this.state.country,
             state: this.state.state,
             zipcode: this.state.zipcode,
             fbsharepoints: this.state.pointsonsocialpost,
             loyalitycardprice: this.state.loyalitycardprice,
             minloyalitypoints: this.state.minloyalitypoints,
             foodpickupservice: this.state.foodpickup,
             tablereservationservice: this.state.reservation,
             eventbooking: this.state.eventbooking,
             emailnotification: this.state.emailnotification,
             appnotification: this.state.appnotification,
             pointsperreservation: this.state.pointsperreservation,
             eventbookingpoints: this.state.eventbookingpoints,
             pointsonusersignup: this.state.pointsonusersignup,
             offerdetails: this.state.offerdetails,
             closedon: this.state.closedon,
             octimes: {
              mondayOpen: this.state.mondayOpen,
              mondayClose: this.state.mondayClose,
              tuesdayClose: this.state.tuesdayClose,
              tuesdayOpen: this.state.tuesdayOpen,
              wednesdayClose: this.state.wednesdayClose,
              wednesdayOpen: this.state.wednesdayOpen,
              thursdayClose: this.state.thursdayClose,
              thursdayOpen: this.state.thursdayOpen,
              fridayClose: this.state.fridayClose,
              fridayOpen: this.state.fridayOpen,
              saturdayClose: this.state.saturdayClose,
              saturdayOpen: this.state.saturdayOpen,
              sundayClose: this.state.sundayClose,
              sundayOpen: this.state.sundayOpen
              },
             memberservices: {
               freemember: {
                  points: this.state.free_member_points,
                  instant_promotion: this.state.free_member_instant_promotion,
                  birthday_promotion: this.state.free_member_birthday_promotion,
                  discount: this.state.free_member_discount,
                  free_events: this.state.free_member_free_events,
                  reservation: this.state.free_member_reservation,
               },
               silvermember: {
                  points: this.state.silver_member_points,
                  instant_promotion: this.state.silver_member_instant_promotion,
                  birthday_promotion: this.state.silver_member_birthday_promotion,
                  discount: this.state.silver_member_discount,
                  free_events: this.state.silver_member_free_events,
                  reservation: this.state.silver_member_reservation,
                  silver_price: this.state.loyalitycardprice
               },
               goldmember: {
                  points: this.state.gold_member_points,
                  instant_promotion: this.state.gold_member_instant_promotion,
                  birthday_promotion: this.state.gold_member_birthday_promotion,
                  discount: this.state.gold_member_discount,
                  free_events: this.state.gold_member_free_events,
                  reservation: this.state.gold_member_reservation,
                  gold_price: (this.state.loyalitycardprice * 2)
               }
             }
          }
          try {
            this.setState({loading: true})
            ApiService.registration(formData)
              .then(res => res.json())
              .then(response => {
                if (response.success) {
                  notify.show('Registration Successful. Please check your mail', 'success', 3000)
                  this.setState({
                    formDisabled: true,
                    loading: false
                  })
                  setTimeout(() => {
                    this.props.history.push('/login')
                  }, 2500)
                }
                else {
                  notify.show(response.message, 'error', 5000)
                }
              })
              .catch(function (error) {
                console.log(error)
              })
          }
          catch (error) {
            console.log(error)
          }
  }

  checkEmptyFields() {
  
    if(this.state.currentStep === 1) {
      var registerFields = [
        'firstname', 'lastname', 'email', 'password', 'confirmPassword',
      ]
      var emptyFields = false
      for (let registerField of registerFields) {
        if (this.state[registerField] === '') {
          // console.log(registerField+ ' is empty')
          emptyFields = true
        }
      }
      return emptyFields
    }

    if(this.state.currentStep === 2) {
      var registerFields = [
        'urlextension', 'businessname', 'businesscontact',
        'businessaddress', 'state', 'zipcode'
      ]
      var emptyFields = false
      for (let registerField of registerFields) {
        if (this.state[registerField] === '') {
          // console.log(registerField+ ' is empty')
          emptyFields = true
        }
      }
      return emptyFields
    }

    if(this.state.currentStep === 3) {
      var emptyFields = false
        if (this.state.foodpickup === '' && this.state.reservation == '' && this.state.eventbooking == '' ) {
          emptyFields = true
        }

        if(this.state.pointsonsocialpost == '' ||
        this.state.loyalitycardprice == '' || this.state.minloyalitypoints == '' ) {
          emptyFields = true
        }
      
      return emptyFields
    }
    
  }

  clickOnSteps = (step)  => {
    if(step < this.state.currentStep) {
      this.setState({currentStep: parseInt(step)})
    }
  }

  render() {
   
    return (
      <LoadingOverlay
        active={this.state.loading}
        spinner
        text='Please wait...'
       >
      <div onClick={this.hideMenu}>
        <Minheader />
        <section className="registrationSection">
          <div className="registrationWrapperOuter">
            <header>Create your TBD account</header>

            <div className="registrationWrapper">
            
              <div className="registerForm">
                <form className="form" onSubmit={this.handleSubmit}>
                  <fieldset disabled={this.state.formDisabled}>
                   
                  {/* Step 1 form */}
                  <div id="step1" className={this.state.currentStep == 1 ? '' : 'hiden-form'}>
                    <Step1 change={(e) => this.handleChange(e)} stopLoader = {() => this.setState({loading: false})}/>
                  </div>

                  <div id="step2" className={this.state.currentStep == 2 ? '' : 'hiden-form'}>
                    <Step2 
                     change={(e) => this.handleChange(e)}
                     setBannerBase64 = {(base64) => this.imageBase64(base64)}
                     saveOCtimes = {(value, day) => this.saveOCtimes(value, day)}
                     />
                  </div>

                  <div id="step3" className={this.state.currentStep == 3 ? '' : 'hiden-form'}>
                    <Step3
                     foodpickup = {this.state.foodpickup} 
                     reservation = {this.state.reservation}
                     eventbooking = {this.state.eventbooking}
                     change={(e) => this.handleChange(e)}
                     />
                  </div>

                  <div id="step4" className={this.state.currentStep == 4 ? '' : 'hiden-form'}>
                    <Step4
                     emailnotification = {this.state.emailnotification} 
                     appnotification = {this.state.appnotification}
                     change={(e) => this.handleChange(e)}
                     setOfferBase64 = {(base64) => this.imageBase64Offer(base64)}
                     />
                  </div>

                    {/* <button className="button">Register</button> */}
                    <button className="button" disabled={this.state.submitDisabled}>
                      {this.state.currentStep != 4 ? "Proceed next" : 'Submit & Register'}
                    </button>
                  </fieldset>
                </form>
              </div>

              <div className="stepsWrapper">
                <div className="steps">
                  <ul className="reg-info-link">
                    <li className={this.state.currentStep === 1 ? 'step active-step animated headShake': 'step'} onClick={() => this.clickOnSteps('1')}>
                      <div className="link1">
                        <span>Step 1:</span>
                      </div>
                      <div className="step-details">
                        Register and create your account
                      </div>
                    </li>
                    <li className={this.state.currentStep === 2 ? 'step active-step animated headShake': 'step'} onClick={() => this.clickOnSteps('2')}>
                      <div className="link2">
                        <span>Step 2:</span>
                      </div>
                      <div>
                        All your business information
                      </div>
                    </li>
                    <li className={this.state.currentStep === 3 ? 'step active-step animated headShake': 'step'} onClick={() => this.clickOnSteps('3')}>
                      <div className="link3">
                        <span>Step 3:</span>
                      </div>
                      <div>
                        Add offers & service to your resturent
                      </div>
                    </li>
                    <li className={this.state.currentStep === 4 ? 'step active-step animated headShake': 'step'} onClick={() => this.clickOnSteps('4')}>
                      <div className="link4">
                        <span>Step 4:</span>
                      </div>
                      <div>
                        Start Promotion and earn loyalty points
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
      </LoadingOverlay>
    )
  }
}

export default RegistrationPage
