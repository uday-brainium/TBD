import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
}
    from "react-router-dom";

import MainLayout from '../pages/layouts/main'

const accessToken = localStorage.getItem('access-token-tbd')

class PrivateRoute extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        // console.log(this.props.component)
    }

    render() {
        if (accessToken !== null) {
            return (
                <div>
                    <MainLayout component={this.props.component} />
                </div>
            )
        }
        /*else if(this.props.authentication && this.props.layout == null){
            return(
                <Route component={this.props.component} />
            )
        }*/
        else {
            return (
                <Redirect to="/login" />
            )
        }
    }
}

export default PrivateRoute
