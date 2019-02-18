import React, { Component } from "react"
import {
    Container,
    Row,
    Col,
    Nav
} from 'reactstrap';
import { Link, withRouter, Redirect, NavLink as RRNavLink } from 'react-router-dom'

import userImage from '../../images/user.png'
import noUserImage from '../../images/profile-no-image.jpg'

class AdminHeaderView extends React.Component {
    constructor(props) {
        super(props)

        this.toggle = this.toggle.bind(this)
        this.hideMenu = this.hideMenu.bind(this)
        this.showSideMenu = this.showSideMenu.bind(this)
        this.logout = this.logout.bind(this),
            this.popoverLinkClicked = this.popoverLinkClicked.bind(this)
        this.showMenuRenderer = this.showMenuRenderer.bind(this)


        this.state = {
            popoverOpen: false,
            elementClass: 'hamburgerAL',
            menuBodystyle: {
                'display': 'block'
            },
            windowWidth: window.innerWidth,
            menuWrapper: '',
            sliderMenuToggle: '',
            fixedHeaderClass: 'indexHeader',
            fixedHeaderStyle: { 'position': 'static' },
            // user related data
            userName: ''
        };
    }

    componentDidMount() {
        this.showMenuRenderer()
        this.setState({
            userName: localStorage.getItem('full-name').toLocaleUpperCase()
        })
    }

    componentWillReceiveProps() {
        if (this.props.fixedTopBar) {
            this.setState({
                fixedHeaderClass: 'indexHeader fixed',
                fixedHeaderStyle: { 'position': 'fixed' }
            })
        }
        else {
            this.setState({
                fixedHeaderClass: 'indexHeader',
                fixedHeaderStyle: { 'position': 'static' }
            })
        }
    }

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

    hideMenu() {
        if (this.state.popoverOpen) {
            this.setState({
                popoverOpen: false,
                elementClass: 'hamburgerAL',
                menuBodystyle: {
                    'display': 'none'
                }
            })
        }
    }

    showMenuRenderer() {
        if (window.innerWidth < 767) {
            this.setState({
                menuBodystyle: {
                    'display': 'none'
                },
                menuWrapper: 'setUser',
                sliderMenuToggle: 'sideMenuToggle'
            })
        }
        else {
            this.setState({
                menuBodystyle: {
                    'display': 'block'
                }

            })
        }
    }

    logout() {
        this.props.logout()
    }

    showSideMenu() {
        this.props.displaySideMenu()
    }

    popoverLinkClicked(page) {
        this.toggle()
        if (page === 'profile') {
            this.props.history.push('/viewprofile')
        }
    }

    render() {
        return (
            <div>
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
                                                            <div className={this.state.sliderMenuToggle} onClick={this.showSideMenu}></div>
                                                            <div className={this.state.menuWrapper}>
                                                                <span className={this.state.elementClass} onClick={this.toggle}>Toggle</span>
                                                                {/* <div class="sideMenuToggle"></div> */}
                                                                <nav className="navigationAL" style={this.state.menuBodystyle}>
                                                                    <ul className="primary">
                                                                        <li onClick={(e) => this.popoverLinkClicked('profile')}>My Profile</li>
                                                                        <li onClick={this.logout}>Logout</li>
                                                                    </ul>
                                                                </nav>
                                                                <div className="welcomeUser">
                                                                    <div className="userPhoto"><img src={noUserImage} alt="" /></div>
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
                {/* <section>
                    <div className="innerOuterWrapper">
                        <div className="innerWrapper">
                            
                        </div>
                    </div>
                </section>  */}
            </div>
        )
    }
}

export default withRouter(AdminHeaderView)