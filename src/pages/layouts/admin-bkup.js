import React, {Component} from "react"
import ReactDOM from 'react-dom'
import { Route, Link, Redirect, withRouter } from "react-router-dom"
import Notifications, {notify} from 'react-notify-toast';

import AdminHeaderView from '../views/adminheader'
import AdminLeftMenuView from '../views/adminmenu'
import FooterView from '../views/footer'

// api service
import ApiService from '../../services/api'

// images
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

        this.state = {
            isOpen: false,
            transform: '',
            //logo image
            logoImage: '',
            // side menu
            menuClassName: 'leftSide',
            menuUserDiv: {
                'display':'none'
            },
            overlayStyle: {
                display: 'none'
            },
            tokenPresent: false,
            redirectedHome: false,
            fixedTopBar: false,
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    componentDidMount() {

        if(localStorage.getItem('access-token-tbd') !== null){
            this.setState({
                tokenPresent: true
            })
        }

        if(localStorage.getItem('full-name') !== null){
            this.setState({ 
                userName: localStorage.getItem('full-name').toUpperCase()
            })
        }

        // hide overlay and menu at start
        this.setState({
            overlayStyle: {
                display: 'none'
            },
            menuClassName: 'leftSide',
            menuUserDiv: {
                'display':'none'
            }
        })

        // set logo image
        if(window.innerWidth < 767){
            this.setState({
                logoImage: logo
            })
        }
        else{
            this.setState({
                logoImage: logo2
            })
        }

        // scroll handler
        window.addEventListener('scroll', this.scrollHandler, { passive: true })
    }

    componentWillUnmount(){
        window.removeEventListener('scroll', this.scrollHandler)
    }

    componentDidUpdate(){
        // do nothing
    }

    // scroll handler
    scrollHandler(){
        var bodyLength = window.innerHeight
        var headerLength = 220
        if(bodyLength > 0){
            if(window.scrollY > headerLength){
                this.setState({
                    fixedTopBar: true
                })
            }
            else{
                this.setState({
                    fixedTopBar: false
                })
            }
        }

        if(bodyLength === 0){
            if(window.scrollY > headerLength/2){
                this.setState({
                    fixedTopBar: true
                })
            }
            else{
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
    toggleSideMenu(){
        if(this.state.leftMenuOpen){
            this.setState({
                overlayStyle: {
                    display: 'none'
                },
                menuClassName: 'leftSide',
                menuUserDiv: {
                    'display':'none'
                }
            })
        }
        else{
            this.setState({
                overlayStyle: {
                    display: 'block'
                },
                menuClassName: 'leftSide push',
                menuUserDiv: {
                    'display':'flex'
                }
            })
        }
    }

    // overlay hide function
    hideOverlay(){
        this.setState({
            overlayStyle: {
                display: 'none'
            },
            menuClassName: 'leftSide push',
            menuUserDiv: {
                'display':'flex'
            }
        })
    }

    // logout
    logout(){
        try{
            ApiService.logout(localStorage.getItem('access-token-tbd'))
            .then(res => res.json())
            .then(response => {
                // console.log(response)
                if(response.success){
                    // notify.show( response.message, 'success', 3000)
                    //setTimeout(() => {
                        localStorage.removeItem('access-token-tbd')
                        localStorage.removeItem('full-name')
                        localStorage.removeItem('user-id')
                        this.setState({
                            redirectedHome: true
                        })
                        // this.props.history.push('/')
                    //}, 4000)
                }
                else{
                    // notify.show( response.message, 'error', 5000);
                }
            })
            .catch(function(error) {
                console.log(error)
            })
        }
        catch(error){
            console.log(error)
        }

        /*localStorage.removeItem('access-token-tbd')
        localStorage.removeItem('full-name')
        this.setState({
            redirectedHome: true
        })*/
    }

    render() {
        if(!this.state.tokenPresent){
            // console.log(this.state.tokenPresent)
            {/* <Redirect to="/login" /> */}
            return(
                <div>
                    <h3>Not Authorized</h3> 
                </div>
            )
        }
        else if(this.state.redirectedHome){
            return <Redirect to='/' />
        }
        else{
            return (
                <div className="adminLayout" id="adminLayout">
                    <div className="overlay" style={this.state.overlayStyle} onClick={this.hideOverlay}></div>
                    <AdminHeaderView fixedTopBar={this.state.fixedTopBar} displaySideMenu={this.toggleSideMenu} logout={this.logout} />
                    {/*React.createElement(this.props.component)*/}
                    <section>
                        <div className="innerOuterWrapper">
                            <div className="innerWrapper">
                                
                                <div className={this.state.menuClassName} ref={"leftSide"}>
                                    <div className="logoSideBar">
                                        <a><img src={this.state.logoImage} alt="" /></a>
                                        <div className="welcomeUser" style={this.state.menuUserDiv}>
                                            <div className="userPhoto"><img src={noUserImage} alt="" /></div>
                                            <div className="userName">Welcome {this.state.userName}</div>
                                        </div>
                                    </div>
                                    <ul className="dashboardMenu">
                                        <li><Link to={'/dashboard'} className="" onClick={this.hideOverLay}>Dashboard</Link></li>
                                        <li><Link to={'/dashboard'} className="">Edit Profile</Link>
                                            <span className={this.state.editProfileIcon} onClick={(e) => this.showSubMenu('edit-profile')}></span>
                                            <ul style={this.state.editProfileSubMenuStyle}>
                                                <li><Link to={'/dashboard'} className="viewProfile" onClick={this.hideOverLay}>Banner Photo</Link></li>
                                                <li><Link to={'/dashboard'} className="editProfile" onClick={this.hideOverLay}>Menu</Link></li>
                                            </ul>
                                        </li>
                                        <li><Link to={'/dashboard'} className="" onClick={this.hideOverLay}>Change Password</Link></li>
                                        <li><Link to={'/dashboard'} className="" onClick={this.hideOverLay}>Business Profile</Link>
                                            <span className={this.state.editBusinessProfileIcon} onClick={(e) => this.showSubMenu('business-profile')}></span>
                                            <ul style={this.state.editBusinessSubMenuStyle}>
                                                <li><Link to={'/dashboard'} className="viewProfile" onClick={this.hideOverLay}>Banner Photo</Link></li>
                                                <li><Link to={'/dashboard'} className="editProfile" onClick={this.hideOverLay}>Menu</Link></li>
                                            </ul>
                                        </li>
                                        <li><Link to={'/dashboard'} className="" onClick={this.hideOverLay}>My Orders</Link></li>
                                        <li><Link to={'/dashboard'} className="" onClick={this.hideOverLay}>Payment History</Link></li>
                                        <li><Link to={'/dashboard'} className="" onClick={this.hideOverLay}>Reservations</Link></li>
                                        <li><Link to={'/dashboard'} className="" onClick={this.hideOverLay}>Promotions</Link></li>
                                        <li><Link to={'/dashboard'} className="" onClick={this.hideOverLay}>Notifications</Link></li>
                                        <li><Link to={'/dashboard'} className="" onClick={this.hideOverLay}>Incentives</Link></li>
                                        <li><Link to={'/dashboard'} className="" onClick={this.hideOverLay}>Manage Sub User</Link></li>
                                        <li><Link to={'/dashboard'} className="" onClick={this.hideOverLay}>Social Media Post</Link></li>
                                    </ul>
                                </div>
    
                                <Route path={this.props.path} component={this.props.component} />
                            </div>
                        </div>
                    </section>    
                    <FooterView />
                </div>
            )
        }
    }
}

export default AdminLayout