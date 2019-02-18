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
import noUserImage from '../../images/profile-no-image.jpg'


class AdminLayout extends React.Component {
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
        // console.log(this.props.match.params)

        if (localStorage.getItem('access-token-tbd') !== null) {
            this.setState({
                tokenPresent: true
            })
        }

        if (localStorage.getItem('full-name') !== null) {
            this.setState({
                userName: localStorage.getItem('full-name')
            })
        }

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
        if (userProfilePicture !== null) {
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

        /*if(location === 'dashboard'){
            this.props.history.push('/dashboard')
        }
        else if(location === 'change_password'){
            this.props.history.push('/changepassword')
        }
        else if(location === 'menu'){
            this.props.history.push('/menu')
        }
        else if(location === 'orders'){
            this.props.history.push('/orders')
        }
        else{
           // do something
        }*/
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
        try {
            ApiService.logout(localStorage.getItem('access-token-tbd'))
                .then(res => res.json())
                .then(response => {
                    // console.log(response)
                    if (response.success) {
                        // notify.show( response.message, 'success', 3000)
                        //setTimeout(() => {
                        localStorage.removeItem('access-token-tbd')
                        localStorage.removeItem('full-name')
                        localStorage.removeItem('user-id')
                        localStorage.removeItem('profile-image-path')
                        this.setState({
                            redirectedHome: true
                        })
                        // this.props.history.push('/')
                        //}, 4000)
                    }
                    else {
                        // notify.show( response.message, 'error', 5000);
                    }
                })
                .catch(function (error) {
                    console.log(error)
                })
        }
        catch (error) {
            console.log(error)
        }

        /*localStorage.removeItem('access-token-tbd')
        localStorage.removeItem('full-name')
        this.setState({
            redirectedHome: true
        })*/
    }

    render() {
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
                                                                            <li><a onClick={(e) => this.popoverLinkClicked('profile')}>My Profile</a></li>
                                                                            <li><a onClick={this.logout}>Logout</a></li>
                                                                        </ul>
                                                                    </nav>
                                                                    <div className="welcomeUser">
                                                                        <div className="userPhoto"><img src={this.state.profilePicture} alt="" /></div>
                                                                        <div className="userName">Welcome {this.state.userName}</div>
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
                                            <div className="userName">Welcome {this.state.userName}</div>
                                        </div>
                                    </div>
                                    <ul className="dashboardMenu">
                                        <li><a className="" onClick={(e) => this.sideMenuLinkClicked('dashboard')}>Dashboard</a></li>
                                        {/*}<li><a className="" onClick={(e) => this.showSubMenu('edit-profile')}>Edit Profile</a>
                                            <span className={this.state.editProfileIcon} onClick={(e) => this.showSubMenu('edit-profile')}></span>
                                            <ul style={this.state.editProfileSubMenuStyle}>
                                                <li><a className="viewProfile" onClick={(e) => this.sideMenuLinkClicked('dashboard')}>Banner Photo</a></li>
                                                <li><a className="editProfile" onClick={(e) => this.sideMenuLinkClicked('dashboard')}>Menu</a></li>
                                            </ul>
                                        </li>*/}
                                        <li><a className="" onClick={(e) => this.sideMenuLinkClicked('changepassword')}>Change Password</a></li>
                                        <li><a className="" onClick={(e) => this.showSubMenu('business-profile')}>Business Profile</a>
                                            <span className={this.state.editBusinessProfileIcon} onClick={(e) => this.showSubMenu('business-profile')}></span>
                                            <ul style={this.state.editBusinessSubMenuStyle}>
                                                <li><a onClick={(e) => this.sideMenuLinkClicked('business-profile')}>View Profile</a></li>
                                                <li><a onClick={(e) => this.sideMenuLinkClicked(BusinessProfileLink)}>Edit Profile</a></li>
                                                <li><a onClick={(e) => this.sideMenuLinkClicked('dashboard')}>Upload Banner Photo</a></li>
                                                <li><a onClick={(e) => this.sideMenuLinkClicked('menu')}>Menu</a></li>
                                            </ul>
                                        </li>
                                        <li><a className="" onClick={(e) => this.sideMenuLinkClicked('dashboard')}>My Orders</a></li>
                                        <li><a className="" onClick={(e) => this.sideMenuLinkClicked('dashboard')}>Payment History</a></li>
                                        <li><a className="" onClick={(e) => this.sideMenuLinkClicked('dashboard')}>Reservations</a></li>
                                        <li><a className="" onClick={(e) => this.sideMenuLinkClicked('dashboard')}>Promotions</a></li>
                                        <li><a className="" onClick={(e) => this.sideMenuLinkClicked('dashboard')}>Notifications</a></li>
                                        <li><a className="" onClick={(e) => this.sideMenuLinkClicked('dashboard')}>Incentives</a></li>
                                        <li><a className="" onClick={(e) => this.sideMenuLinkClicked('dashboard')}>Manage Sub User</a></li>
                                        <li><a className="" onClick={(e) => this.sideMenuLinkClicked('dashboard')}>Social Media Post</a></li>
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

export default withRouter(AdminLayout)