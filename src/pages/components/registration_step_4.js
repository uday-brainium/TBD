import React, { Component } from 'react';
let place_img = require('./../../images/img_place2.svg')
var scrollToElement = require('scroll-to-element');

export default class Step3 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bannerImg: require('./../../images/img_place.png'),
      discountPercent: 0,
      discounttype: 'percentage',
    }
  }

  componentDidMount() {
    scrollToElement("#step4")
  }

  typeChange = (e) => {
    let name = e.target.name,
        value = e.target.value
    this.setState({[name] : value})
    this.props.change(e)
  }

  handleFileUpload = (e) => {
    var base64 = ""
    var file    = document.querySelector('#promo_image').files[0];
    var reader  = new FileReader();
  
    reader.addEventListener("load", function () {
      console.log(reader);
      base64 = reader.result;
    }, false);
  
    setTimeout(() => {
      this.setState({bannerImg: base64})
      this.props.setOfferBase64(base64)
    },1000)
   
  
    if (file) {
      reader.readAsDataURL(file); 
      }
    }

    renderOptions = (type) => {
      let opt = []
      for(let i = 0; i < 51; i++) {
        opt.push(<option key={i} value={i}>{type == "Doller"? `$${i}` : `${i}%`}</option>)
      }
      return opt
    }
  

  render() {
  
    return (
      <div className="animated slideInRight delay-0.5s" id="step4">
        {/* <div className="singleCheckbox">
            <input id="emailsubscription" type="checkbox" name="emailsubscription" defaultChecked={this.props.emailnotification} onChange={(e) => this.props.change(e)} />
            <label htmlFor="emailsubscription"><span></span>Latest offer by Email</label>
        </div>

        <div className="singleCheckbox">
            <input id="appnotification" type="checkbox" name="appnotification" defaultChecked={this.props.appnotification} onChange={(e) => this.props.change(e)} />
            <label htmlFor="appnotification"><span></span>Latest offer by App Notification</label>
        </div> */}

        <div className="info-text">
          <span>* Upload a banner image for your offer you want to give when user earn enough loyality points.</span>
        </div>

        <div className="promotion-banner-img">
        <img src={this.state.bannerImg} width="100%" height="100%"/> 
          <div className="promotion-banner">
            <span className="upload-banner-text">Upload banner</span>
              <input
                //id="bannerImg"
                type="file"
                name="profile_image"
                value=""
                id="promo_image"
                onChange={this.handleFileUpload}
                accept="image/*"
                //disabled={this.state.submitDisabled}
              />
            </div>
        </div>
        
        <div className="inputOuter details">
          <div className="label-small left">* Discount type</div>
            <select name="discounttype" value={this.state.discounttype} onChange={this.typeChange}>
              <option value="percentage">Percentage discount</option>
              <option value="doller">Doller discount</option>
            </select>
          </div>
        

          <div className="inputOuter details">
          <div className="label-small left">* Amount</div>
            <select defaultValue={this.state.discountPercent} name="discount" onChange={(e) => this.props.change(e)}>
              {this.renderOptions(this.state.discounttype == "percentage" ? "%" : "Doller")}
            </select>
          </div>

       
        <div className="inputOuter space-above">
          <p className="info-text">*Add some description for your offer.</p>
            <textarea placeholder="Offer description" name="offerdetails" onChange={(e) => this.props.change(e)}> 
            </textarea>
        </div>
      </div>
    );
  }
}
