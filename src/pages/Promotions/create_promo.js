import React, { Component } from 'react';
import Page_head from './../components/page_head'
import Loader from './../components/simpleloader'
import { Row, Col } from 'react-bootstrap'
import Notifications, { notify } from 'react-notify-toast';
import './styles.css'
import ApiService from '../../services/api';

const userid = localStorage.getItem('user-id')

export default class create_promo extends Component {

  state = {
    loading: false,
    discounttype: 'percentage',
    promocode: '',
    promotionDetails: '',
    discountvalue: '',
    expirydate:'',

    promoList: []
  }

  componentDidMount() {
    this.fetchList()
  }

  fetchList = () => {
    this.setState({loading: true})
    ApiService.get_promocodes(userid)
    .then(res => res.json())
    .then(response => {
      if(response.status === 200)
       this.setState({promoList: response.response, loading: false})
    })
  }

  renderOptions = (type) => {
    let opt = []
    for (let i = 0; i < 51; i++) {
      opt.push(<option key={i} value={i}>{type == "Doller" ? `$${i}` : `${i}%`}</option>)
    }
    return opt
  }

  handleChange = (e) => {
    let val = e.target.value
    let name = e.target.name
    this.setState({ [name]: val, changed: true })
    if (name == "discounttype" && this.state.discounttype != e.target.value) {
      this.setState({ discountPercent: 1 })
    }
  }

  savePromo = (e) => {
    e.preventDefault()
    this.setState({loading: true})
    const data = {
      businessid: userid,
      promocode: this.state.promocode,
      discounttype: this.state.discounttype,
      discountvalue: this.state.discountvalue,
      details: this.state.promotionDetails,
      expirydate: this.state.expirydate,
    }

    ApiService.add_promo_code(data)
    .then(res => res.json())
    .then(response => {
      this.setState({loading: false})
      this.fetchList()
      this.setState({promocode: '', discounttype: 'percentage', discountvalue: '', promotionDetails: '', expirydate: ''}, () => {
        notify.show('Promocode has beed added successfully', 'success', 3000)
      })
    })
  }

  deletePromo = (promoid) => {
    this.setState({loading: true})
    ApiService.delete_promo(promoid)
    .then(res => res.json())
    .then(response => {
      console.log(response);
      this.setState({loading: false})
      this.fetchList()
    })
  }

  render() {
    const {promoList} = this.state
    return (
      <div className="content-container">
        <div>
          <Page_head title="Promotions" icon="fas fa-percent" />
        </div>
        <Loader loading={this.state.loading} fill="no-fill" />
        <Notifications />
        <div className="container-inside">
          <Row>
            <Col lg={4} md={4} sm={6} xs={12} className="list-promocodes">
              <div className="heading">
                Promocodes
                </div>
                {promoList.map(data => (
                  <div key={data._id} className="promocodes">
                  <span>Code - <span className="code">{data.promocode}</span></span> <br></br><br></br>
                  <div>Discount - {data.discounttype === "doller" ? `$${data.discountvalue}` : `${data.discountvalue}%`} off</div>
                  <div>Expire - {data.expirydate}</div>
                  <div>Description - {data.details}</div>
                  <div onClick={() => this.deletePromo(data._id)} className="delete-promo">Delete</div>
                </div>
                ))
               }

            </Col>

            <Col lg={8} md={8} sm={6} xs={12} className="create-promocode">
              <div className="heading">
                Create promotion
              </div>
              <center>
                <div className="create-form">
                  <form className="form" >
                    <div className="inputOuter details">
                      <div className="label-small left">* Promocode</div>
                      <input placeholder="Promocode" onChange={this.handleChange} name="promocode" className="code-input" maxLength={10} type="text" required />
                    </div>


                    <div className="inputOuter details">
                      <div className="label-small left">* Discount type</div>
                      <select name="discounttype" value={this.state.discounttype} onChange={this.handleChange} required>
                        <option value="percentage">Percentage discount</option>
                        <option value="doller">Dollar discount</option>
                      </select>
                    </div>

                    <div className="inputOuter details">
                      <div className="label-small left">* Amount</div>
                      <select value={this.state.discountvalue} name="discountvalue" onChange={this.handleChange} required>
                        {this.renderOptions(this.state.discounttype == "percentage" ? "%" : "Doller")}
                      </select>
                    </div>

                    <div className="inputOuter details">
                      <div className="label-small left">* Expiry date</div>
                       <input type="date" name="expirydate" onChange={this.handleChange} required/>
                    </div>

                    <div className="inputOuter details">
                      <div className="label-small left">* Promotion details</div>
                      <textarea className='full-width' name="promotionDetails" value={this.state.promotionDetails} placeholder={this.state.offerDetails != "" ? '' : "Offer details"} type="text" onChange={this.handleChange} required>
                        {this.state.promotionDetails}
                      </textarea>
                      {/* <input name="address" value={this.state.address != "" ? this.state.address : ''} placeholder={this.state.address != "" ? '' : "Address"} type="text" onChange={this.handleChange} required/> */}
                    </div>

                    <div>
                      <button type="submit" className="button" onClick={this.savePromo}>Save</button>
                    </div>

                  </form>
                </div>
              </center>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
