import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import './../../styles/style_sheet.css'
import './../Store/store.css'
import ApiService from '../../services/api';
import Loader from './../components/simpleloader'
import {Base_url} from './../../utilities/config'
import Notifications, { notify } from 'react-notify-toast';
import Page_head from './../components/page_head';

let userid = localStorage.getItem('user-id')
let token = localStorage.getItem('access-token-tbd')

export default class Birthday_promotion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImage: '',
      offerDetails: '',
      discountPercent: 0,
      discounttype: 'percentage',
      loading: false,
      changed: false
    };
  }

  componentDidMount() {
    let data = JSON.parse(localStorage.getItem('userdata')).data
    this.setState({
      currentImage: `${Base_url}/${data.birthdaypromo.bannerimage}`,
      offerDetails: data.birthdaypromo.details,
      discountPercent: data.birthdaypromo.discount,
      discounttype: data.birthdaypromo.type
    })
  }

  renderOptions = (type) => {
    let opt = []
    for(let i = 0; i < 101; i++) {
      opt.push(<option key={i} value={i}>{type == "Doller"? `$${i}` : `${i}%`}</option>)
    }
    return opt
  }

  handleChange = (e) => {
    let val = e.target.value
    let name = e.target.name
    this.setState({[name]: val, changed: true})
    if(name == "discounttype" && this.state.discounttype != e.target.value) {
      this.setState({discountPercent: 1})
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.setState({loading: true})
    let saveData = {
      userid,
      bannerimage: this.state.currentImage,
      discount: this.state.discountPercent,
      discounttype: this.state.discounttype,
      details: this.state.offerDetails
    }

    ApiService.saveBirthdayPromo(saveData, token)
    .then(res => res.json())
    .then((response) => {
      if(response.status == 200) {
        let newData = {data: response.response}
        localStorage.setItem('userdata', JSON.stringify(newData))
        notify.show('Birthday offer updated', 'success', 3000);
        this.setState({loading: false})
      } else {
        notify.show('Something went wrong ! try again', 'error', 3000);
        this.setState({loading: false})
      }
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
      this.setState({currentImage: base64})
    },1000)
  
    if (file) {
      reader.readAsDataURL(file);
      }
  }

  render() {
    return (
      <div className="content-container">
        <div>
        <Page_head title = "Birthday promotion" icon="fas fa-birthday-cake"/>
        </div>
        <Notifications />
        <Loader loading={this.state.loading} fill="no-fill" />
        <div className="container-inside">
        <Row>
            <Col lg={3} md={3} sm={3} xs={0}></Col>

            <Col lg={6} md={6} sm={6} xs={12}>
            <form className="form" onSubmit={this.handleSubmit}>
              <div className="banner-container">
               <img src={this.state.currentImage} className="image-style" />
              </div>
              <div className="store-edit-banner-button">
               <span className="upload-banner-text-store">Upload birthday banner</span>
                <input
                  type="file"
                  name="edit_store_banner"
                  value=""
                  id="edit_offer_banner"
                  onChange={this.handleFileUpload}
                  accept="image/*"
                />
                </div>
                <div>

                <div className="inputOuter details">
                  <div className="label-small left">* Discount type</div>
                    <select name="discounttype" value={this.state.discounttype} onChange={this.handleChange}>
                      <option value="percentage">Percentage discount</option>
                      <option value="doller">Dollar discount</option>
                    </select>
                  </div>
                </div>

                 <div className="inputOuter details">
                  <div className="label-small left">* Amount</div>
                    <select value={this.state.discountPercent} name="discountPercent" onChange={this.handleChange}>
                      {this.renderOptions(this.state.discounttype == "percentage" ? "%" : "Doller")}
                    </select>
                  </div>

                <div className="inputOuter details">
                  <div className="label-small left">* Offer details</div>
                  <textarea className='full-width' name="offerDetails" value={this.state.offerDetails} placeholder={this.state.offerDetails != "" ? '' : "Offer details"} type="text" onChange={this.handleChange}>
                    {this.state.offerDetails}
                  </textarea>
                    {/* <input name="address" value={this.state.address != "" ? this.state.address : ''} placeholder={this.state.address != "" ? '' : "Address"} type="text" onChange={this.handleChange} required/> */}
                  </div>
                  
                <div>
                <button className="save-image-btn" onClick={this.saveBanner}>Save</button>
              </div>
              </form>
            </Col>

            <Col lg={3} md={3} sm={3} xs={12}></Col>
          </Row>
        </div>
      </div>
    );
  }
}
