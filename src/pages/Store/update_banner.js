import React, { Component } from 'react';
import {connect} from 'react-redux'
import ApiService from '../../services/api';
import {Base_url} from './../../utilities/config';
import Notifications, { notify } from 'react-notify-toast';
import Loader from '../components/simpleloader'
import { Modal, Button, Row, Col } from 'react-bootstrap';
import './store.css'

let userid = localStorage.getItem('user-id')
let token = localStorage.getItem('access-token-tbd')

 class Edit_banner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBanner: '',
      submitLoading: false
    };
  }

  componentDidMount() {
      ApiService.getUserdetails(userid, token)
      .then((res) => res.json())
      .then((response) => {
        this.setState({currentBanner: `${Base_url}${response.data.bannerImage}`})
      })
  }

  handleFileUpload = (e) => {
    var base64 = ""
    var file    = document.querySelector('#edit_store_banner').files[0];
    var reader  = new FileReader();
  
    reader.addEventListener("load", function () {
      base64 = reader.result
    }, false);
  
    setTimeout(() => {
      this.setState({currentBanner: base64})
    },1000)
  
    if (file) {
      reader.readAsDataURL(file);
      }
  }

  saveBanner = () => {
    if(this.state.currentBanner.length > 10000) {
      this.setState({submitLoading: true})
      let data = {
        banner_image: this.state.currentBanner
      }
      ApiService.editbusinessprofile(token, userid, data)
      .then((res) => res.json())
      .then((response) => {
        notify.show('Banner image updated succesfully', 'success', 3000);
        this.setState({submitLoading: false})
      })
    } else {
      notify.show('Please upload a new banner image', 'error', 3000);
    }
    
  }

  render() {
    console.log('banner', this.state.currentBanner.length);
    
    return (
      <div className="right">
      <Notifications />
        <div className="rightSideHeader">
          <ul className="breadcrumbNavigation">
              <i class="fas fa-images breadcumb-icon"></i>
              <li className="breadcumb-text"><span className="left-space">Change store banner</span></li>
          </ul>
        </div>

        <Loader loading={this.state.submitLoading} background="no-fill"/>

        <div className="container-inside">
          <Row>
            <Col lg={3} md={3} sm={3} xs={0}></Col>

            <Col lg={6} md={6} sm={6} xs={12}>
              <div className="banner-container">
               <img src={this.state.currentBanner} style={{height: 200, width: '100%'}} />
              </div>
              <div className="store-edit-banner-button">
               <span className="upload-banner-text-store">Upload store banner</span>
                <input
                  type="file"
                  name="edit_store_banner"
                  value=""
                  id="edit_store_banner"
                  onChange={this.handleFileUpload}
                  accept="image/*"
                />
                </div>
              <div>
                <button className="save-image-btn" onClick={this.saveBanner}>Save image</button>
              </div>
            </Col>

            <Col lg={3} md={3} sm={3} xs={0}></Col>
          </Row>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return{
       userdata: state.primaryuserdata
    }
}

export default connect(mapStateToProps, null)(Edit_banner)