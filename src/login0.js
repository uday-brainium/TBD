import React, {Component} from "react";
import {
    Container,
    Row,
    Col,
    Nav
} from 'reactstrap';
import { Link, withRouter, Redirect, NavLink as RRNavLink } from 'react-router-dom'
import Notifications, {notify} from 'react-notify-toast';

import ApiService from '../services/api'

// min header
import Minheader from './views/minheader'

// footer
import Footer from './views/footer'

// images
import logo from '../images/logo.png'

// config file
import config from '../config'

const accessToken = localStorage.getItem('access-token-tbd')

class LoginPage extends React.Component {
    constructor(props) {
        super(props)

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.showForgetPassword = this.showForgetPassword.bind(this)

        this.state = {
            isSubmitDisabled: false,
            showForgetBlock: false,
            formDisabled: false,
            // form related data
            email: '',
            password: ''
        }
    }

    componentDidMount(){
        if(accessToken !== null){
            this.props.history.push('/dashboard')
        }
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value})

        if(e.target.name === 'password' && this.state.email !== ''){
            this.setState({
                isSubmitDisabled: true
            })
        }

        if(e.target.name === 'email' && this.state.password !== ''){
            this.setState({
                isSubmitDisabled: true
            })
        }
    }

    handleSubmit(event) {
        if(this.state.email !== '' && this.state.password !== ''){
            if ((/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(this.state.email)){
                try{
                    ApiService.login(this.state.email, this.state.password)
                    .then(res => res.json())
                    .then(response => {
                        console.log(response)
                        if(response.success){
                            notify.show( response.message, 'success', 3000)

                            let imagepath = config.Api_Address+'/uploads/users/'+response.data.profilePicture
                            
                            // save data in local storage 
                            localStorage.setItem('access-token-tbd', response.token)
                            localStorage.setItem('full-name', response.data.fullName)
                            localStorage.setItem('user-id', response.data._id)
                            localStorage.setItem('profile-image-path', imagepath)
                            
                            // disable form fields
                            this.setState({
                                formDisabled: true
                            })

                            setTimeout(() => {
                                this.props.history.push('/dashboard')
                            }, 4000)
                        }
                        else{
                            notify.show( response.message, 'error', 5000);
                        }
                    })
                    .catch(function(error) {
                        console.log(error)
                    })
                }
                catch(error){
                    console.log(error)
                }

                // notify.show('Valid Email Address', 'success', 5000);
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

    showForgetPassword(){
        this.setState({
            showForgetBlock: true
        })
    }

    render() {
        if(this.state.showForgetBlock){
            return(
                <Redirect to="/forgetpassword" />
            )
        }
        else{
            return (
                <div onClick={this.hideMenu}>
                    <Minheader />
    
                    <section className="loginSection">
                        <div className="loginWrapperOuter">
                            <div className="loginWrapper">
                                <header>
                                    Login
                                </header>
    
                                <form onSubmit={this.handleSubmit} className="form">
                                    <fieldset disabled={this.state.formDisabled}>
                                        <div className="email inputOuter">
                                            <input placeholder="Email Address" type="email" name="email" value={this.state.email} onChange={this.handleChange}/>
                                        </div>
                                        <div className="password inputOuter">
                                            <input placeholder="Password" type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                                        </div>
        
                                        <p onClick={this.showForgetPassword} className="forgotpass">Forgot Password</p>
        
                                        <div hidden={!this.state.showForgetBlock}>
                                            <div className="captchaImage">
                                                Captcha image
                                            </div>
                                            <div className="inputOuter">
                                                <input placeholder="Type the code shown" type="text"/>
                                            </div>
                                        </div>
        
                                        <button disabled={!this.state.isSubmitDisabled} className="button">Log in</button>
                                    </fieldset>
    
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
}

export default withRouter(LoginPage)
