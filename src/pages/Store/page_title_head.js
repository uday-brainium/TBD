import React, { Component } from 'react';
import { withRouter } from "react-router-dom"
import {clearCart} from './../Store/Food/Cart'
import './Food/food.css'

 class Page_title extends Component {
  
  state = {
    username: ''
  }

  componentDidMount() {
    let user = JSON.parse(localStorage.getItem('guest-userdata'))
    if(user)
     this.setState({username: user.firstname})
  }

  action = (type) => {
    if(type == 'Login') {
      this.props.history.push('login')
    } else {
      localStorage.setItem('guest-userdata', null)
      localStorage.setItem('cart', JSON.stringify({cart: []}))
      this.props.history.push('login')
    }
  }

  cartCount = () => {
    let cart  = JSON.parse(localStorage.getItem('cart'))
     if(cart !== null) {
       console.log('cart', cart);
       
      return cart.cart.length
     } else {
       return 0
     }
  }

  cartPage = () => {
    this.props.history.push('mycart')
  }

  render() {    
    return (
     <div>
        <div className="heading">
          <i className={this.props.fa_icon_class}></i> {this.props.title} 
          {this.props.hasRightmenu &&
          <span>
            <div onClick={() => this.action(this.state.username ? 'Logout' : 'Login')} className="right-menu">
            <i className="fas fa-sign-out-alt"></i> {this.state.username ? 'Logout' : 'Login'}
            </div>
            {this.state.username && <div className="right-menu">
            <i className="fas fa-user"></i> {this.state.username}
          </div> }
            {this.props.showcart && 
             <div className="right-menu" onClick={this.cartPage}>
              <i className="fas fa-shopping-cart"></i>
               <span className="cart-badge">
                <span className="cart-count">{this.cartCount()}</span>
               </span>
            </div>
            }
          </span>
          }   
        </div>
        
     </div>
    );
  }
}

export default withRouter(Page_title)