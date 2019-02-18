import React,{ Component } from "react";
import ReactDOM from 'react-dom'
import { Route, Link, Redirect, withRouter } from "react-router-dom"
import {
    Container,
    Row,
    Col,
    Nav
} from 'reactstrap';
import Notifications, {notify} from 'react-notify-toast';

import ApiService from '../services/api'

const token = localStorage.getItem('access-token-tbd')
const userid = localStorage.getItem('user-id')

class ChangePasswordPage extends React.Component{
    constructor(props){
        super(props)

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

        this.state = {
            'oldpassword': '',
            'newpassword': '',
            'confirmpassword': '',
            // submit button
            'submitDisabled': true,
            'formDisabled': false
        }
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value})

        if(!this.checkEmptyFields()){
            this.setState({
                'submitDisabled': false
            })
        }
    }

    handleSubmit(e){
        e.preventDefault()

        let emptyFields = this.checkEmptyFields()

        if(emptyFields){
            notify.show('All fields are required', 'error', 5000)
        }
        else if(this.state.newpassword.length < 6){
            notify.show('Password should more than 6 characters long', 'error', 5000)
        }
        else if(this.state.newpassword !== this.state.confirmpassword){
            notify.show('Passwords do not match', 'error', 5000)
        }
        else{
            let passowordInfo = {
                'id': userid,
                'opass': this.state.oldpassword,
                'npass': this.state.newpassword
            }
            ApiService.changePassword(token, passowordInfo)
            .then(res => res.json())
            .then(response =>{
                if(response.success){
                    notify.show(response.message, 'success', 5000)
                    // disable form fields
                    this.setState({
                        formDisabled: true
                    })
                    setTimeout(() => {
                        this.props.history.push('/viewprofile')
                    }, 6000)
                }
                else{
                    notify.show(response.message, 'error', 5000)
                }
            })
            .catch(function(error) {
                console.log(error)
            })
        }

    }

    checkEmptyFields(){
        var registerFields = ['oldpassword', 'newpassword', 'confirmpassword']
        var emptyFields = false
        for (let registerField of registerFields){
            if(this.state[registerField] === ''){
                // console.log(registerField+ ' is empty')
                emptyFields = true
            }
        }

        return emptyFields
    }

    render(){
        return(
            <section className="loginSection">
                <Notifications options={{top: '50px'}}/>

                <div className="loginWrapperOuter">
                    <div className="loginWrapper">
                        <header>
                            Change Password
                        </header>

                        <form className="form" onSubmit={this.handleSubmit}>
                            <fieldset disabled={this.state.formDisabled}>
                                <div className="password inputOuter">
                                   <input name="oldpassword" placeholder="Old Password" type="password" onChange={this.handleChange} />
                                </div>
                                <div className="password inputOuter">
                                   <input name="newpassword" placeholder="New Password" type="password" onChange={this.handleChange} />
                                </div>
                                <div className="password inputOuter">
                                   <input name="confirmpassword" placeholder="Confirm Password" type="password" onChange={this.handleChange} />
                                </div>
                                <button className="button" disabled={this.state.submitDisabled}>Submit</button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </section>
        )
    }
}

export default withRouter(ChangePasswordPage)
