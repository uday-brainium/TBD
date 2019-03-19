import React, { Component } from 'react';
import Notifications, { notify } from 'react-notify-toast';
import Loader from '../components/simpleloader'
import ApiService from '../../services/api';
import {Base_url} from './../../utilities/config';
import { Row, Col } from 'react-bootstrap';
import './store.css'
import './../../styles/style_sheet.css'


let userid = localStorage.getItem('user-id')
let token = localStorage.getItem('access-token-tbd')

export default class Edit_offer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentOfferBanner: '',
      submitLoading: false,
      offerDetails: ''
    };
  }

  componentDidMount() {
    ApiService.getUserdetails(userid, token)
    .then((res) => res.json())
    .then((response) => {
      this.setState({
        currentOfferBanner: `${Base_url}${response.data.offerImage}`,
        offerDetails: response.data.offerdetails
      })
    })
  }

  saveBanner = () => {

      this.setState({submitLoading: true})
      let data = {
        offer_image: this.state.currentOfferBanner,
        offer_details: this.state.offerDetails
      }
      ApiService.edit_offer(token, userid, data)
      .then((res) => res.json())
      .then((response) => {
        notify.show('Offer banner updated succesfully', 'success', 3000);
        this.setState({submitLoading: false})
      })
     
  }

  handleFileUpload = (e) => {
    var base64 = ""
    var file    = document.querySelector('#edit_offer_banner').files[0];
    var reader  = new FileReader();
  
    reader.addEventListener("load", function () {
      base64 = reader.result
    }, false);
  
    setTimeout(() => {
      this.setState({currentOfferBanner: base64})
    },1000)
  
    if (file) {
      reader.readAsDataURL(file);
      }
  }

  handleChange = (e) => {
    let val = e.target.value
    let name = e.target.name
    this.setState({[name]: val})
  }

  render() {
    return (
      <div className="right">
      <Notifications />
        <div className="rightSideHeader">
          <ul className="breadcrumbNavigation">
              <i class="fas fa-images breadcumb-icon"></i>
              <li className="breadcumb-text"><span className="left-space">Update offer details</span></li>
          </ul>
        </div>

        <Loader loading={this.state.submitLoading} background="no-fill"/>
        <div className="container-inside">
        <Row>
            <Col lg={3} md={3} sm={3} xs={0}></Col>

            <Col lg={6} md={6} sm={6} xs={12}>
              <div className="banner-container">
               <img src={this.state.currentOfferBanner} style={{height: 200, width: '100%'}} />
              </div>
              <div className="store-edit-banner-button">
               <span className="upload-banner-text-store">Upload offer banner</span>
                <input
                  type="file"
                  name="edit_store_banner"
                  value=""
                  id="edit_offer_banner"
                  onChange={this.handleFileUpload}
                  accept="image/*"
                />
                </div>
                <div className="inputOuter details">
                  <div className="label-small left">* Offer details</div>
                  <textarea className='full-width' name="offerDetails" value={this.state.offerDetails} placeholder={this.state.offerDetails != "" ? '' : "Offer details"} type="text" onChange={this.handleChange}>
                    {this.state.offerDetails}
                  </textarea>
                    {/* <input name="address" value={this.state.address != "" ? this.state.address : ''} placeholder={this.state.address != "" ? '' : "Address"} type="text" onChange={this.handleChange} required/> */}
                  </div>
                  
                <div>
                <button className="save-image-btn" onClick={this.saveBanner}>Save offer details</button>
              </div>
            </Col>

            <Col lg={3} md={3} sm={3} xs={0}></Col>
          </Row>
        </div>
      </div>
    );
  }
}
