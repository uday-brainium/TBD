import React, { Component } from 'react';
import { withRouter } from "react-router-dom"
import Navigation from './../../navigation'
import Title_head from './../../page_title_head'
import Header from './../../header'
import Footer from './../../footer'
import { Row, Col, Card } from 'react-bootstrap';
import Notifications, { notify } from 'react-notify-toast';
import ApiService from './../../../../services/api'
import Loader from './../../../components/simpleloader'
import { removeItem, updateCart } from './../Cart/index'
import Modify_modal from './modify_modal'
import Delivery_modal from './delivery_pop'
import './cart.css'
import Promotion from './promotion'

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
    hidePromos: false
  }

  getCartDetails = () => {
    let cart = JSON.parse(localStorage.getItem('cart'))
    if(cart == null) {
      this.setState({cart: []})
    } else {
      this.setState({cart: cart.cart})
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
  }

  fetchPromoCodes = () => {
    ApiService.get_promocodes(user.businessid)
    .then(res => res.json())
    .then(response => {
      if(response.status == 200)
        this.setState({promoList: response.response})
    })
  }

  getTotalCartPrice = () => {
    const {cart} = this.state
      
      cart.map((data, i) => {
        totalPrice =+ (data.itemprice * data.count)
      })
      this.setState({test: true})
  }

  cartDecriment = (data) => {
    this.setState({
      [data.itemid]: this.state[data.itemid] > 1 ?  (this.state[data.itemid] - 1) : this.state[data.itemid] == NaN ?  1 : data.count
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
      [data.itemid]: (this.state[data.itemid] = this.state[data.itemid] || data.count)  + 1 
    },  () => {
      let item = {
        itemid: data.itemid,
        itemname: data.itemname,
        itemprice: data.itemprice,
        itemdescription: data.itemdescription,
        count: this.state[data.itemid],
        status: 'ORDERED'
      }
      updateCart(item).then( () => {
        this.getCartDetails()
      })
 
    })
  }

  removeCart = (itemid) => {
    totalPrice = 0
    removeItem(itemid)
    this.setState({deletedid: itemid}, () => {
      setTimeout(() => {
        this.getCartDetails()
      }, 1000)
    })
  }

  openModal = (data) => {
    this.setState({modifyModal: true, modifyItem: data})
  }

  placeOrderClick = () => {
    this.setState({deliveryModal: true})
  }

  saveOrder = (deliveryAddress) => {
    this.setState({loading: true})
    let {cart, promoDiscount} = this.state
    const userid = user._id
    const businessId = user.businessid
   
    ApiService.add_order(userid, deliveryAddress, promoDiscount, businessId, cart)
    .then(res => res.json())
    .then(response => {
      if(response.status == 200) {
         //remove all cart items 
      localStorage.setItem('cart', JSON.stringify({cart: []}))
      this.setState({cart: []}, () => {
       // localStorage.setItem('guest-userdata', JSON.stringify(response.response))
        this.getCartDetails()
        this.setState({orderplaced: true, deliveryModal: false, promoDiscount: 0, loading: false})
      })
      }
      //Update userdate
    })
  }

  closeModifyModal = () => {
    this.setState({modifyModal: false})
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
    this.setState({promoDiscount: discount, hidePromos: true})

  }


  render() {

    const {cart, promoDiscount} = this.state
    totalPrice = 0 
     let price = cart.map((data, i) => {
      return totalPrice = totalPrice + (parseInt(data.itemprice) * data.count)
    })
    const overAllPrice = JSON.parse(totalPrice) + JSON.parse(this.ingredientsTotal()) - promoDiscount
    console.log((overAllPrice));
    
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
          placeOrder={(deliveryAddress) => this.saveOrder(deliveryAddress)} 
          show={this.state.deliveryModal} userdata={user} 
          close={() => this.setState({deliveryModal: false})} 
          overallPrice = {overAllPrice}
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
                <Col>${ data.itemprice }</Col>
    
                <Col>
                  <div className={this.state[data.itemid] ? "cart-counter" : "cart-counter animated swing"}>
                    <div className="inline counter-up"  onClick={() => this.cartDecriment(data)}>-</div>
                    <div className="inline "><input value={this.state[data.itemid] ? this.state[data.itemid] : data.count} disabled className="counter-input animated swing"/></div>
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
         
          </Col>

          <Col lg={4} md={4} sm={4} xs={12}>
            <div className="cart-total-container">
              <div className="cart-total-head">Cart total</div>
              <div className="left-amount">
                Total items : {cart.length} items
              </div>
              <div className="left-amount">
                Total amount : ${overAllPrice}
              </div>

              {!this.state.hidePromos ?
                this.state.promoList.map(data => (
                    <Promotion key={data._id} promo={data} onApply={(promo) => this.applyPromocode(promo)} />
                )) :
                <div className="applied">Promocode applied successfully</div>
              }
              
              <button onClick={this.placeOrderClick} disabled={cart.length == 0 ? true : false} className="place-order">
                Place order
              </button>
            </div>
          </Col>
        </Row>
        </div>
      <Navigation 
        nav = {this.props.history}
        store= {storeName}
        storeData = {this.state.storeDetails}
      />
      <Footer />
      </div>
    );
  }
}

export default withRouter(Cart_page)