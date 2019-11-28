import React, { Component } from 'react';
import { withRouter } from "react-router-dom"
import Navigation from './../../navigation'
import Title_head from './../../page_title_head'
import Header from './../../header'
// import Footer from './../../footer'
import { Row, Col, Card } from 'react-bootstrap';
import Notifications, { notify } from 'react-notify-toast';
import ApiService from './../../../../services/api'
import Loader from './../../../components/simpleloader'
import { removeItem, updateCart } from './../Cart/index'
import Modify_modal from './modify_modal'
import Delivery_modal from './delivery_pop'
import './cart.css'
import Promotion from './promotion'
import { isBirthday } from './../../../components/isBirthday'
import { Base_url } from './../../../../utilities/config'

const path = window.location.pathname
const storeName = path.split('/')[1];
const user = JSON.parse(localStorage.getItem('guest-userdata'))

let totalPrice = 0

class Cart_page extends Component {

  state = {
    storeDetails: {},
    loading: false,
    cart: [],
    deletedid: '',
    modifyModal: false,
    deliveryModal: false,
    modifyItem: {},
    promoList: [],
    promoDiscount: 0,
    hidePromos: false,
    birthdayBanner: '',
    deliverOption: false,
    pickup: true,
    foodChargeAmount: 0,
    foodChargeType: ''
  }

  getCartDetails = () => {
    let cart = JSON.parse(localStorage.getItem('cart'))
    if (cart == null) {
      this.setState({ cart: [] })
    } else {
      this.setState({ cart: cart.cart })
    }
  }

  componentDidMount() {
    this.getCartDetails()
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
    this.fetchPromoCodes()
    this.update_stripe_secret()
  }

  update_stripe_secret = () => {
    const sKey = localStorage.getItem('stripe_secret_key')
    
    if (sKey == null) {
      ApiService.get_keys()
        .then(res => {
          if (res.status == 200) {
            const secret = res.response.selectedKey.secret
            localStorage.setItem('stripe_secret_key', JSON.stringify(secret))
            window.location.reload()
          }
        })
    }
    this.fetch_fees()
  }


  fetch_fees = () => {
    ApiService.get_keys()
    .then(res => {
     const value = res.response.feeForFood.amount
     const type = res.response.feeForFood.type
      this.setState({
        foodChargeAmount: value,
        foodChargeType: type 
      })
    })
  }

  birthdayPromo = async () => {
    const isBday = isBirthday()
    if (isBday) {
      ApiService.birthday_promo_fetch(user.businessid)
        .then(res => res.json())
        .then(response => {
          const bdayObj = {
            birthday: true,
            promocode: 'HAPPYBIRTHDAY',
            banner: response.response.bannerimage,
            details: response.response.details,
            discounttype: response.response.type,
            discountvalue: response.response.discount
          }
          this.state.promoList.push(bdayObj)
          this.setState({ birthdayBanner: response.response.bannerimage })
        })
    }

  }

  fetchPromoCodes = () => {
    ApiService.get_promocodes(user.businessid)
      .then(res => res.json())
      .then(response => {
        if (response.status == 200)
          this.setState({ promoList: response.response }, () => {
            this.birthdayPromo()
            console.log(this.state.promoList);

          })
      })
  }

  getTotalCartPrice = () => {
    const { cart } = this.state

    cart.map((data, i) => {
      totalPrice = + (data.itemprice * data.count)
    })
    this.setState({ test: true })
  }

  cartDecriment = (data) => {
    this.setState({
      [data.itemid]: this.state[data.itemid] > 1 ? (this.state[data.itemid] - 1) : this.state[data.itemid] == NaN ? 1 : data.count
    }, () => {
      let item = {
        itemid: data.itemid,
        itemname: data.itemname,
        itemprice: data.itemprice,
        itemdescription: data.itemdescription,
        count: this.state[data.itemid],
        status: 'ORDERED'
      }
      updateCart(item).then(() => {
        this.getCartDetails()
      })
    })
  }

  cartIncriment = (data) => {
    this.setState({
      [data.itemid]: (this.state[data.itemid] = this.state[data.itemid] || data.count) + 1
    }, () => {
      let item = {
        itemid: data.itemid,
        itemname: data.itemname,
        itemprice: data.itemprice,
        itemdescription: data.itemdescription,
        count: this.state[data.itemid],
        status: 'ORDERED'
      }
      updateCart(item).then(() => {
        this.getCartDetails()
      })

    })
  }

  removeCart = (itemid) => {
    totalPrice = 0
    removeItem(itemid)
    this.setState({ deletedid: itemid }, () => {
      setTimeout(() => {
        this.getCartDetails()
      }, 1000)
    })
  }

  openModal = (data) => {
    this.setState({ modifyModal: true, modifyItem: data })
  }

  placeOrderClick = () => {
    this.setState({ deliveryModal: true })
  }

  saveOrder = (deliveryAddress, paymentObj) => {
    //  console.log("PAYMENT-OBJ", paymentObj);

    this.setState({ loading: true })
    let { cart, promoDiscount, storeDetails } = this.state
    const userid = user._id
    const businessId = storeDetails.businessid

    ApiService.add_order(userid, deliveryAddress, promoDiscount, businessId, cart, paymentObj)
      .then(res => res.json())
      .then(response => {
        if (response.status == 200) {
          //remove all cart items 
          localStorage.setItem('cart', JSON.stringify({ cart: [] }))
          this.setState({ cart: [] }, () => {
            // localStorage.setItem('guest-userdata', JSON.stringify(response.response))
            this.getCartDetails()
            this.setState({ orderplaced: true, deliveryModal: false, promoDiscount: 0, loading: false })
          })
        }
        //Update userdate
      })
  }

  closeModifyModal = () => {
    this.setState({ modifyModal: false })
    this.getCartDetails()
  }

  ingredientsTotal = () => {
    let total = 0
    this.state.cart.map(data => {
      total = total + JSON.parse(data.ingredientPrice)
    })
    return total.toFixed(2)
  }

  applyPromocode = async (promo) => {
    const amount = promo.discountvalue
    const type = promo.discounttype

    const cartTotal = JSON.parse(totalPrice) + JSON.parse(this.ingredientsTotal())
    const discount = await type === 'doller' ? (amount) : ((cartTotal * amount / 100))
    this.setState({ promoDiscount: discount, hidePromos: true })

  }

  handleChange = (e) => {
    const value = e.target.value
    const name = e.target.name

    if (name == "deliverOption" && value == 'on') {
      this.setState({ deliverOption: true, pickup: false })
    } else if (name == "pickup" && value == 'on') {
      this.setState({ deliverOption: false, pickup: true })
    }
  }

  ChargesForFreeMember = (totalprice) => {
    let chargeToAdd = 0
    const {foodChargeAmount, foodChargeType} = this.state
     if(foodChargeType == 'Percent') {
        chargeToAdd = (foodChargeAmount * totalPrice / 100)
     } else {
        chargeToAdd = foodChargeAmount
     }
    return chargeToAdd
  }

  render() { 
    const { cart, promoDiscount, storeDetails, deliverOption } = this.state
    totalPrice = 0
    let price = cart.map((data, i) => {
      return totalPrice = totalPrice + (parseInt(data.itemprice) * data.count)
    })
    const memberShipType = user.membership_type
    const silverMemberDiscount = storeDetails.members_service ? storeDetails.members_service.silvermember.discount : 0
    const goldMemberDiscount = storeDetails.members_service ? storeDetails.members_service.goldmember.discount : 0  
  
    const deliveryOption = storeDetails.fooddelivery ? storeDetails.fooddelivery : ''
    const delivaryCharge = storeDetails.fooddeliverycharge ? storeDetails.fooddeliverycharge : ''
    // const overAllPrice = JSON.parse(totalPrice) + JSON.parse(this.ingredientsTotal()) - promoDiscount + JSON.parse(deliveryOption == true && deliverOption == true ? delivaryCharge : 0)
    
    const overAllPriceWithoutDelivery = JSON.parse(totalPrice) + JSON.parse(this.ingredientsTotal()) - promoDiscount
    const discountedPrice = memberShipType == 'Silver' ? ((silverMemberDiscount * overAllPriceWithoutDelivery) / 100) : memberShipType == 'Gold' ? ((goldMemberDiscount * overAllPriceWithoutDelivery) / 100) : 0

    const chargesForFreeMember = memberShipType == 'Free' ? this.ChargesForFreeMember(overAllPriceWithoutDelivery) : 0

    const overAllPrice = JSON.parse(totalPrice) + JSON.parse(this.ingredientsTotal()) - promoDiscount + JSON.parse(deliveryOption == true && deliverOption == true ? delivaryCharge : 0) - discountedPrice + parseInt(chargesForFreeMember)

   // console.log("STORE-DISCOUNT",this.ChargesForFreeMember(overAllPriceWithoutDelivery));
    console.log("Tes", memberShipType);
    
    return (
      <div>
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
        <Notifications />
        <Title_head title="Cart" fa_icon_class="far fa-id-badge" hasRightmenu={true} showcart={true} />
        <Loader loading={this.state.loading} background='no-fill' />
        <Modify_modal show={this.state.modifyModal} close={() => this.closeModifyModal()} item={this.state.modifyItem} />
        <Delivery_modal
          placeOrder={(deliveryAddress, payment) => this.saveOrder(deliveryAddress, payment)}
          show={this.state.deliveryModal} userdata={user}
          close={() => this.setState({ deliveryModal: false })}
          overallPrice={overAllPrice}
          isDelivery = {deliverOption}
        />
        <div className="cart-page-container">
          <Row>
            <Col lg={8} md={8} sm={8} xs={12}>

              {!this.state.orderplaced ? <div className="cart-container">
                <Row className="cart-header">
                  <Col> Item </Col>
                  <Col> Price </Col>
                  <Col> Quantitiy </Col>
                  <Col> Subtotal </Col>
                  <Col> Action </Col>
                </Row>
                <div className="line"></div>
                {this.state.cart.length > 0 ?
                  this.state.cart.map(data => {
                    return (
                      <Row key={data.itemid} className={data.itemid == this.state.deletedid ? "product-row animated lightSpeedOut" : 'product-row'}>
                        <Col className="cart-item-title">
                          <div><i className="fas fa-hamburger"></i> {data.itemname}</div>
                          <div className="item-description"> - {data.itemdescription}</div>
                        </Col>
                        <Col>${data.itemprice}</Col>

                        <Col>
                          <div className={this.state[data.itemid] ? "cart-counter" : "cart-counter animated swing"}>
                            <div className="inline counter-up" onClick={() => this.cartDecriment(data)}>-</div>
                            <div className="inline "><input value={this.state[data.itemid] ? this.state[data.itemid] : data.count} disabled className="counter-input animated swing" /></div>
                            <div className="inline counter-down" onClick={() => this.cartIncriment(data)}>+</div>
                          </div>
                        </Col>

                        <Col>${JSON.parse(data.itemprice) * (this.state[data.itemid] == null ? data.count : this.state[data.itemid]) + JSON.parse(data.ingredientPrice)}</Col>
                        <Col>
                          <span>
                            <button className=" btn-success small cart-modify" onClick={() => this.openModal(data)}>Modify</button>
                            <button className=" btn-danger small cart-remove" onClick={() => this.removeCart(data.itemid)}>Remove</button>
                          </span>
                        </Col>
                      </Row>
                    )
                  }) : <div className="cart-empty">Your cart is empty !</div>}
                <button onClick={() => this.props.history.push('foods')} className="back-to-menu"> Back to food menu</button>
              </div> :
                <h2 className="order-placed">Order placed successfully.</h2>
              }

              {isBirthday() == true &&
                <div className="birthday-banner-container">
                  <div className="birthday-head">Happy Birthday {user.firstname}</div>
                  <div className="birthday-sub">We have added a spacial discount promocode for you</div>
                  <img src={`${Base_url}/${this.state.birthdayBanner}`} />
                </div>
              }
            </Col>

            <Col lg={4} md={4} sm={4} xs={12}>
              <div className="cart-total-container">
                <div className="cart-total-head">Cart total</div>
                <div className="left-amount">
                  Total items : {cart.length} items
              </div>
              {this.state.deliverOption &&
                <div className="left-amount">
                  Delivery charge : ${delivaryCharge}
                </div>
              }
                {memberShipType == "Silver" || memberShipType == 'Gold' ?
                 <div className="left-amount">
                  member discount : ${discountedPrice}
                </div> : ''}

                {memberShipType == "Free" &&
                  <div className="left-amount">
                    Service charge : ${chargesForFreeMember}
                  </div>
                }

                <div className="left-amount">
                  Total amount : ${overAllPrice}
                </div>



                {!this.state.hidePromos ?
                  this.state.promoList.reverse().map(data => (
                    <Promotion key={data._id} promo={data} onApply={(promo) => this.applyPromocode(promo)} />
                  )) :
                  <div className="applied">Promocode applied successfully</div>
                }

                <div style={{ marginTop: 25, textAlign: 'left' }}>
                  {deliveryOption == true &&
                    <label className="checkbox-react" style={{ marginTop: 10 }}>Deliver this item <span style={{ fontSize: 10, fontWeight: 'bold' }}>( Delivery charges may apply )</span>
                      <input type="checkbox" name="deliverOption" defaultChecked={this.state.deliverOption} checked={this.state.deliverOption} onChange={this.handleChange} />
                      <span className="checkmark"></span>
                    </label>}



                  <label className="checkbox-react" style={{ marginTop: 10 }}>Pickup from store
                  <input type="checkbox" name="pickup" defaultChecked={this.state.pickup} checked={this.state.pickup} onChange={this.handleChange} />
                    <span className="checkmark"></span>
                  </label>

                </div>

                <button onClick={this.placeOrderClick} disabled={cart.length == 0 ? true : false} className="place-order">
                  Place order
                </button>
              </div>
            </Col>
          </Row>
        </div>
        <Navigation
          nav={this.props.history}
          store={storeName}
          storeData={this.state.storeDetails}
        />
        {/* <Footer /> */}
      </div>
    );
  }
}

export default withRouter(Cart_page)