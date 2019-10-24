import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Route, Link, Redirect, withRouter } from "react-router-dom";
import { Container, Row, Col, Nav } from "reactstrap";
import Notifications, { notify } from "react-notify-toast";
import ApiService from "../services/api";
import selectStyles from "../styles/select.css";

let user_id = localStorage.getItem('user-id');



class SearchPage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log("ffff", this.props);
    return (
      <div>
        Kunal
      </div>
    );
  }
}

export default withRouter(SearchPage);
