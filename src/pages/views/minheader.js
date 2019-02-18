import React,{ Component } from "react";
import {
    Container,
    Row,
    Col,
    Nav
} from 'reactstrap';
import { Link, withRouter } from "react-router-dom"
import Notifications, {notify} from 'react-notify-toast';

import logo from '../../images/logo.png'

class MinheaderView extends React.Component {
    constructor(props) {
        super(props)

        this.toggle = this.toggle.bind(this);
        this.hideMenu = this.hideMenu.bind(this);
        this.showMenuRenderer = this.showMenuRenderer.bind(this)
        this.scrollHandler = this.scrollHandler.bind(this)

        this.state = {
            popoverOpen: false,
            menuButtonClass: 'hamburger',
            menuBodystyle: {
                'display':'none'
            },
            windowWidth: window.innerWidth,
            fixedHeaderClass: 'indexHeader',
            fixedHeaderStyle: {'position': 'static'}
        }
    }

    componentDidMount(){
        this.showMenuRenderer()
        window.addEventListener('scroll', this.scrollHandler, { passive: true })
    }

    componentWillUnmount(){
        window.removeEventListener('scroll', this.scrollHandler)
    }

    // scroll handler
    scrollHandler(){
        var bodyLength = window.innerHeight
        var headerLength = 220
        if(bodyLength > 0){
            if(window.scrollY > headerLength){
                this.setState({
                    fixedHeaderClass: 'indexHeader fixed',
                    fixedHeaderStyle: {'position': 'fixed'}
                })
            }
            else{
                this.setState({
                    fixedHeaderClass: 'indexHeader',
                    fixedHeaderStyle: {'position': 'static'}
                })
            }
        }

        if(bodyLength === 0){
            if(window.scrollY > headerLength/2){
                this.setState({
                    fixedHeaderClass: 'indexHeader fixed',
                    fixedHeaderStyle: {'position': 'fixed'}
                })
            }
            else{
                this.setState({
                    fixedHeaderClass: 'indexHeader',
                    fixedHeaderStyle: {'position': 'static'}
                })
            }
        }
    }

    toggle() {
        if(this.state.popoverOpen){
            this.setState({
                popoverOpen: !this.state.popoverOpen,
                menuButtonClass: 'hamburger',
                menuBodystyle: {
                    'display':'none'
                }
            })
        }
        else{
            this.setState({
                popoverOpen: !this.state.popoverOpen,
                menuButtonClass: 'hamburger close',
                menuBodystyle: {
                    'display':'flex'
                }
            })
        }
    }

    hideMenu(){
        if(this.state.popoverOpen){
            this.setState({
                popoverOpen: false,
                menuButtonClass: 'hamburger',
                menuBodystyle: {
                    'display':'none'
                }
            })
        }
    }

    showMenuRenderer(){
        if(this.state.windowWidth < 767){
            this.setState({
                menuBodystyle: {
                    'display':'none'
                }
            })
        }
        else{
            this.setState({
                menuBodystyle: {
                    'display':'flex'
                }
            })
        }
    }

    render(){
        return(
            <div onClick={this.hideMenu}>
                <Notifications options={{top: '50px'}}/>

                <header className="header innerPage">
                    <Container fluid={true}>
                        <Row>
                            <Notifications options={{top: '50px'}}/>

                            <div className="banner">
                                <div className={this.state.fixedHeaderClass} style={this.state.fixedHeaderStyle}>
                                    <Container>
                                        <Row>
                                            <Col sm={12}>
                                                <div className="topHeader">
                                                    <div className="logo">
                                                        <Link to='/'><img src={logo} alt="" /></Link>
                                                    </div>
                                                    <div className="menuContainer">
                                                        <div className={this.state.menuButtonClass} id="hamburger" ref="hamburger" onClick={this.toggle}>
                                                            <span></span>
                                                            <span></span>
                                                            <span></span>
                                                        </div>
                                                        <Nav className="navigation" style={this.state.menuBodystyle}>
                                                            <ul className="secondary">
                                                                <li><Link to='/registration' className="signUp">Sign Up</Link></li>
                                                                <li><Link to='/login' className="signIn">Sign In</Link></li>
                                                            </ul>
                                                            <ul className="primary">
                                                                <li><Link to='/'>Home</Link></li>
                                                                <li><Link to='/about'>About Us</Link></li>
                                                                <li><Link to='/contact'>Contact</Link></li>
                                                            </ul>
                                                        </Nav>
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
        )
    }
}

export default MinheaderView
