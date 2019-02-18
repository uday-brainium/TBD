import React, {Component} from "react";
import {
    Container,
    Row,
    Col,
    Nav,
    Popover,
    PopoverHeader,
    PopoverBody,
    NavLink
} from 'reactstrap';
import { Link, withRouter, NavLink as RRNavLink } from 'react-router-dom'
import Notifications, {notify} from 'react-notify-toast';

// footer
import Footer from './views/footer'

// images
import logo from '../images/logo.png'

class LoginPage extends React.Component {
    constructor(props) {
        super(props)

        this.toggle = this.toggle.bind(this);
        this.hideMenu = this.hideMenu.bind(this);
        this.showMenuRenderer = this.showMenuRenderer.bind(this)
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            popoverOpen: false,
            menuButtonClass: 'hamburger',
            menuBodystyle: {
                'display':'none'
            },
            windowWidth: window.innerWidth,
            isSubmitHidden: false,
            email: '',
            password: ''
        }
    }

    componentDidMount(){
        this.showMenuRenderer()
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

    handleChange(e) {

        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit(event) {
        if(this.state.email !== '' && this.state.password !== ''){
            if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(this.state.email)){
                // this.setState({
                //     canFormSubmit: false
                // })
                notify.show('Valid Email Address', 'success', 5000);
            }
            else{
                notify.show('Invalid Email Address', 'error', 5000);
            }
        }
        else{
            notify.show('Both fields are required', 'error', 5000);
        }
        event.preventDefault();
    }

    render() {
        return (
            <div onClick={this.hideMenu}>
                <header className="header innerPage">
                    <Container fluid={true}>
                        <Row>
                            <Notifications options={{top: '50px'}}/>

                            <div className="banner">
                                <div className="indexHeader">
                                    <Container>
                                        <Row>
                                            <Col sm={12}>
                                                <div className="topHeader">
                                                    <div className="logo">
                                                        <a href="https://www.google.com/">
                                                            <img src={logo} alt="" />
                                                        </a>
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

                <section className="loginSection">
                    <div className="loginWrapperOuter">
                        <div className="loginWrapper">
                            <header>
                                Login
                            </header>

                            <form onSubmit={this.handleSubmit} className="form">
                                <div className="email inputOuter">
                                    <input placeholder="Email Address" type="email" name="email" value={this.state.email} onChange={this.handleChange}/>
                                </div>
                                <div className="password inputOuter">
                                    <input placeholder="Password" type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                                </div>

                                <Link to='/registration' className="forgotpass">Forgot Password</Link>

                                {/*<div className="captchaImage">
                                    Captcha image
                                </div>
                                <div className="inputOuter">
                                    <input placeholder="Type the code shown" type="text"/>
                                </div>*/}

                                <button className="button">Log in</button>

                                <div className="registerLink">
                                    Not registered yet?
                                    <Link to='/registration'>Click here</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        )
    }
}

export default LoginPage
