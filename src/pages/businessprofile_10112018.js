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
            'businessProfileSet': false
        }
    }

    componentDidMount() {
        // check if business profile has been set up or not
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
        console.log(this.state.businessProfileSet)
        if (!this.state.businessProfileSet) {
            return (
                <Redirect to='/add-business-profile' />
            )
        }
        else {
            return (
                <div>
                    <div className="backoverlay" onClick={this.hideOverlay} style={this.state.overlayStyle}></div>

                    <header className="header innerPage">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="businessProfileBanner">
                                    <div className="businessProfileHeader">
                                        <div className="bannerContent">
                                            <div className="bannerright">
                                                <span className="counter">
                                                    4.7 <span>/5</span>
                                                </span>
                                                <div className="votes">
                                                    683 votes
                                                </div>
                                            </div>
                                            <div className="bannerleft">
                                                <h1>
                                                    JW Marriott Hotel Kolkata - Asia
                                                </h1>
                                                <p>
                                                    4A, JBS Haldane Avenue, Tangra, Kolkata, West Bengal 700105
                                                </p>
                                                <div className="bottomRow">
                                                    <span className="phoneNumber">
                                                        033 30990158
                                                    </span>
                                                    <span className="foodName">
                                                        Asian, Thai, Chinese
                                                    </span>
                                                    <span className="time">
                                                        7pm to 11:45pm
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
        }
    }
}

export default withRouter(BusinessProfilePage)
