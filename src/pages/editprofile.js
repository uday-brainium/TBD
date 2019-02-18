import React, { Component } from "react";
import ReactDOM from 'react-dom'
import { Route, Link, Redirect, withRouter } from "react-router-dom"
import {
    Container,
    Row,
    Col,
    Nav
} from 'reactstrap';
import Notifications, { notify } from 'react-notify-toast';

import ApiService from '../services/api'

import NoProfileImage from '../images/profile-no-image.jpg'

import LoadingSpinnerView from './views/spinner'

class EditProfilePage extends React.Component {
    constructor(props) {
        super(props)

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

        this.state = {
            submitDisabled: true,
            formDisabled: false,
            // form properties
            username: '',
            firstname: '',
            lastname: '',
            email: '',
            phone: '',
            address: '',
            // spinner
            spinnerShowing: false
        }
    }

    componentDidMount() {
        // show spinner
        this.setState({
            spinnerShowing: true
        })


        let userId = localStorage.getItem('user-id')
        let token = localStorage.getItem('access-token-tbd')
        ApiService.profileData(token, userId)
            .then(res => res.json())
            .then(response => {
                // console.log(response)
                if (response.success) {
                    var fullName = response.data.fullName.split(' ')
                    if (response.data.phone === null && response.data.address === null) {
                        this.setState({
                            // username: response.data.userID,
                            firstname: fullName[0],
                            lastname: fullName[1],
                            email: response.data.email,
                            phone: '',
                            address: ''
                        })
                    }
                    else {
                        this.setState({
                            // username: response.data.userID,
                            firstname: fullName[0],
                            lastname: fullName[1],
                            email: response.data.email,
                            phone: response.data.phone,
                            address: response.data.address
                        })
                    }
                }
                // hide spinner
                this.setState({
                    spinnerShowing: false
                })
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })

        if (!this.checkEmptyFields()) {
            this.setState({
                submitDisabled: false
            })
        }
    }

    handleSubmit(e) {
        e.preventDefault()

        let emptyFields = this.checkEmptyFields()

        if (emptyFields) {
            notify.show('All fields are required', 'error', 5000);
        }
        else if (!(/^\d{10}$/).test(this.state.phone)) {
            notify.show('Invalid Telephone Number', 'error', 5000);
        }
        else {
            let token = localStorage.getItem('access-token-tbd')
            let userId = localStorage.getItem('user-id')
            var fullName = this.state.firstname + ' ' + this.state.lastname
            var data = {
                'id': userId,
                'fullName': fullName,
                'dob': '1970-01-01',
                'gender': 'm',
                'phone': this.state.phone,
                'address': this.state.address
            }

            ApiService.updateProfile(token, data)
                .then(res => res.json())
                .then(response => {
                    // console.log(response)
                    if (response.success) {
                        notify.show(response.message, 'success', 3000)
                        // update local storage
                        localStorage.setItem('full-name', data.fullName)
                        this.setState({
                            formDisabled: true
                        })
                        setTimeout(() => {
                            this.props.history.push('/viewprofile')
                        }, 4000)
                    }
                })
                .catch(function (error) {
                    console.log(error)
                })
        }
    }

    checkEmptyFields() {
        var registerFields = ['firstname', 'lastname', 'email', 'phone', 'address']
        var emptyFields = false
        for (let registerField of registerFields) {
            if (this.state[registerField] === '') {
                // console.log(registerField+ ' is empty')
                emptyFields = true
            }
        }

        return emptyFields
    }

    render() {
        return (
            <div className="right">
                {/*<LoadingSpinnerView showing={this.state.spinnerShowing} />*/}

                <Notifications options={{ top: '50px' }} />

                <div className="rightSideHeader">
                    <ul className="breadcrumbNavigation">
                        <li><Link to={'/dashboard'} className="home">Home</Link></li>
                        <li>|</li>
                        <li><Link to={'/editprofile'}>User Profile</Link></li>
                    </ul>
                </div>
                <div className="dashboardBody">
                    <div className="loginWrapperOuter">
                        <div className="loginWrapper">
                            <header>
                                Edit User Profile
                            </header>
                            <form className="form" onSubmit={this.handleSubmit}>
                                <fieldset disabled={this.state.formDisabled}>
                                    {/* <div className="inputOuter">
                                        <input name="username" type="text" value={this.state.username} onChange={this.handleChange} readOnly="true"/>
                                    </div> */}
                                    <div className="inputOuter">
                                        <input name="firstname" type="text" value={this.state.firstname} onChange={this.handleChange} />
                                    </div>
                                    <div className="inputOuter">
                                        <input name="lastname" type="text" value={this.state.lastname} onChange={this.handleChange} />
                                    </div>
                                    <div className="inputOuter">
                                        <input name="email" type="text" value={this.state.email} onChange={this.handleChange} readOnly="true" />
                                    </div>
                                    <div className="inputOuter">
                                        <input name="phone" type="tel" placeholder="phone" value={this.state.phone} onChange={this.handleChange} />
                                    </div>
                                    <div className="inputOuter">
                                        <input name="address" type="text" placeholder="address" value={this.state.address} onChange={this.handleChange} />
                                    </div>
                                    <button type="submit" disabled={this.state.submitDisabled} className="button">Update</button>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(EditProfilePage)
