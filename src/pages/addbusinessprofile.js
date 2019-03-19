import React, { Component } from "react";
//let in_array = require('in_array');
import ReactDOM from 'react-dom';
import Weekly_time_picker from './components/weekly-time-picker'
import { Route, Link, Redirect, withRouter } from "react-router-dom"
import { fetchUserData } from '../actions/user_action'
import {connect} from 'react-redux'
import './../styles/style_sheet.css'
import moment from 'moment';

import Notifications, { notify } from 'react-notify-toast';
import Loader from './components/simpleloader'
import ApiService from '../services/api'

const token = localStorage.getItem('access-token-tbd');
const userid = localStorage.getItem('user-id');

const format = 'h:mm a';
// business profile set
const BusinessProfileSet = localStorage.getItem('business-profile-id')

class AddBusinessProfilePage extends React.Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    // select releted
    this.optionChanged = this.optionChanged.bind(this)
    this.displaySelectOptions = this.displaySelectOptions.bind(this)
    this.hideSelectOptions = this.hideSelectOptions.bind(this)
    this.optionSelected = this.optionSelected.bind(this)

    this.state = {
      // form
      submitDisabled: true,
      formDisabled: false,
      // form fields
      businessname: '',
      address: '',
      phone_number: '',
      url: '',
      categories: '',
      timings: {},
      timeObj : [],
      closedon: '',
      state: '',
      city: '',
      country: '',
      mondayOpen : '',
      mondayClose : '',
      tuesdayOpen : '',
      tuesdayClose : '',
      wednesdayOpen : '',
      wednesdayClose : '',
      thursdayOpen : '',
      thursdayClose : '',
      fridayOpen : '',
      fridayClose : '',
      saturdayOpen : '',
      saturdayClose : '',
      sundayOpen : '',
      sundayClose : '',
      // option
      option: '',
      optionsShowing: false,
      styledSelectClass: 'styledSelect',
      optionTextStyle: {
        'color': '#9fa5a5'
      },
      optionsDisplayedStyle: {
        'display': 'none'
      },
      // page title
      pageTitle: '',
      getmenudata: [],
      menuids: [],
      databaseRetrievedMenuTitles: [],
      index1: 0,
      len: 0,
      i: 0,
      loading: false,
      countries: {},
      cities: {},
      statejsx: [],
    }
  }

  componentDidMount() {

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
   
    this.setState({ loading: true })
    let userId = localStorage.getItem('user-id')
    let token = localStorage.getItem('access-token-tbd')

    ApiService.fetchmenuData(userId)
      .then(res => res.json())
      .then(response => {
        if (response.success) {
          console.log("76", typeof this.state.getmenudata)
          this.state.getmenudata = response.menu
          console.log(this.state.getmenudata);
        }
        else {
          notify.show(response.message, 'error', 5000);
        }
      })
      .catch(function (error) {
        console.log(error)
      })

    ApiService.profileData(token, userId)
      .then(res => res.json())
      .then(response => {
        this.setState({ loading: false })
        if (response.success) {
          this.setState({
            businessname: response.data.businessname,
            businessemail: response.data.businessemail,
            address: response.data.address,
            phone_number: response.data.phone,
            url: response.data.url,
            menu: response.data.menu,
            closedon: response.data.closedon,
            city: response.data.city,
            state: response.data.state,
            country: response.data.country,
            zipcode: response.data.zipcode,
            
            mondayOpen : response.data.octimes.mondayOpen,
            mondayClose : response.data.octimes.mondayClose,
            tuesdayOpen : response.data.octimes.tuesdayOpen,
            tuesdayClose : response.data.octimes.tuesdayOpen,
            wednesdayOpen : response.data.octimes.wednesdayOpen,
            wednesdayClose : response.data.octimes.wednesdayClose,
            thursdayOpen : response.data.octimes.thursdayOpen,
            thursdayClose : response.data.octimes.thursdayClose,
            fridayOpen : response.data.octimes.fridayOpen,
            fridayClose : response.data.octimes.fridayClose,
            saturdayOpen : response.data.octimes.saturdayOpen,
            saturdayClose : response.data.octimes.saturdayClose,
            sundayOpen : response.data.octimes.sundayOpen,
            sundayClose : response.data.octimes.sundayClose,
            
            //timings: (response.data.octimes)
          }, () => {
            console.log('data', this.state.state.substring(0, 2).toUpperCase());
                //Defult state albama cities
            ApiService.get_cities_by_state(this.state.state)
            .then((res) => res.json())
            .then((data) => this.setState({cities: data.result}))
            //this.setState({timeObj: response.data.octimes})
            let timedata = response.data.octimes
            this.setState({timeObj: timedata})
            
          })

        }
        // hide spinner
        this.setState({
          spinnerShowing: false
        })
      })
      .catch(function (error) {
        console.log(error)
      })



    if (this.state.url !== null) {
      // make api call and get the data
      this.setState({
        'pageTitle': 'Edit Business Profile'
      })
    }
    else {
      this.setState({
        'pageTitle': 'Add Business Profile'
      })
    }
  }

  countryChange = (e) => {
    let cId = e.target.value > 0 ?
    parseInt(parseInt(e.target.value) + 1) :
    e.target.value
    
    ApiService.get_states_by_country(cId)
    .then((res) => res.json())
    .then((data) => this.setState({states: data.result}))
    //saving data to primary state
    this.setState({counry: e.target.value})
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

  stateChange = (e) => {
    let selected = e.target.options[e.target.selectedIndex].text;
    let value = e.target.value
    this.setState({cityLoader: true})
    let stateId = `${e.target.value}`
    ApiService.get_cities_by_state(stateId)
    .then((res) => res.json())
    .then((data) => this.setState({cities: data.result, cityLoader: false})  )
   
    //saving data to primary state
    this.setState({state: value})
  }


  handleChange(e) {
    if (e.target.checked) {
      this.setState({
        menuids: [...this.state.menuids, e.target.value]
      }, () => { console.log("menuids138 ", this.state.menuids) });

    } else {
      var array = [...this.state.menuids]; // make a separate copy of the array
      var index = array.indexOf(e.target.value)
      array.splice(index, 1);
      this.setState({ menuids: array }, () => { console.log("menuid148", this.state.menuids) });
    }

    this.setState({ [e.target.name]: e.target.value})
    if (!this.checkEmptyFields()) {
      this.setState({
        'submitDisabled': false
      })
    }
  }

  saveOCtimes = (value, day) => {    
    this.setState({[day]: value.toISOString()})
  }

  changeDay = (e) => {
    let value = e.target.value
    this.setState({closedon: value})
    setTimeout(() => {
      this.forceUpdate()
    }, 200)
  }

  handleSubmit(e) {
    e.preventDefault()
    this.setState({ loading: true })
    let emptyFields = this.checkEmptyFields()

    if (emptyFields) {
      notify.show('All fields are required', 'error', 5000)
      this.setState({ loading: false })
    }
    else {
      if (this.state.address == "") {
        notify.show('Please provide address', 'error', 5000);
        this.setState({ loading: false })
      }
      else if (this.state.phone_number == "") {
        notify.show('Please provide phone number', 'error', 5000);
        this.setState({ loading: false })
      }
      else {
        var data = {
          businessname: this.state.businessname.trim(),
          phone: this.state.phone_number.trim(),
          address: this.state.address.trim(),
          url: this.state.url.trim(),
          state: this.state.state.trim(),
          city: this.state.city.trim(),
          country: this.state.country.trim(),
          zipcode: this.state.zipcode.trim(),
          closedon: this.state.closedon,
          octimes: {
            mondayOpen : this.state.mondayOpen,
            mondayClose : this.state.mondayClose,
            tuesdayOpen : this.state.tuesdayOpen,
            tuesdayClose : this.state.tuesdayOpen,
            wednesdayOpen : this.state.wednesdayOpen,
            wednesdayClose : this.state.wednesdayClose,
            thursdayOpen : this.state.thursdayOpen,
            thursdayClose : this.state.thursdayClose,
            fridayOpen : this.state.fridayOpen,
            fridayClose : this.state.fridayClose,
            saturdayOpen : this.state.saturdayOpen,
            saturdayClose : this.state.saturdayClose,
            sundayOpen : this.state.sundayOpen,
            sundayClose : this.state.sundayClose,
          },
          updatedAt: Date.now()
        }

        try {
          ApiService.editbusinessprofile(token, userid, data)
            .then(res => res.json())
            .then(response => {
              this.setState({ loading: false })
              if (response.success) {
                notify.show('Business profile has been updated successfully.', 'success', 3000)
                this.setState({
                  formDisabled: true
                }, () => {
                  this.props.fetchUserData(userid, token)
                })
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
        // notify.show('all is well', 'success', 5000);
      }
    }

  }

  displaySelectOptions() {
    this.setState({
      'optionsShowing': true,
      'styledSelectClass': 'styledSelect active',
      'optionsDisplayedStyle': {
        'display': 'block'
      },
    })
  }

  hideSelectOptions() {
    if (this.state.optionsShowing) {
      this.setState({
        'optionsShowing': false,
        'styledSelectClass': 'styledSelect',
        'optionsDisplayedStyle': {
          'display': 'none'
        },
      })
    }
  }

  optionSelected(option = '') {
    if (option !== ' ') {
      this.setState({
        'option': option,
        'optionTextStyle': {
          'color': '#000'
        }
      })
    }
  }

  optionChanged(e) {
    this.setState({
      'option': e.target.value
    })
  }

  checkEmptyFields() {
    var registerFields = ['businessname', 'businessemail', 'phone_number', 'address', 'opening_time', 'closing_time'/*, 'categories'*/]
    var emptyFields = false
    for (let registerField of registerFields) {
      if (this.state[registerField] === '') {
        // console.log(registerField+ ' is empty')
        emptyFields = true
      }
    }

    return emptyFields
  }

  render() {
    const countriesList = Object.values(this.state.countries)
    const citiList = Object.values(this.state.cities)
    console.log(countriesList);

    var OptionText = ''
    if (this.state.option === '') {
      OptionText = "Choose an Option"
    }
    else {
      OptionText = this.state.option
    }

    const menulist = this.state.getmenudata.map((dynamicData, index) => {
      //return (
      //this.state.menu.map((value, index) => {
      if (1) {
        return (
          <div className="singleCheckbox" key={index} >
            <input id={dynamicData._id} type="checkbox" checked name={dynamicData._id} value={dynamicData._id} onChange={this.handleChange} />
            <label htmlFor={dynamicData._id}><span></span>{dynamicData.title}</label>
          </div>
        )
      }
      else /*if (value._id !== dynamicData._id)*/ {
        return (
          <div className="singleCheckbox" key={index} >
            <input id={dynamicData._id} type="checkbox" name={dynamicData._id} value={dynamicData._id} onChange={this.handleChange} />
            <label htmlFor={dynamicData._id}><span></span>{dynamicData.title}</label>
          </div>
        )
      }

    })
    return (
      <section className="loginSection" onClick={this.hideSelectOptions} >
        <Notifications options={{ top: '50px' }} />
        <Loader loading={this.state.loading} />
        <div className="loginWrapperOuter">
          <div className="loginWrapper">
            <header>
              {this.state.pageTitle}
            </header>

            <form className="form" onSubmit={this.handleSubmit}>
              <fieldset disabled={this.state.formDisabled}>
                <div className="inputOuter">
                  <div className="label-small">* Store URL extension</div>
                  <input name="url" value={this.state.url ? this.state.url : ''} type="text" onChange={this.handleChange} required/>
                </div>
                <div className="inputOuter">
                <div className="label-small">* Business name</div>
                  <input name="businessname" value={this.state.businessname ? this.state.businessname : ''} type="text" onChange={this.handleChange} />
                </div>
                <div className="inputOuter">
                <div className="label-small">* Business address</div>
                <textarea name="address" value={this.state.address} placeholder={this.state.address != "" ? '' : "Address"} type="text" onChange={this.handleChange} required>
                  {this.state.address}
                </textarea>
                  {/* <input name="address" value={this.state.address != "" ? this.state.address : ''} placeholder={this.state.address != "" ? '' : "Address"} type="text" onChange={this.handleChange} required/> */}
                </div>

                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                  
                    <div className="inputOuter">
                    <div className="label-small">* City</div>
                    <select name="city" value={this.state.city} onChange={this.handleChange}>
                        <option disabled="disabled" selected="selected">
                        {this.state.cityLoader ? 'Loading....' : 'Choose city'}</option>
                        { !this.state.cityLoader ?
                          citiList.map((value, i) => 
                          <option key={value} value={value}>{value}</option> ) :
                          <option>Loading...</option>  
                          }
                      </select>
                    </div>
                  </div>
    
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                    <div className="inputOuter">
                    <div className="label-small">* State</div>
                      <select name="state" value={this.state.state} onChange={(e) => this.stateChange(e)}>
                        <option disabled="disabled">Choose state</option>
                        {this.renderStates().map((val, i) => 
                          <option key={i} value={val.id} >{val.name}</option>
                        )}
                      </select>
                    </div>
                  </div>
                  </div>


                  <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                    <div className="inputOuter">
                    <div className="label-small">* Zipcode</div>
                      <input value={this.state.zipcode} placeholder="Zipcode" type="text" maxLength="6" name="zipcode" onChange={this.handleChange} />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                  <div className="inputOuter">
                  <div className="label-small">* Country</div>
                      <select name="country" value={this.state.country} onChange={(e) => this.countryChange(e)}>
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
                </div>

                <div className="inputOuter">
                <div className="label-small">* Business phone</div>
                  <input name="phone_number" value={this.state.phone_number ? this.state.phone_number : ''} placeholder="Phone Number" type="tel" onChange={this.handleChange} />
                </div>
                
                <div className="label-small">* Open & close times</div>
                <Weekly_time_picker
                    changeProp = {(value, day) => this.saveOCtimes(value, day) }
                    change = {(e) => this.changeDay(e)}
                    mondayOpen = {this.state.mondayOpen}
                    mondayClose = {this.state.mondayClose}
                    tuesdayOpen = {this.state.tuesdayOpen}
                    tuesdayClose = {this.state.tuesdayClose}
                    wednesdayOpen = {this.state.wednesdayOpen}
                    wednesdayClose = {this.state.wednesdayClose}
                    thursdayOpen = {this.state.thursdayOpen}
                    thursdayClose = {this.state.thursdayClose}
                    fridayOpen = {this.state.fridayOpen}
                    fridayClose = {this.state.fridayClose}
                    saturdayOpen = {this.state.saturdayOpen}
                    saturdayClose = {this.state.saturdayClose}
                    sundayOpen = {this.state.sundayOpen}
                    sundayClose = {this.state.sundayClose}
                    closedon = {this.state.closedon}
                 />

                

                <div className="menuCheckList">
                  {menulist}

                </div>
                <button className="button" >Submit</button>
              </fieldset>
            </form>
          </div>
        </div>
      </section>
    )
  }
}

export default connect(null, {fetchUserData})(withRouter(AddBusinessProfilePage))