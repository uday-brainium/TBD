import React, { Component } from 'react';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import ApiService from './../../services/api'
import Weekly_time_picker from './weekly-time-picker'
var scrollToElement = require('scroll-to-element');


const openTime = moment().hour(10).minute(0);
const closeTime = moment().hour(20).minute(0);

export default class Step2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagePrev: require('./../../images/img_place.png'),
      countries: {},
      states: {},
      cities: {},
      statejsx: [],
      loading: true,
      cityLoader: false
    };
    scrollToElement('#step2');
  }


  componentDidMount(){
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
    
    let cId = e.target.value > 0 ?
    parseInt(parseInt(e.target.value) + 1) :
    e.target.value
    
    ApiService.get_states_by_country(cId)
    .then((res) => res.json())
    .then((data) => this.setState({states: data.result}))
    //saving data to primary state
    this.props.change(e)
  }

  stateChange = (e) => {
    let selected = e.target.options[e.target.selectedIndex].text;
    
    this.setState({cityLoader: true})
    let stateId = `${e.target.value}`
    ApiService.get_cities_by_state(stateId)
    .then((res) => res.json())
    .then((data) => this.setState({cities: data.result, cityLoader: false})  )
    let manupulate = {
      target: {
        value: stateId,
        name: 'state'
      }
    } 
    //saving data to primary state
    this.props.change(manupulate)
  }

  handleFileUpload = (e) => {
  var base64 = ""
  var file    = document.querySelector('#banner_image1').files[0];
  var reader  = new FileReader();

  reader.addEventListener("load", function () {
    console.log(reader);
    base64 = reader.result;
  }, false);

  setTimeout(() => {
    this.setState({imagePrev: base64})
    this.props.setBannerBase64(base64)
  },1000)
 

  if (file) {
    reader.readAsDataURL(file); 
    }
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


  render() {

    const countriesList = Object.values(this.state.countries)
    const citiList = Object.values(this.state.cities)

    return (
      <div className="animated slideInRight delay-0.5s">
        <div className="row" id="step2">
        <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2"></div>
         <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8">

         <div className="business-banner-img">
        <img src={this.state.imagePrev} width="100%" height="100%"/> 
          <div className="promotion-banner">
            <span className="upload-banner-text-store">Upload store banner</span>
              <input
                //id="bannerImg"
                type="file"
                name="profile_image"
                value=""
                id="banner_image1"
                onChange={this.handleFileUpload}
                accept="image/*"
                //disabled={this.state.submitDisabled}
              />
            </div>
        </div>

          </div>
          <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2"></div>
        </div>

        <div className="inputOuter">
            <input placeholder="domain extension (www.dublesat.com/YOUR_EXTENSION)" type="text" name="urlextension" onChange={(e) => this.props.change(e)} />
        </div>

        <div className="inputOuter">
            <input placeholder="Business name" type="text" name="businessname" onChange={(e) => this.props.change(e)} />
        </div>

        <Weekly_time_picker
         changeProp = {(value, day) => this.props.saveOCtimes(value, day) }
         change = {(e) => this.props.change(e)}
         />
        
        <div className="inputOuter">
            <input placeholder="Business contact number (Max 13 Digit)" type="text" name="businesscontact" onChange={(e) => this.props.change(e)} />
        </div>

        <div className="inputOuter">
            <textarea placeholder="Street address" name="businessaddress" onChange={(e) => this.props.change(e)}> 
              
            </textarea>
        </div>

        <div className="row">
         <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
         
          <div className="inputOuter">
          <select name="city" onChange={(e) => this.props.change(e)}>
              <option disabled="disabled">
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
            <select name="state" defaultValue={3919} onChange={(e) => this.stateChange(e)}>
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
            <input placeholder="Zipcode" type="text" maxLength="6" name="zipcode" onChange={(e) => this.props.change(e)} />
          </div>
         </div>
         <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
         <div className="inputOuter">
            <select name="country" value={230} onChange={(e) => this.countryChange(e)}>
            <option disabled="disabled" >Choose country</option>
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

       


        {/* <div className="inputOuter">
            <input placeholder="Loyality points on social post"  type="text" name="pointsonsocialpost" onChange={(e) => this.props.change(e)} />
        </div>

        <div className="inputOuter">
            <input placeholder="Loyality card price" type="text" name="loyalitycardprice" onChange={(e) => this.props.change(e)} />
        </div>

        <div className="inputOuter">
            <input placeholder="Loyality points need to get promotion" type="text" name="minloyalitypoints" onChange={(e) => this.props.change(e)} />
        </div> */}
      </div>
    );
  }
}
