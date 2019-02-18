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
import envelope from '../images/envelope-icon.png'

class ForgetPasswordPage extends React.Component{
    constructor(props){
        super(props)

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

        this.state = {
            formDisabled: false,
            submitDisabled: true,
            // form releated data
            email: '',
        }
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value})
        if(this.state.email !== ''){
            this.setState({
                submitDisabled: false
            })
        }
    }

    handleSubmit(e){
        e.preventDefault()

        if(this.state.email !== ''){
            if ((/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(this.state.email)){
                try{
                    ApiService.forgetPassword(this.state.email)
                    .then(res => res.json())
                    .then(response => {
                        if(response.success){
                            notify.show( response.message, 'success', 3000)
                            // disable form fields
                            this.setState({
                                formDisabled: true
                            })
                            setTimeout(() => {
                                this.props.history.push('/login')
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
            }
            else{
                notify.show('Invalid Email Address', 'error', 5000);
            }
        }
        else{
            notify.show('Email is required', 'error', 5000);
        }
    }

    render(){
        return(
            <div>
                <Minheader />
                <section className="loginSection">
                    <div className="forgotPasswordWrapperOuter">

                        <div className="headerForgotPassword">
                            <div className="icon"><img src={envelope} alt="" /></div>
                            <p>
                                Please enter your registered email address below. Temporary password will be sent in your mail id. You can change that password from your account. 
                            </p>
                        </div>
                        
                        <div className="loginWrapper">
                            <form className="form" onSubmit={this.handleSubmit}>
                                <fieldset disabled={this.state.formDisabled}>
                                    <div className="email inputOuter">
                                        <input name="email" placeholder="Email Address" type="email" onChange={this.handleChange} />  
                                    </div>
                                    <button type="submit" disabled={this.state.submitDisabled} className="button">Send password</button>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        )
    }
}

export default ForgetPasswordPage