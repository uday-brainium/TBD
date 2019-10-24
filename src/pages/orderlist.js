import React,{ Component } from "react";
import ReactDOM from 'react-dom'
import { Route, Link, Redirect, withRouter } from "react-router-dom"
import {
    Container,
    Row,
    Col,
    Nav
} from 'reactstrap'

class OrderList extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className="right">
                <div className="rightSideHeader">
                    <ul className="breadcrumbNavigation">
                        <li>
                            <a href="#" className="home">Home</a>
                        </li>
                        <li>|</li>
                        <li>
                            <a href="#">
                                Orders List
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="dashboardBody">
                    <div className="sms">
                        Select a date range to view details of previous payments
                    </div>
                    <div className="historyTime form">
                        <div className="col-1">
                            <h4>
                                Start Date <span>*</span>
                        </h4>
                        <div className="fieldCol">
                            <input type="text" />
                            <span className="cal" />
                        </div>
                    </div>
                    <div className="col-1">
                        <h4>
                            End Date <span>*</span>
                    </h4>
                    <div className="fieldCol">
                        <input type="text" />
                        <span className="cal" />
                    </div>
                </div>
                <div className="col-3">
                    <button className="buttonOrange">
                        View History
                    </button>
                </div>
            </div>
            <div className="orderTable">
                <div className="header">
                    <div className="order">
                        Order ID
                    </div>
                    <div className="user">User</div>
                    <div className="price">Price($)</div>
                    <div className="orderDate">
                        Order Date
                    </div>
                    <div className="action">Action</div>
                </div>
                <div className="tableRow">
                    <div>1122</div>
                    <div>
                        Maria Anders
                    </div>
                    <div>112</div>
                    <div className="orderDate">
                        12 May 2017
                    </div>
                    <div className="edit-delete">
                        <a href="#">Edit</a> I <a href="#">Delete</a>
                    </div>
                </div>
                <div className="tableRow">
                    <div>1122</div>
                    <div>
                        Maria Anders
                    </div>
                    <div>112</div>
                    <div className="orderDate">
                        12 May 2017
                    </div>
                    <div className="edit-delete">
                        <a href="#">Edit</a> I <a href="#">Delete</a>
                    </div>
                </div>
                <div className="tableRow">
                    <div>1122</div>
                    <div>
                        Maria Anders
                    </div>
                    <div>112</div>
                    <div className="orderDate">
                        12 May 2017
                    </div>
                    <div className="edit-delete">
                        <a href="#">Edit</a> I <a href="#">Delete</a>
                    </div>
                </div>
                <div className="tableRow">
                    <div>1122</div>
                    <div>
                        Maria Anders
                    </div>
                    <div>112</div>
                    <div className="orderDate">
                        12 May 2017
                    </div>
                    <div className="edit-delete">
                        <a href="#">Edit</a> I <a href="#">Delete</a>
                    </div>
                </div>
                <div className="tableRow">
                    <div>1122</div>
                    <div>
                        Maria Anders
                    </div>
                    <div className="orderDate">112</div>
                    <div className="orderDate">
                        12 May 2017
                    </div>
                    <div className="edit-delete">
                        <a href="#">Edit</a> I <a href="#">Delete</a>
                    </div>
                </div>
                <div className="tableRow">
                    <div>1122</div>
                    <div>
                        Maria Anders
                    </div>
                    <div>112</div>
                    <div className="orderDate">
                        12 May 2017
                    </div>
                    <div className="edit-delete">
                        <a href="#">Edit</a> I <a href="#">Delete</a>
                    </div>
                </div>
            </div>
            <div className="paginationWrapper">
                <ul className="pagination">
                    <li>
                        <span className="prev">prev</span>
                    </li>
                    <li>
                        <a href="#">1</a>
                    </li>
                    <li>
                        <span className="next">next</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>

        )
    }
}

export default OrderList
