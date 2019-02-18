import React, { Component } from "react";
//let in_array = require('in_array');
import ReactDOM from 'react-dom';
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

const token = localStorage.getItem('access-token-tbd');
const userid = localStorage.getItem('user-id');

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
            businessname: '',
            address: '',
            businessemail: '',
            phone_number: '',
            opening_time: '',
            closing_time: '',
            url: '',
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
            pageTitle: '',
            getmenudata: [],
            menuids: [],
            databaseRetrievedMenuTitles: [],
            index1: 0,
            len: 0,
            i: 0
        }
    }

    componentDidMount() {

        let userId = localStorage.getItem('user-id')
        let token = localStorage.getItem('access-token-tbd')

        ApiService.fetchmenuData(userId)
            .then(res => res.json())
            .then(response => {
                if (response.success) {
                    console.log("76", typeof this.state.getmenudata)
                    this.state.getmenudata = response.menu
                    console.log(this.state.getmenudata);
                }
                else {
                    notify.show(response.message, 'error', 5000);
                }
            })
            .catch(function (error) {
                console.log(error)
            })

        ApiService.profileData(token, userId)
            .then(res => res.json())
            .then(response => {
                console.log(response)
                if (response.success) {
                    this.setState({
                        businessname: response.data.businessname,
                        businessemail: response.data.businessemail,
                        address: response.data.address,
                        phone_number: response.data.phone,
                        opening_time: response.data.openingtime,
                        closing_time: response.data.closingtime,
                        url: response.data.url,
                        menu: response.data.menu
                    })

                }
                // hide spinner
                this.setState({
                    spinnerShowing: false
                })
            })
            .catch(function (error) {
                console.log(error)
            })



        if (this.state.url !== null) {
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
        if (e.target.checked) {
            this.setState({
                menuids: [...this.state.menuids, e.target.value]
            }, () => { console.log("menuids138 ", this.state.menuids) });

        } else {
            var array = [...this.state.menuids]; // make a separate copy of the array
            var index = array.indexOf(e.target.value)
            array.splice(index, 1);
            this.setState({ menuids: array }, () => { console.log("menuid148", this.state.menuids) });
        }

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
            if (!(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(this.state.businessemail)) {
                notify.show('Invalid Email Address', 'error', 5000);
            }
            else if (this.state.address == "") {
                notify.show('Please provide address', 'error', 5000);
            }
            else if (this.state.phone_number == "") {
                notify.show('Please provide phone number', 'error', 5000);
            }
            else if (this.state.opening_time === false) {
                notify.show('Please provide opening time', 'error', 5000)
            }
            else if (this.state.closing_time === false) {
                notify.show('Please provide closing time', 'error', 5000)
            }
            else {

                var data = {
                    'businessname': this.state.businessname,
                    'url': this.state.url,
                    'businessemail': this.state.businessemail,
                    'address': this.state.address,
                    'phone': this.state.phone_number,
                    'openingtime': this.state.opening_time,
                    'closingtime': this.state.closing_time,
                    'menu': this.state.menuids
                }

                try {
                    ApiService.editbusinessprofile(token, data)
                        .then(res => res.json())
                        .then(response => {
                            console.log(response);
                            if (response.success) {
                                notify.show('Business profile has been updated successfully.', 'success', 3000)
                                this.setState({
                                    formDisabled: true
                                })
                            }
                            else {
                                notify.show(response.message, 'error', 5000)
                            }
                        })
                        .catch(function (error) {
                            console.log(error)
                        })
                }
                catch (error) {
                    console.log(error)
                }
                // notify.show('all is well', 'success', 5000);
            }
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
        var registerFields = ['businessname', 'businessemail', 'phone_number', 'address', 'opening_time', 'closing_time'/*, 'categories'*/]
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
        // .filter(dynamicData => {
        //     return dynamicData._id.indexOf(this.state.menu) ? "checked" : ""
        // })
        console.log("menu", this.state.menu);
        console.log("getmenudata", this.state.getmenudata);



        /*this.state.len = this.state.menu.length;
         for (this.state.i = 0; this.state.i < this.state.len; this.state.i++) {
             this.state.databaseRetrievedMenuTitles[this.state.index1++] = this.state.menu[this.state.i].title;
             //return (null)
         }
        this.state.menu.map((value, index) => {
            this.state.databaseRetrievedMenuTitles[this.state.index1++] = value.title;
        })*/

        const menulist = this.state.getmenudata.map((dynamicData, index) => {
            //return (
            //this.state.menu.map((value, index) => {
            if (1) {
                return (
                    <div className="singleCheckbox" key={index} >
                        <input id={dynamicData._id} type="checkbox" checked name={dynamicData._id} value={dynamicData._id} onChange={this.handleChange} />
                        <label htmlFor={dynamicData._id}><span></span>{dynamicData.title}</label>
                    </div>
                )
            }
            else /*if (value._id !== dynamicData._id)*/ {
                return (
                    <div className="singleCheckbox" key={index} >
                        <input id={dynamicData._id} type="checkbox" name={dynamicData._id} value={dynamicData._id} onChange={this.handleChange} />
                        <label htmlFor={dynamicData._id}><span></span>{dynamicData.title}</label>
                    </div>
                )
            }
            //})
            //)
            // return (
            //     <div className="singleCheckbox" key={index} >
            //         <input id={dynamicData._id} type="checkbox" checked name={dynamicData._id} value={dynamicData._id} onChange={this.handleChange} />
            //         <label htmlFor={dynamicData._id}><span></span>{dynamicData.title}</label>
            //     </div>
            // )

        })



        return (
            <section className="loginSection" onClick={this.hideSelectOptions} >
                <Notifications options={{ top: '50px' }} />

                <div className="loginWrapperOuter">
                    <div className="loginWrapper">
                        <header>
                            {this.state.pageTitle}
                        </header>

                        <form className="form" onSubmit={this.handleSubmit}>
                            <fieldset disabled={this.state.formDisabled}>
                                <div className="inputOuter">
                                    <input name="businessname" value={this.state.businessname ? this.state.businessname : ''} type="text" onChange={this.handleChange} />
                                </div>
                                <div className="inputOuter">
                                    <input name="address" value={this.state.address != "" ? this.state.address : ''} placeholder={this.state.address != "" ? '' : "Address"} type="text" onChange={this.handleChange} />
                                </div>
                                <div className="inputOuter">
                                    <input name="businessemail" value={this.state.businessemail ? this.state.businessemail : ''} placeholder="email" type="email" onChange={this.handleChange} />
                                </div>
                                <div className="inputOuter">
                                    <input name="phone_number" value={this.state.phone_number ? this.state.phone_number : ''} placeholder="Phone Number" type="tel" onChange={this.handleChange} />
                                </div>
                                <div className="inputOuter">
                                    <input name="opening_time" value={this.state.opening_time ? this.state.opening_time : ''} placeholder="Opening Time" type="text" onChange={this.handleChange} />
                                </div>
                                <div className="inputOuter">
                                    <input name="closing_time" value={this.state.closing_time ? this.state.closing_time : ''} placeholder="Closing Time" type="text" onChange={this.handleChange} />
                                </div>
                                <div className="menuCheckList">
                                    {menulist}

                                </div>





                                <button className="button" >Submit</button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </section>
        )
    }
}

export default AddBusinessProfilePage