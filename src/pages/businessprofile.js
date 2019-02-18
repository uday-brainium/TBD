import React, { Component } from "react";
import ReactDOM from 'react-dom'
import { Route, Link, Redirect, withRouter } from "react-router-dom"
import {
    Container,
    Row,
    Col,
    Nav
} from 'reactstrap'

// images
import noUserImage from '../images/profile-no-image.jpg'
import foodImage from '../images/food.jpg'
import bannerImage from '../images/business-profile-banner.jpg'

import ApiService from '../services/api'
const currenturl = window.location.href;

const resurl = currenturl.split("/");

console.log('resurl', resurl);
class BusinessProfilePage extends React.Component {
    constructor(props) {
        super(props)

        this.toggleOverlay = this.toggleOverlay.bind(this)
        this.hideOverlay = this.hideOverlay.bind(this)

        this.state = {
            'settingsButtonClass': 'settingsBtn',
            'settingsClass': 'setings',
            // overlay
            'overlayShowing': false,
            'overlayStyle': {
                'display': 'none'
            },
            'settingsIconClass': '',
            // business profile
            'businessname': '',
            'businessemail': '',
            'phone': '',
            'address': '',
            'openingtime': '',
            'closingtime': '',
            'businessProfileSet': false,
            'menu': []
        }
    }

    componentDidMount() {
        // check if business profile has been set up or not
        // show spinner
        this.setState({
            spinnerShowing: true
        })

        let userid = localStorage.getItem('user-id')
        let token = localStorage.getItem('access-token-tbd')
        ApiService.getBusinessProfbyUrl(userid, token)
            .then(res => res.json())
            .then(response => {
                //console.log(response)
                if (response.success) {
                    this.setState({
                        // username: response.data.userID,      
                        url: response.data.url,
                        businessname: response.data.businessname,
                        businessemail: response.data.businessemail,
                        phone: response.data.phone,
                        address: response.data.address,
                        openingtime: response.data.openingtime,
                        closingtime: response.data.closingtime,
                        menu: response.data.menu,
                        bannerImage: response.data.bannerImage
                    })
                } else {
                   // this.props.history.push('/')
                }



                /*const todoItems = this.state.menu.map((todo, index) =>
                    <li key={index}>
                        {todo.title}
                    </li>
                );*/

                // console.log("83", todoItems);

                this.setState({
                    businessProfileSet: true
                })
                // hide spinner
                this.setState({
                    spinnerShowing: false
                })
            })
            .catch(function (error) {
                console.log('err---------', error)
            })


    }

    toggleOverlay() {
        if (this.state.overlayShowing) {
            this.setState({
                'overlayShowing': false,
                'settingsButtonClass': 'settingsBtn',
                'settingsClass': 'setings',
                'overlayStyle': {
                    'display': 'none'
                },
                'settingsIconClass': ''
            })
        }
        else {
            this.setState({
                'overlayShowing': true,
                'settingsClass': 'setings open',
                'settingsButtonClass': 'settingsBtn active',
                'overlayStyle': {
                    'display': 'block'
                },
                'settingsIconClass': 'displayed'
            })
        }
    }

    hideOverlay() {
        if (this.state.overlayShowing) {
            this.setState({
                'overlayShowing': false,
                'settingsButtonClass': 'settingsBtn',
                'settingsClass': 'setings',
                'overlayStyle': {
                    'display': 'none'
                },
                'settingsIconClass': ''
            })
        }
    }



    render() {
        console.log("gggg", this.state.menu);







        /*  if (!this.state.businessProfileSet) {
             return (
                 <Redirect to='/add-business-profile' />
             )
         }
         else {*/
        /*const kunal = this.state.menu.map(recipe => {
            return (<div key={recipe.name}>
                <dt>{recipe.title}</dt>

                <hr></hr>
            </div>
            )
        })*/


        return (
            <div>
                <div className="backoverlay" onClick={this.hideOverlay} style={this.state.overlayStyle}></div>

                <header className="header innerPage">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="businessProfileBanner"

                                style={{ backgroundImage: "url(" + bannerImage + ")" }}
                            >
                                <div className="businessProfileHeader">
                                    <div className="bannerContent">
                                        <div className="bannerright">
                                            <span className="counter hidden">
                                                4.7 <span>/5</span>
                                            </span>
                                            <div className="votes hidden">
                                                683 votes
                                                </div>
                                        </div>
                                        <div className="bannerleft">
                                            <h1>
                                                {this.state.businessname}
                                            </h1>
                                            <p>
                                                {this.state.address}
                                            </p>
                                            <div className="bottomRow">
                                                <span className="phoneNumber">
                                                    {this.state.phone}
                                                </span>
                                                <span className="foodName">
                                                    {this.state.menu.map}

                                                    {
                                                        this.state.menu.map((rowdata, index) => {
                                                            return (<div key={index}>
                                                                {rowdata.title} &nbsp;
                                                            </div>)

                                                        })
                                                    }




                                                </span>
                                                <span className="time">
                                                    {this.state.openingtime} to {this.state.closingtime}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <section className="businessProfiles">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <article className="singleProfile">
                                    <div className="top">
                                        <div className="left">
                                            <div className="photo">
                                                <img src={noUserImage} alt="" />
                                            </div>
                                            <div className="name-add-time">
                                                <h4>
                                                    Arundhuti Bhaumik
                                                    </h4>
                                                <p>
                                                    Kolkata, India
                                                    </p>
                                                <p>
                                                    29 June 2017
                                                    </p>
                                            </div>
                                        </div>
                                        <div className="right">
                                            <div className="postedinfacebook">
                                                <a href="#">
                                                    <span>
                                                        Posted In:
                                                        </span>
                                                </a>
                                            </div>
                                            <div className="date">
                                                <p>
                                                    Date : <span>
                                                        24th May 2018
                                                        </span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bottom">
                                        <p>
                                            Fabulous food! We had ordered Clay pot chicken, Steamed Bhetki, mei fun noodles, yong chow fried rice. Annirudha our host suggested that we have the fried rice just with egg.
                                            </p>
                                        <div className="foodThumbs">
                                            <span>
                                                <img src={foodImage} alt="" />
                                            </span>
                                            <span>
                                                <img src={foodImage} alt="" />
                                            </span>
                                            <span>
                                                <img src={foodImage} alt="" />
                                            </span>
                                            <span>
                                                <img src={foodImage} alt="" />
                                            </span>
                                            <span>
                                                <img src={foodImage} alt="" />
                                            </span>
                                            <span>
                                                <img src={foodImage} alt="" />
                                            </span>
                                            <span>
                                                <img src={foodImage} alt="" />
                                            </span>
                                            <span>
                                                <img src={foodImage} alt="" />
                                            </span>
                                        </div>
                                    </div>
                                </article>
                                <article className="singleProfile">
                                    <div className="top">
                                        <div className="left">
                                            <div className="photo">
                                                <img src={noUserImage} alt="" />
                                            </div>
                                            <div className="name-add-time">
                                                <h4>
                                                    Arundhuti Bhaumik
                                                    </h4>
                                                <p>
                                                    Kolkata, India
                                                    </p>
                                                <p>
                                                    29 June 2017
                                                    </p>
                                            </div>
                                        </div>
                                        <div className="right">
                                            <div className="postedinfacebook">
                                                <a href="#">
                                                    <span>
                                                        Posted In:
                                                        </span>
                                                </a>
                                            </div>
                                            <div className="date">
                                                <p>
                                                    Date : <span>
                                                        24th May 2018
                                                        </span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bottom">
                                        <p>
                                            Fabulous food! We had ordered Clay pot chicken, Steamed Bhetki, mei fun noodles, yong chow fried rice. Annirudha our host suggested that we have the fried rice just with egg.
                                            </p>
                                    </div>
                                </article>
                            </div>
                        </div>
                    </div>
                </section>
                <div className={this.state.settingsButtonClass} onClick={this.toggleOverlay}>
                    <button>+</button>
                </div>
                <div className={this.state.settingsClass}>
                    <ul>
                        <li className={this.state.settingsIconClass}>
                            <a className="becomeAmember">
                                <span>
                                    Become a Member
                                    </span>
                            </a>
                        </li>
                        <li className={this.state.settingsIconClass}>
                            <a className="bookAtable">
                                <span>
                                    Book a Table
                                    </span>
                            </a>
                        </li>
                        <li className={this.state.settingsIconClass}>
                            <a className="foodItems">
                                <span>
                                    Food Items
                                    </span>
                            </a>
                        </li>
                        <li className={this.state.settingsIconClass}>
                            <a className="games">
                                <span>Games</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        )
        // }
    }
}

export default withRouter(BusinessProfilePage)
