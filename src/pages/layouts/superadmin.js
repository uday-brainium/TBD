import React, { Component } from "react"
import ReactDOM from 'react-dom'
import { Route, Link, Redirect, withRouter } from "react-router-dom"
import {
  Container,
  Row,
  Col,
  Nav
} from 'reactstrap'
import Notifications, { notify } from 'react-notify-toast'

// import AdminHeaderView from '../views/adminheader'
// import AdminLeftMenuView from '../views/adminmenu'
import FooterView from '../views/footer'

// api service
import ApiService from '../../services/api'

import logo from '../../images/logo.png'
import logo2 from '../../images/logo2.png'
import userImage from '../../images/user.png'
import noUserImage from './../../images/profile-no-image.jpg'
import './styles.css'

class SuperAdminLayout extends Component {
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.toggleSideMenu = this.toggleSideMenu.bind(this)
    this.hideOverlay = this.hideOverlay.bind(this)
    this.logout = this.logout.bind(this)
    this.scrollHandler = this.scrollHandler.bind(this)
    this.sideMenuLinkClicked = this.sideMenuLinkClicked.bind(this)
    this.updateProfilePicture = this.updateProfilePicture.bind(this)
    // this.eventHandler = this.eventHandler.bind(this)

    this.state = {
      userData: {},
      storeUrl: '',
      isOpen: false,
      transform: '',
      overlayStyle: {
        display: 'none'
      },
      tokenPresent: false,
      redirectedHome: false,
      fixedTopBar: false,
      // fixed top bar
      fixedHeaderClass: 'indexHeader',
      fixedHeaderStyle: { 'position': 'static' },
      // settings menu
      elementClass: 'hamburgerAL',
      menuBodystyle: {
        'display': 'none'
      },
      // menu icon
      menuWrapper: '',
      sliderMenuToggle: '',
      // side menu
      menuClassName: 'leftSide',
      menuUserDiv: {
        'display': 'none'
      },
      logoImage: '',
      // user related data
      userName: '',
      // collapse related data
      showEditProfileSubMenu: false,
      editProfileSubMenuStyle: {
        display: 'none'
      },
      editProfileIcon: 'down-arrow',
      showBusinessProfileSubMenu: false,
      editBusinessSubMenuStyle: {
        display: 'none'
      },
      editBusinessProfileIcon: 'down-arrow',
      // profile picture
      profilePicture: '',
      // business profile set
      businessProfileSet: false,
      businessProfileId: ''
    }
  }

  componentDidMount() {
     console.log('token', localStorage.getItem('sa-authtoken'))

    if (localStorage.getItem('sa-authtoken') !== null) {
      this.setState({
        tokenPresent: true
      })
    

    if (localStorage.getItem('sa-username') !== null) {
        this.setState({
          userName: localStorage.getItem('sa-username')
        })
    }
    let data = localStorage.getItem('sa-userdata')
    //let url = JSON.parse(data).data.url
   // this.setState({ userData: JSON.parse(data) })
 //   this.setState({ storeUrl: url })
    // set logo image
    if (window.innerWidth < 767) {
      this.setState({
        logoImage: logo,
        menuBodystyle: {
          'display': 'none'
        },
        menuWrapper: 'setUser',
        sliderMenuToggle: 'sideMenuToggle'
      })
    }
    else {
      this.setState({
        logoImage: logo2,
        menuBodystyle: {
          'display': 'none'
        },
        menuWrapper: 'setUserD'
      })
    }

    // set profile picture
    this.updateProfilePicture()

    // chek if the business profile is set
    if (localStorage.getItem('business-profile-id') !== null) {
      this.setState({
        businessProfileSet: true,
        businessProfileId: localStorage.getItem('business-profile-id')
      })
    }
    else {
      this.setState({
        businessProfileSet: false
      })
    }
  } else {
    <Redirect to='/sa_login' />
    this.props.history.push('/sa_login')
  }
    // scroll handler
    window.addEventListener('scroll', this.scrollHandler, { passive: true })
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollHandler)
  }

  componentDidUpdate() {
    // this.updateProfilePicture()
  }

  updateProfilePicture() {
    let userProfilePicture = localStorage.getItem('profile-image-path')
    if (userProfilePicture != null || userProfilePicture != ' ') {
      this.setState({
        profilePicture: userProfilePicture
      })
    }
    else {
      this.setState({
        profilePicture: noUserImage
      })
    }
  }

  // toggle settings menu
  toggle() {
    if (this.state.popoverOpen) {
      this.setState({
        popoverOpen: !this.state.popoverOpen,
        elementClass: 'hamburgerAL',
        menuBodystyle: {
          'display': 'none'
        }
      });
    }
    else {
      this.setState({
        popoverOpen: !this.state.popoverOpen,
        elementClass: 'hamburgerAL spine',
        menuBodystyle: {
          'display': 'flex'
        }
      });
    }
  }

  // link clicked on settings menu
  popoverLinkClicked(page) {
    this.toggle()
    if (page === 'profile') {
      this.props.history.push('/viewprofile')
    }
  }

  // scroll handler
  scrollHandler() {
    var bodyLength = window.innerHeight
    var headerLength = 220
    if (bodyLength > 0) {
      if (window.scrollY > headerLength) {
        this.setState({
          fixedTopBar: true,
          fixedHeaderClass: 'indexHeader fixed',
          fixedHeaderStyle: { 'position': 'fixed' }
        })
      }
      else {
        this.setState({
          fixedTopBar: false,
          fixedHeaderClass: 'indexHeader',
          fixedHeaderStyle: { 'position': 'static' }
        })
      }
    }

    if (bodyLength === 0) {
      if (window.scrollY > headerLength / 2) {
        this.setState({
          fixedTopBar: true
        })
      }
      else {
        this.setState({
          fixedTopBar: false
        })
      }
    }

    this.setState({
      menuLinkClicked: false
    })
  }

  // side menu opening function
  toggleSideMenu() {
    if (this.state.leftMenuOpen) {
      this.setState({
        leftMenuOpen: false,
        overlayStyle: {
          display: 'none'
        },
        menuClassName: 'leftSide',
        menuUserDiv: {
          'display': 'none'
        },
      })
    }
    else {
      this.setState({
        leftMenuOpen: true,
        overlayStyle: {
          display: 'block'
        },
        menuClassName: 'leftSide push',
        menuUserDiv: {
          'display': 'flex'
        },
      })
    }
  }

  // sidemenu link clicked
  sideMenuLinkClicked(location) {
    this.hideOverlay()

    let path = '/' + location
    this.props.history.push(path)
  }

  // overlay hide function
  hideOverlay() {
    this.setState({
      leftMenuOpen: false,
      overlayStyle: {
        display: 'none'
      },
      menuClassName: 'leftSide',
      menuUserDiv: {
        'display': 'none'
      }
    })
  }

  // dropdown in left menu
  showSubMenu(place) {
    if (place === 'edit-profile') {
      if (this.state.showEditProfileSubMenu) {
        this.setState({
          showEditProfileSubMenu: false,
          editProfileSubMenuStyle: {
            display: 'none'
          },
          editProfileIcon: 'down-arrow'
        })
      }
      else {
        this.setState({
          showEditProfileSubMenu: true,
          editProfileSubMenuStyle: {
            display: 'block'
          },
          editProfileIcon: 'down-arrow up'
        })
      }
    }

    if (place === 'business-profile') {
      if (this.state.showBusinessProfileSubMenu) {
        this.setState({
          showBusinessProfileSubMenu: false,
          editBusinessSubMenuStyle: {
            display: 'none'
          },
          editBusinessProfileIcon: 'down-arrow'
        })
      }
      else {
        this.setState({
          showBusinessProfileSubMenu: true,
          editBusinessSubMenuStyle: {
            display: 'block'
          },
          editBusinessProfileIcon: 'down-arrow up'
        })
      }
    }
  }

  // logout
  logout() {
        localStorage.removeItem('sa-authtoken')
        localStorage.removeItem('sa-username')
        localStorage.removeItem('sa-userdata')
        
        this.props.history.push('/sa_login')
        // this.setState({
        //   redirectedHome: true
        // })
    }


  render() {

    let data = this.state.userData

    // component to be rendered
    const DisplayComp = this.props.component

    // business profile id
    var BusinessProfileLink
    if (this.state.businessProfileSet) {
      BusinessProfileLink = 'edit-business-profile/'
    }
    else {
      BusinessProfileLink = 'add-business-profile/'
    }

    if (!this.state.tokenPresent) {
      // console.log(this.state.tokenPresent)
      {/* <Redirect to="/login" /> */ }
      return (
        <div>
          <h3>Not Authorized</h3>
        </div>
      )
    }
    else if (this.state.redirectedHome) {
      return <Redirect to='/' />
    }
    else {
      // console.log(this.state.leftMenuOpen);
      return (
        <div className="adminLayout" id="adminLayout">
          <div className="overlay" style={this.state.overlayStyle} onClick={this.hideOverlay}></div>
          {/* <AdminHeaderView fixedTopBar={this.state.fixedTopBar} displaySideMenu={this.toggleSideMenu} logout={this.logout} /> */}
          <div className="innerBody">
            <header className="header innerPage" id="header">
              <Container fluid={true}>
                <Row>
                  <div className="banner">
                    <div className={this.state.fixedHeaderClass} style={this.state.fixedHeaderStyle}>
                      <Container>
                        <Row>
                          <Col sm={12}>
                            <div className="topHeader">
                              <div className="logo">
                                <a href="https://www.google.com/">
                                  <img src="images/logo.png" alt="" />
                                </a>
                              </div>
                              <div className="menuContainer">
                                <div className={this.state.sliderMenuToggle} onClick={this.toggleSideMenu}></div>
                                <div className={this.state.menuWrapper}>
                                  <span className={this.state.elementClass} onClick={this.toggle}>Toggle</span>
                                  {/* <div class="sideMenuToggle"></div> */}
                                  <nav className="navigationAL" style={this.state.menuBodystyle}>
                                    <ul className="primary">
                                      <li><a onClick={this.logout}>Logout</a></li>
                                    </ul>
                                  </nav>
                                  <div className="welcomeUser">

                                    <div className="userName">Welcome : {this.state.userName}</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </Container>
                    </div>
                  </div>
                </Row>
              </Container>
            </header>
          </div>

          <section>
            <div className="innerOuterWrapper">
              <div className="innerWrapper">
                <div className={this.state.menuClassName} ref={"leftSide"}>
                  <div className="logoSideBar">
                    <a><img src={this.state.logoImage} alt="" /></a>
                    <div className="welcomeUser" style={this.state.menuUserDiv}>
                      <div className="userPhoto"><img src={this.state.profilePicture} alt="" /></div>
                      <div className="userName">Welcome, {this.state.userName}</div>
                    </div>
                  </div>
                  <ul className="dashboardMenu">
                      <li><a className="" onClick={(e) => this.sideMenuLinkClicked('sa_main_page')}>Dashboard</a></li>
                      <li><a className="" onClick={(e) => this.sideMenuLinkClicked('sa_reports_page')}>Reports</a></li>
                      <li><a className="" onClick={(e) => this.showSubMenu('sa_dashboard')}> Account Managemen</a></li>
                      <li><a className="" onClick={(e) => this.showSubMenu('sa_dashboard')}> Fees & Charges</a></li>
                      <li><a className="" onClick={(e) => this.showSubMenu('sa_dashboard')}> API Keys</a></li>
                      <li><a className="" onClick={(e) => this.showSubMenu('sa_dashboard')}> Contact Us Page</a></li>
                     
                      <li><a className="" onClick={(e) => this.showSubMenu('business-profile')}>Page settings</a>
                        <span className={this.state.editBusinessProfileIcon} onClick={(e) => this.showSubMenu('business-profile')}></span>
                        <ul style={this.state.editBusinessSubMenuStyle}>
                          <li><a onClick={(e) => this.sideMenuLinkClicked('sa_edit_landing_page')}>Landing page</a></li>
                          <li><a onClick={(e) => this.sideMenuLinkClicked('sa_edit_about')}>About page</a></li>
                          <li><a onClick={(e) => this.sideMenuLinkClicked('sa_contact_messages')}>Contact messages</a></li>
                          <li><a className="" onClick={(e) => this.showSubMenu('sa_dashboard')}> Terms & Privacy Policy</a></li>
                        </ul>
                      </li>
                    
                  </ul>
                </div>
                {/*<AdminLeftMenuView menuDisplayed={this.state.leftMenuOpen} hideOverlay={this.hideOverlay} topBarFixed={this.state.fixedTopBar} menuClicked={this.state.menuLinkClicked} />*/}

                {/* {React.createElement(this.props.component) } */}
                {/* <Route path={this.props.path} component={this.props.component} /> */}
                <DisplayComp profilePicUpdated={this.updateProfilePicture} />
              </div>
            </div>
          </section>
          <FooterView />
        </div>
      )
    }
  }
}

export default withRouter(SuperAdminLayout)
