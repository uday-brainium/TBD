import React, { Component } from 'react';
import Header from '../header'
import Navigation from '../navigation'
import { withRouter } from "react-router-dom"
import ApiService from './../../../services/api'
import Loader from '../../components/simpleloader'
import Title_head from './../page_title_head'
import Footer from './../footer'
import { Row, Col } from 'react-bootstrap';
import Notifications, { notify } from 'react-notify-toast';
import * as config from './../../../utilities/config'
import Add_card from './add_card'
import Card_list from './card_list'
import {AddToCart} from './../../Store/Food/Cart/'
import './profile.css'

let path = window.location.pathname
let storeName = path.split('/')[1];

class Guest_profile extends Component {

  state = {
    storeDetails: {},
    loading: true,
    userdata: {},
    firstnameEdit: false,
    lastnameEdit: false,
    addressEdit: false,
    mobileEdit: false,
    cityEdit: false,
    stateEdit: false,
    countryEdit: false,

    firstname: '',
    lastname: '',
    address: '',
    mobile: '',
    city: '',
    state: '',
    country: '',
    errorInput: false,

    allStates: {},
    allCities: {},
    selectedState: '',
    statejsx: [],

    cardnumber: '',
    month: '01',
    year: '2018',
    name: '',

    addCard: false,
    cards: [],

    profileImg: 'http://www.kitsunemusicacademy.com/wp-content/uploads/avatars/1/57e809f0cf20c-bpfull.jpg'
  }


  componentDidMount() {
    //check if the user is looged in 
    let data = localStorage.getItem('guest-userdata')
    if (JSON.parse(data) == null) {
      this.props.history.push('login')
    } else {
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
          console.log('err', error)
        })
      this.setUserdata()
      this.fetchAllPlaces()
    }
  }

  fetchAllPlaces = () => {

    //default country USA states 
    ApiService.get_states_by_country('US')
      .then((res) => res.json())
      .then((data) => this.setState({ allStates: data.result }))
      .then(() => {
        this.renderStates()
      })

    //Defult state albama cities
    ApiService.get_cities_by_state(this.state.state != "" ? this.state.state : 'AL')
      .then((res) => res.json())
      .then((data) => this.setState({ allCities: data.result }))
  }

  renderStates() {
    for (var key in this.state.allStates) {
      if (this.state.allStates.hasOwnProperty(key)) {
        if (this.state.statejsx.length < 51) {
          this.state.statejsx.push(
            { 'id': key.replace(/['"]+/g, ''), name: this.state.allStates[key] }
          );
        }
      }
    }
    return this.state.statejsx
  }

  setUserdata = () => {
    //Getting the loggedin user information
    let userdata = localStorage.getItem('guest-userdata')
    let data = JSON.parse(userdata)
    this.setState({
      userdata: data,
      firstname: data.firstname,
      lastname: data.lastname,
      address: data.address,
      mobile: data.mobile,
      city: data.city,
      state: data.state,
      country: data.country,
      cards: data.saved_cards,
      profileImg: data.profile_image != "" ? `${config.Base_url}${data.profile_image}` : 'https://banner2.kisspng.com/20180615/rtc/kisspng-avatar-user-profile-male-logo-profile-icon-5b238cb002ed52.870627731529056432012.jpg',
      screen: 'profileinfo'
    })
  }

  editFieldFn = (field) => {
    this.setState({ [field]: !this.state[field] })
  }

  change = (e) => {
    let name = e.target.name
    let val = e.target.value
    if (name == "cardnumber") {
      e.target.value = e.target.value.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
    }
    if (val == "") {
      this.setState({ errorInput: true })
    } else {
      this.setState({ errorInput: false })
    }
    this.setState({ [name]: val })
  }

  stateChange = (e) => {
    let val = e.target.value;
    let name = e.target.options[e.target.selectedIndex].text;
    this.setState({ currenState: val, state: name })
    ApiService.get_cities_by_state(val)
      .then((res) => res.json())
      .then((data) => this.setState({ allCities: data.result }))
  }

  saveFieldEdit = (name) => {
    if (!this.state.errorInput) {
      this.setState({ loading: true })
      if (name == "state") {
        this.setState({ cityEdit: true })
      }
      let val = this.state[name]
      let data = {
        userid: this.state.userdata._id,
        field: name,
        value: val
      }
      let editName = `${name}Edit`
      ApiService.edit_guest_one(data)
        .then(res => res.json())
        .then(response => {
          // console.log('res', response);
          localStorage.setItem('guest-userdata', JSON.stringify(response.response))
          this.setState({ [editName]: false, loading: false })
          this.setUserdata()
        })
    } else {
      this.setState({ errorInput: false }, () => {
        this.setState({ errorInput: true })
      })
    }
  }


  saveCard = (e) => {
    e.preventDefault()
    this.setState({ loading: true })
    let card = {
      userid: this.state.userdata._id,
      cardnumber: this.state.cardnumber,
      name: this.state.name,
      expiry: `${this.state.month}/${this.state.year}`
    }
    ApiService.saveCard(card)
      .then(res => res.json())
      .then(response => {
        this.setState({ loading: false })
        //console.log('response', response);
        localStorage.setItem('guest-userdata', JSON.stringify(response.response))
        this.setUserdata()
        this.setState({ addCard: false })
      })
  }

  handleFileUpload = (e) => {
    var base64 = ""
    var file = document.querySelector('#guest_image').files[0];
    var reader = new FileReader();

    reader.addEventListener("load", function () {
      console.log(reader);
      base64 = reader.result;
    }, false);

    setTimeout(() => {
      this.setState({ profileImg: base64 })
      this.saveProfileImage(base64)
    }, 1000)


    if (file) {
      reader.readAsDataURL(file);
    }
  }

  saveProfileImage = (base64) => {
    this.setState({ loading: true })
    let data = {
      userid: this.state.userdata._id,
      image: base64
    }
    ApiService.edit_guest_image(data)
      .then(res => res.json())
      .then(response => {
        this.setState({ loading: false })
        localStorage.setItem('guest-userdata', JSON.stringify(response.response))
        this.setUserdata()
      })
  }

  deleteCard = (card) => {
    this.setState({ loading: true })
    let data = {
      userid: this.state.userdata._id,
      cardnumber: card
    }
    ApiService.deleteCard(data)
      .then(res => res.json())
      .then(response => {
        this.setState({ loading: false })
        //console.log('deleted', response);
        localStorage.setItem('guest-userdata', JSON.stringify(response.response))
        this.setUserdata()
      })
  }

  reorderItem = (data) => {
    
    const item = {
      itemid: data.itemid,
      itemname: data.itemname,
      itemprice: data.itemprice,
      itemdescription: data.itemdescription,
      ingredients: data.ingredients,
      selectedIngredients: [],
      ingredientPrice: 0,
      count: data.count
    }

    console.log('data', item);
    localStorage.setItem('cart', JSON.stringify({cart: []}))
    AddToCart(null, item).then(() => {
      this.props.history.push('mycart')
    })

  }


  render() {
    const { userdata } = this.state
    const citiList = Object.values(this.state.allCities)
    // console.log(this.state.userdata.saved_cards);

    return (
      <div>
        {this.state.storeDetails != null &&
          <Header
            storebanner={this.state.storeDetails.storebanner}
            rating={4.7}
            votes={75}
            businessname={this.state.storeDetails.businessname}
            address={this.state.storeDetails.address}
            phone={this.state.storeDetails.phone}
            modalShow={this.state.timeModal}
            timings={this.state.storeDetails.timings}
            closedon={this.state.storeDetails.closedon}
          />
        }
        <Notifications />
        <Title_head title="Profile" fa_icon_class="far fa-id-badge" hasRightmenu={true} username={`${userdata.firstname} ${userdata.lastname}`} />
        <Loader loading={this.state.loading} background='no-fill' />
        <div className="profile-container">
          <Row className="profile-row">
            <Col lg={4} md={4} sm={12} xs={12} className="profile-left">

              <div className="profile-icon">

                <div className="guest-user-image">
                  <img src={this.state.profileImg} width="100%" height="100%" />
                  <div className="colored">{userdata.firstname} {userdata.lastname}</div>
                  <i className="far fa-edit image-edit-icon"></i>

                  <input
                    //id="bannerImg"
                    type="file"
                    name="guest_profile"
                    value=""
                    id="guest_image"
                    onChange={this.handleFileUpload}
                    accept="image/*"
                  //disabled={this.state.submitDisabled}
                  />

                </div>
                {/* <img src="http://www.kitsunemusicacademy.com/wp-content/uploads/avatars/1/57e809f0cf20c-bpfull.jpg" /> */}
              </div>
              <div className="profile-menu" onClick={() => this.setState({ screen: 'profileinfo' })}>Profile information </div>
              <div className="profile-menu" onClick={() => this.setState({ screen: 'savedcards' })}>Saved cards </div>
              <div className="profile-menu" onClick={() => this.setState({ screen: 'myorders' })}>My orders </div>
            </Col>

            <Col lg={6} md={6} sm={8} xs={12} className="profile-center">

              {this.state.screen == "profileinfo" &&
                <div>
                  <div className="colored"> Profile information</div>
                  {this.state.errorInput && <div className="field-error animated headShake">Fields can not be blank !</div>}
                  <div className="details-list">
                    <div>Firstname:
                  {this.state.firstnameEdit ?
                        (<span className="profile-value">
                          <input className="edit-input" name="firstname" type="text" onChange={this.change} value={this.state.firstname} required />
                        </span>) :
                        <span className="profile-value">{userdata.firstname} </span>
                      }
                      {this.state.firstnameEdit ?
                        <span className="save-edit-icon" onClick={() => this.saveFieldEdit('firstname')}><i className="fas fa-check"></i></span> :
                        <span className="edit-icon" onClick={() => this.editFieldFn('firstnameEdit')}><i className="fas fa-edit"></i></span>
                      }
                    </div>
                    <div>Lastname:
                  {this.state.lastnameEdit ?
                        (<span className="profile-value">
                          <input className="edit-input" name="lastname" type="text" onChange={this.change} value={this.state.lastname} />
                        </span>) :
                        <span className="profile-value">{userdata.lastname} </span>
                      }
                      {this.state.lastnameEdit ?
                        <span className="save-edit-icon" onClick={() => this.saveFieldEdit('lastname')} ><i className="fas fa-check"></i></span> :
                        <span className="edit-icon" onClick={() => this.editFieldFn('lastnameEdit')}><i className="fas fa-edit"></i></span>
                      }
                    </div>
                    <div className="address">Address:
                {this.state.addressEdit ?
                        (<span className="profile-value">
                          {/* <input className="edit-input" name="address" type="text" onChange={this.change} value={this.state.address} /> */}
                          <textarea className="edit-input textarea" name="address" type="text" onChange={this.change}>
                            {this.state.address}
                          </textarea>
                        </span>) :
                        <span className="profile-value address">{userdata.address} </span>
                      }
                      {this.state.addressEdit ?
                        <span className="save-edit-icon" onClick={() => this.saveFieldEdit('address')}><i className="fas fa-check"></i></span> :
                        <span className="edit-icon" onClick={() => this.editFieldFn('addressEdit')}><i className="fas fa-edit"></i></span>
                      }
                    </div>
                    <div>Mobile:
                {this.state.mobileEdit ?
                        (<span className="profile-value">
                          <input className="edit-input" name="mobile" type="text" onChange={this.change} value={this.state.mobile} />
                        </span>) :
                        <span className="profile-value">{userdata.mobile} </span>
                      }
                      {this.state.mobileEdit ?
                        <span className="save-edit-icon" onClick={() => this.saveFieldEdit('mobile')}><i className="fas fa-check"></i></span> :
                        <span className="edit-icon" onClick={() => this.editFieldFn('mobileEdit')}><i className="fas fa-edit"></i></span>
                      }
                    </div>
                    <div>City:
                {this.state.cityEdit ?
                        (<span className="profile-value">
                          {/* <input className="edit-input" name="city" type="text" onChange={this.change} value={this.state.city} />
                     */}
                          <select className="edit-input" name="city" onChange={this.change}>
                            {
                              citiList.map((value, i) =>
                                <option key={i} value={value}>{value}</option>)
                            }
                          </select>
                        </span>) :
                        <span className="profile-value">{userdata.city} </span>
                      }
                      {this.state.cityEdit ?
                        <span className="save-edit-icon" onClick={() => this.saveFieldEdit('city')}><i className="fas fa-check"></i></span> :
                        <span className="edit-icon" onClick={() => this.editFieldFn('cityEdit')}><i className="fas fa-edit"></i></span>
                      }
                    </div>
                    <div>State:
                {this.state.stateEdit ?
                        (<span className="profile-value">
                          {/* <input className="edit-input" name="state" type="text" onChange={this.change} value={this.state.state} /> */}
                          <select name="state" className="edit-input" defaultValue={3919} onChange={(e) => this.stateChange(e)}>
                            {this.renderStates().map((val, i) =>
                              (
                                <option key={i} selected={val.name == this.state.state ? val.id : ''} key={i} value={val.id} >{val.name}</option>
                              )
                            )}
                          </select>
                        </span>) :
                        <span className="profile-value">{userdata.state} </span>
                      }
                      {this.state.stateEdit ?
                        <span className="save-edit-icon" onClick={() => this.saveFieldEdit('state')}><i className="fas fa-check"></i></span> :
                        <span className="edit-icon" onClick={() => this.editFieldFn('stateEdit')}><i className="fas fa-edit"></i></span>
                      }
                    </div>
                    <div>Country:
                {this.state.countryEdit ?
                        (<span className="profile-value">
                          {/* <input className="edit-input" name="country" type="text" onChange={this.change} value={this.state.country} /> */}
                          <select className="edit-input" name="country" value={230} onChange={this.onChange}>
                            <option value="US"> United states </option>
                          </select>
                        </span>) :
                        <span className="profile-value">{userdata.country} </span>
                      }
                      {this.state.countryEdit ?
                        <span className="save-edit-icon" onClick={() => this.saveFieldEdit('country')}><i className="fas fa-check"></i></span> :
                        <span className="edit-icon" onClick={() => this.editFieldFn('countryEdit')}><i className="fas fa-edit"></i></span>
                      }
                    </div>
                  </div>
                </div>}

              {this.state.screen == "savedcards" &&
                <div>
                  <div className="colored">
                    Payment information
                  </div>
                    <div className="add-payment" onClick={() => this.setState({ addCard: true })}>
                    <i className="fas fa-credit-card"></i> Add new payment method
                  </div>


                  {!this.state.addCard &&
                    this.state.cards.length !== 0 ?
                    this.state.cards.map(card => {
                      return (
                        <Card_list key={card.cardnumber} cardnumber={card.cardnumber} expiry={card.expiry} deleteCard={this.deleteCard} />
                      )
                    }) :
                    <div>
                      {!this.state.addCard &&
                        <div className="no-saved">
                          No save cards
                  </div>
                      }
                    </div>
                  }

                  {/* //Add-new -card */}
                  {this.state.addCard &&
                    <Add_card change={this.change} saveCard={this.saveCard} close={() => this.setState({ addCard: false })} />
                  }
                </div>
              }

              {this.state.screen == "myorders" && 
                <div>
                  <div className="profile-orders"> 
                    <div className="profile-order-head">My orders</div>
                      {this.state.userdata.orders.slice(0, 5).map((data, i) => {
                        return (
                          <div key={i} className="profile-order-list">
                          <div className="order-content">
                            <div>Item name: {data.itemname}</div>
                            <div> price: {data.itemprice}</div>
                            <div>Description: {data.itemdescription}</div>
                            <div>Quantity: {data.count}</div>
                          </div>
                          <div onClick={() => this.reorderItem(data)} className="reorder-btn">Reorder</div>
                          
                         </div>
                        )
                      })
                    }
                  </div>
                </div>
              }

            </Col>

            <Col lg={4} md={4} sm={12} xs={12} className="payment-section">

            </Col>
          </Row>
        </div>

        <Footer />
        <Navigation
          nav={this.props.history}
          store={storeName}
          storeData={this.state.storeDetails}
        />

      </div>
    );
  }
}

export default withRouter(Guest_profile)
