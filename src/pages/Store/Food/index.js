import React, { Component } from 'react';
import Loader from '../../components/simpleloader'
import Navigation from '../navigation'
import Title_head from './../page_title_head'
import Header from '../header'
// import Footer from './../footer'
import { Row, Col, Card } from 'react-bootstrap';
import Notifications, { notify } from 'react-notify-toast';
import ApiService from './../../../services/api'
import * as config from './../../../utilities/config'
import Food_card from './food_card'
import Switch from "react-switch";
import Rating from './rating_star'
import Add_to_cart from './cart_modal'
import './food.css'
import {AddToCart, clearCart} from './Cart'

let path = window.location.pathname
let storeName = path.split('/')[1];
let userdata = JSON.parse(localStorage.getItem('guest-userdata'))

export default class Foods extends Component {

  state = {
    storeDetails: [],
    loading: true,
    vegonly: false,
    menuList: [],
    itemList: [],
    selected: '',
    glutenfree: false,
    cartModal: false,
    selectedFoodData: {},
    cardAlert: false, 
    errorAlert: false
  }

  handleChange = (checked) => {
    this.setState({vegonly: checked}, () => {
  
      this.state.selected != "" ? 
        this.menuSelect(this.state.selected) :
        this.fetchFoods()
    })
  }
  handleChangeGluten = (checked) => {
    this.setState({glutenfree: checked}, () => {
      this.state.selected != "" ? 
        this.menuSelect(this.state.selected) :
        this.fetchFoods()
    })
  }

  fetchMenu = () => {
    let userid = this.state.storeDetails.businessid
    
    ApiService.fetchmenuData(userid)
    .then(res => res.json())
    .then(response => {
      this.setState({menuList: response.menu}, () => {
        this.fetchFoods()
      })
    })
  }

  fetchFoods = () => {
    let userid = this.state.storeDetails.businessid
    let isVeg = this.state.vegonly
    let glutenFree = this.state.glutenfree
    ApiService.fetchmenuitemData(userid, isVeg, glutenFree)
    .then(res => res.json())
    .then(response => {
      this.setState({itemList: response.menu})
    })
  }

  cardLoop = () => {
    let cards = []
    for(var i=0; i < 3; i++) {
      cards.push(
        <Col lg={4} md={4} sm={6} xs={6}>
          <Food_card />
        </Col>
      )
    }
   return cards
  }

  menuSelect = (menuid) => {
    this.setState({loading: true})
    ApiService.getItems(menuid, 0, 0, null, this.state.vegonly, this.state.glutenfree)
    .then(res => res.json())
    .then(response => {
      this.setState({itemList: response.menu, loading: false, selected: menuid})
    })
  }

  componentDidMount() {
      ApiService.getBusinessProfbyUrl(storeName)
        .then(res => res.json())
        .then(response => {
          if (response.status == 200) {
            this.setState({
              storeDetails: response.response,
              loading: false
            }, () => { 
              this.fetchMenu()
              this.fetchFoods()
            })
          } else {
            this.props.history.push('/')
          }
        })
        .catch(function (error) {
          console.log('err', error)
        })
    }

  addToCart = (data) => {
    let guestdata = JSON.parse(localStorage.getItem('guest-userdata'))
    if(guestdata == null) {
      alert('You have to login')   
    } else {
    let userid = guestdata._id
    //Initializing cart session
    let item = {
      itemid: data._id,
      itemname: data.itemtitle,
      itemprice: data.itemcost,
      itemdescription: data.itemdescription,
      ingredients: data.ingredients,
      selectedIngredients: [],
      ingredientPrice: 0,
      count: this.state[data._id],
      status: 'ORDERED'
    }
    
    AddToCart(userid, item).then(res => {
      window.location.hash = "foodMenu"
      this.setState({
        cardAlert: true,
        errorAlert: false,
        alertText: "Added to cart successfully"
      }, () => setTimeout(() => {this.setState({cardAlert: false}) }, 3000))
    }, (err) => {
        window.location.hash = "foodMenu"
        this.setState({errorAlert: true, cardAlert: false, alertText: 'item is already on cart'}, () => {
          setTimeout(() => {this.setState({errorAlert: false}) }, 3000)
        })
    })
   }
 
  }
  
  closeCartModal = () => {
    this.setState({cartModal: false})
  }

  render() {

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
           <Title_head title="Menu" fa_icon_class="far fa-id-badge" hasRightmenu={true} showcart={true} />
           <Loader loading={this.state.loading} background='no-fill' />
           <Add_to_cart show={this.state.cartModal} data={this.state.selectedFoodData} close={this.closeCartModal}/>
           <div className="food-container">
              <Row>
                <Col lg={3} md={3} sm={0} xs={0} className="food-left-sidebar">
                  <div className="menu-head"> <i className="fal fa-french-fries"></i> Food menus</div>
                  <div className="menu-list">
                    
                      {this.state.menuList.map(data => {
                        return (
                          <div className={this.state.selected == data._id ? `menu-active animated pulse ` : 'menu'} key={data.createdAt} onClick={() => this.menuSelect(data._id)}>{data.title} ></div>
                        )
                      })} 
                 
                  </div>
                </Col>

                <Col lg={9} md={9} sm={12} xs={12} className="food-item-container">
                

                <div className="filter-tab" id="foodMenu">
                  
                  <label htmlFor="material-switch" style={{marginBottom: 0, marginRight: 20}}>
                  <div className="veg-lable">VEG ONLY </div>
                  <Switch   
                   onChange={this.handleChange} 
                   checked={this.state.vegonly} 
                   onColor="#86d3ff"
                    onHandleColor="#2693e6"
                    handleDiameter={25}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                    height={15}
                    width={40}
                    className="react-switch"
                    id="material-switch"
                   />
                   </label>

                   <label htmlFor="material-switch" style={{marginBottom: 0}}>
                  <div className="veg-lable">Gluten Free </div>
                  <Switch   
                   onChange={this.handleChangeGluten} 
                   checked={this.state.glutenfree} 
                   onColor="#86d3ff"
                    onHandleColor="#2693e6"
                    handleDiameter={25}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                    height={15}
                    width={40}
                    className="react-switch"
                    id="material-switch"
                   />
                   </label>


                </div>
                {this.state.cardAlert && <div className="inline added-to-cart animated fadeIn">
                 <i className="fas fa-check"></i> {this.state.alertText} <div style={{color: 'blue', cursor: 'pointer'}} onClick={() => this.props.history.push('mycart')}>View cart</div>
                </div>}
                {this.state.errorAlert && <div className="inline error-alert animated fadeIn">
                <i className="fas fa-times"></i> {this.state.alertText}
                </div>}
                <div className="food-list">
                {this.state.itemList.length != 0 ?
                  this.state.itemList.map(data => {
                  if(data.is_active == true)
                  return (
                  <div key={data._id} className="food-item">
                    <div className={data.is_veg === true ? `inline veg` : `inline non-veg`}></div>
                    <div className="inline item">{data.itemtitle}</div>
                    {/* <div className="inline rating"><Rating /></div>  */}
                    
                    <div className="inline food-description">{data.itemdescription}</div>
                    <div className={this.state[data._id] > 0 ? `inline order-now` : `inline order-now inactive-btn animatedf`} onClick={() => this.state[data._id] > 0 ? this.addToCart(data) : this.setState({[data._id]: 1})}>Add</div>
                    <div className={this.state[data._id] ? "cart-counter" : "cart-counter animated swing"}>
                    <div className="inline counter-up"  onClick={() => this.setState({[data._id]: this.state[data._id] != 0 ? (this.state[data._id] - 1) : 0 })}>-</div>
                    <div className="inline "><input value={this.state[data._id] ? this.state[data._id] : 0} disabled className="counter-input animated swing"/></div>
                    <div className="inline counter-down" onClick={() => this.setState({[data._id]: (this.state[data._id] = this.state[data._id] || 0)  + 1 })}>+</div>
                    </div>
                  <div className="inline price">${data.itemcost}</div> 
                  </div>)
                  }) :

                <div className="no-item">
                  <h2>No items found</h2>
                </div>
              
              }
                </div>

                </Col>
            </Row>

      
           </div>
           <Navigation 
            nav = {this.props.history}
            store= {storeName}
            storeData = {this.state.storeDetails}
           />
           {/* <Footer /> */}
      </div>
    );
  }
}
