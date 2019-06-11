import React, { Component } from 'react';
import './../../styles/style_sheet.css'
import './store.css'

export default class Store_navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'settingsButtonClass': 'settingsBtn',
      'settingsClass': 'setings',
      'overlayShowing': false,
      'overlayStyle': {
        'display': 'none'
      },
      'settingsIconClass': '',
    };
  }

  toggleOverlay = () => {
    if (this.state.overlayShowing) {
      this.setState({
        'overlayShowing': false,
        'settingsButtonClass': 'settingsBtn',
        'settingsClass': 'setings',
        'overlayStyle': {
          'display': 'none'
        },
        'settingsIconClass': ''
      })
    }
    else {
      this.setState({
        'overlayShowing': true,
        'settingsClass': 'setings open',
        'settingsButtonClass': 'settingsBtn active',
        'overlayStyle': {
          'display': 'block'
        },
        'settingsIconClass': 'displayed'
      })
    }
  }

  hideOverlay = () => {
    if (this.state.overlayShowing) {
      this.setState({
        'overlayShowing': false,
        'settingsButtonClass': 'settingsBtn',
        'settingsClass': 'setings',
        'overlayStyle': {
          'display': 'none'
        },
        'settingsIconClass': ''
      })
    }
  }

  moveToAdmin = () => {
    this.props.nav.push('/dashboard')
  }
  moveToHome = () => {
    this.props.nav.push(`/${this.props.store}`)
  }

  moveToEvents = () => {
    this.props.nav.push(`/${this.props.store}/events`)
  }

  moveToFood = () => {
   // this.props.nav.push(`/${this.props.store}/foods`)
    this.props.nav.push(`/${this.props.store}/foods`)
  }

  moveToRegister = () => {
    this.props.nav.push(`/${this.props.store}/register`)
  }

  login = () => {
    this.props.nav.push(`/${this.props.store}/login`)
  }

  profile = () => {
    this.props.nav.push(`/${this.props.store}/profile`)
  }


  moveToBookTable = () => {
   // this.props.nav.push(`/${this.props.store}/book_table`)
   this.props.nav.push(`/${this.props.store}/reservation`)
  }

  render() {
    let guest_loggedin = JSON.parse(localStorage.getItem('guest-userdata'))
  
    return (
      <div>
        {this.props.storeData != null &&
        <div>
          <div className={this.state.settingsButtonClass} onClick={this.toggleOverlay}>
          <button>+</button>
        </div>
        <div className={this.state.settingsClass}>
          <ul>
           {localStorage.getItem('user-id') != null && 
           <li onClick={this.moveToAdmin} className={this.state.settingsIconClass}>
              <a className="toadmin">
                <span>
                  Back to admin
                </span>
              </a>
           </li>}
           <li onClick={this.moveToHome} className={this.state.settingsIconClass}>
              <a className="homenav">
                <span>
                  Home
                </span>
              </a>
            </li>
            <li onClick={this.moveToRegister} className={this.state.settingsIconClass}>
              <a className="becomeAmember">
                <span>
                  Become a Member
                </span>
              </a>
            </li>

            {guest_loggedin == null ?
              <li onClick={this.login} className={this.state.settingsIconClass}>
              <a className="login">
                <span>
                  Login
                </span>
              </a>
            </li> : 
            <li onClick={this.profile} className={this.state.settingsIconClass}>
              <a className="profile">
                <span>
                  Profile
                </span>
              </a>
            </li>

            }
            {this.props.storeData.tablereservationservice &&
              <li onClick={this.moveToBookTable} className={this.state.settingsIconClass}>
               <a className="bookAtable">
                <span>
                  Book a Table
                </span>
               </a>
              </li>
            }
            {this.props.storeData.foodpickupservice &&
              <li onClick={this.moveToFood} className={this.state.settingsIconClass}>
               <a className="foodItems">
                <span>
                  Food Items
                </span>
               </a>
              </li>
            }
            
            {this.props.storeData.eventbooking &&
             <li onClick={this.moveToEvents} className={this.state.settingsIconClass}>
              <a className="games">
                <span>Calender / Tickets</span>
              </a>
            </li> }
          </ul>
        </div>
        </div>
        }
        
      </div>
    );
  }
}
