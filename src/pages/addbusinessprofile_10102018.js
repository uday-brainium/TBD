import React, { Component } from "react";
import ReactDOM from 'react-dom'
import { Route, Link, Redirect, withRouter } from "react-router-dom"
import {
    Container,
    Row,
    Col,
    Nav
} from 'reactstrap'
import Notifications, { notify } from 'react-notify-toast';

import ApiService from '../services/api'

import selectStyles from '../styles/select.css'

const token = localStorage.getItem('access-token-tbd')
const userid = localStorage.getItem('user-id')

// dummy menu items
const MenuItems = ['Indian', 'Chineese', 'Continental']

// business profile set
const BusinessProfileSet = localStorage.getItem('business-profile-id')

class AddBusinessProfilePage extends React.Component {
    constructor(props) {
        super(props)

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        // select releted
        this.optionChanged = this.optionChanged.bind(this)
        this.displaySelectOptions = this.displaySelectOptions.bind(this)
        this.hideSelectOptions = this.hideSelectOptions.bind(this)
        this.optionSelected = this.optionSelected.bind(this)

        this.state = {
            // form
            submitDisabled: true,
            formDisabled: false,
            // form fields
            business_name: '',
            adddress: '',
            email: '',
            phone_number: '',
            opening_time: '',
            closing_time: '',
            categories: '',
            // option
            option: '',
            optionsShowing: false,
            styledSelectClass: 'styledSelect',
            optionTextStyle: {
                'color': '#9fa5a5'
            },
            optionsDisplayedStyle: {
                'display': 'none'
            },
            // page title
            pageTitle: ''
        }
    }

    componentDidMount() {
        if (BusinessProfileSet !== null) {
            // make api call and get the data
            this.setState({
                'pageTitle': 'Edit Business Profile'
            })
        }
        else {
            this.setState({
                'pageTitle': 'Add Business Profile'
            })
        }
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })

        if (!this.checkEmptyFields()) {
            this.setState({
                'submitDisabled': false
            })
        }
    }

    handleSubmit(e) {
        e.preventDefault()

        let emptyFields = this.checkEmptyFields()

        if (emptyFields) {
            notify.show('All fields are required', 'error', 5000)
        }
        else {
            notify.show('All is well', 'success', 5000)
            /*let passowordInfo = {
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
            })*/
        }

    }

    displaySelectOptions() {
        this.setState({
            'optionsShowing': true,
            'styledSelectClass': 'styledSelect active',
            'optionsDisplayedStyle': {
                'display': 'block'
            },
        })
    }

    hideSelectOptions() {
        if (this.state.optionsShowing) {
            this.setState({
                'optionsShowing': false,
                'styledSelectClass': 'styledSelect',
                'optionsDisplayedStyle': {
                    'display': 'none'
                },
            })
        }
    }

    optionSelected(option = '') {
        if (option !== ' ') {
            this.setState({
                'option': option,
                'optionTextStyle': {
                    'color': '#000'
                }
            })
        }
    }

    optionChanged(e) {
        this.setState({
            'option': e.target.value
        })
    }

    checkEmptyFields() {
        var registerFields = ['business_name', 'email', 'phone_number', 'address', 'opening_time', 'closing_time', 'categories']
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
        var OptionText = ''
        if (this.state.option === '') {
            OptionText = "Choose an Option"
        }
        else {
            OptionText = this.state.option
        }

        return (
            <section className="loginSection" onClick={this.hideSelectOptions}>
                <Notifications options={{ top: '50px' }} />

                <div className="loginWrapperOuter">
                    <div className="loginWrapper">
                        <header>
                            {this.state.pageTitle}
                        </header>

                        <form className="form" onSubmit={this.handleSubmit}>
                            <fieldset disabled={this.state.formDisabled}>
                                <div className="inputOuter">
                                    <input name="business_name" placeholder="Business Name" type="text" onChange={this.handleChange} />
                                </div>
                                <div className="inputOuter">
                                    <input name="address" placeholder="Address" type="text" onChange={this.handleChange} />
                                </div>
                                <div className="inputOuter">
                                    <input name="email" placeholder="email" type="email" onChange={this.handleChange} />
                                </div>
                                <div className="inputOuter">
                                    <input name="phone_number" placeholder="Phone Number" type="tel" onChange={this.handleChange} />
                                </div>
                                <div className="inputOuter">
                                    <input name="opening_time" placeholder="Opening Time" type="text" onChange={this.handleChange} />
                                </div>
                                <div className="inputOuter">
                                    <input name="closing_time" placeholder="Closing Time" type="text" onChange={this.handleChange} />
                                </div>
                                <div className="col-1">
                                    <div className="fieldCol">
                                        <div className="select">
                                            <select id="menu" name="option" className="s-hidden" value={this.state.option} onChange={this.optionChanged}>
                                                {MenuItems.map((item, index) => {
                                                    return <option key={index} value={item}>{item}</option>
                                                })}
                                            </select>
                                            <div className={this.state.styledSelectClass} onClick={this.displaySelectOptions}>
                                                <span style={this.state.optionTextStyle}>{OptionText}</span>
                                            </div>
                                            <ul className="options" style={this.state.optionsDisplayedStyle}>
                                                {MenuItems.map((item, index) => {
                                                    return <li key={index} onClick={() => this.optionSelected(item)}>{item}</li>
                                                })}
                                            </ul>
                                        </div>
                                    </div>
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

export default AddBusinessProfilePage