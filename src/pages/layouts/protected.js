import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Link, Redirect, withRouter } from "react-router-dom"
import {
    Container,
    Row,
    Col,
    Nav
} from 'reactstrap'
import Notifications, {notify} from 'react-notify-toast'

class ProtectedLayout extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            'tokenPresent': false,

        }
    }

    componentDidMount(){
        if(localStorage.getItem('access-token-tbd') !== null){
            this.setState({
                tokenPresent: true
            })
        }
    }

    render(){
        // component to be rendered
        const DisplayComp = this.props.component

        if(!this.state.tokenPresent){
            return(
                <div>
                    <h3>Not Authorized</h3>
                </div>
            )
        }
        else{
            return(
                <div className="protectedLayout">
                    <DisplayComp />
                </div>
            )
        }
    }
}

export default withRouter(ProtectedLayout)
