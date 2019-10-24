import React, { Component } from "react"
import {
    Container,
    Row,
    Col,
    Nav,
    Collapse
} from 'reactstrap'
// import { Link, withRouter } from "react-router-dom"
import { HashLink as Link } from 'react-router-hash-link'

import logo from '../../images/logo.png'
import logo2 from '../../images/logo2.png'
import userImage from '../../images/user.png'
import noUserImage from '../../images/profile-no-image.jpg'

class AdminLeftMenuView extends React.Component {
    constructor(props) {
        super(props)

        this.showSubMenu = this.showSubMenu.bind(this)

        this.state = {
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
            // local state of menu
            menuOpen: false,
            menuClicked: false
        }
    }

    componentDidMount() {
        this.setState({
            userName: localStorage.getItem('full-name').toUpperCase(),
            menuClassName: 'leftSide',
            menuUserDiv: {
                'display': 'none'
            }
        })

        if (window.innerWidth < 767) {
            this.setState({
                logoImage: logo
            })
        }
        else {
            this.setState({
                logoImage: logo2
            })
        }

        // set local menuDisplayed property
        this.setState({
            menuOpen: !this.props.menuDisplayed,
            menuClicked: !this.props.menuClicked
        })
    }

    componentWillReceiveProps() {
        this.setState({
            menuOpen: this.props.menuDisplayed,
            menuClicked: this.props.menuClicked
        })

        // console.log("local: "+this.state.menuOpen)
        // console.log("parent: "+this.props.menuDisplayed)

        // as state update is async this keeps receiving props previous state
        // for that this logic is used

        if (this.state.menuOpen && !this.props.menuDisplayed) {
            this.setState({
                menuClassName: 'leftSide push',
                menuUserDiv: {
                    'display': 'flex'
                }
            })
        }
        else if (this.props.topBarFixed) {
            if (!this.state.menuOpen && !this.props.menuDisplayed && this.props.menuClicked) {
                // console.log('rare situation')
                this.setState({
                    menuClassName: 'leftSide push',
                    menuUserDiv: {
                        'display': 'flex'
                    }
                })
            }
        }
        else {
            this.setState({
                menuClassName: 'leftSide',
                menuUserDiv: {
                    'display': 'none'
                }
            })
        }
    }

    hideOverLay() {
        this.props.hideOverlay()
    }

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

    render() {
        return (
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
        )
    }
}

export default AdminLeftMenuView