import React, { Component } from "react";
import ReactDOM from "react-dom";

import { Link, browserHistory, withRouter, NavLink as RRNavLink } from 'react-router-dom'
import { Container, Row, Col, Nav } from "reactstrap";
import Notifications, { notify } from "react-notify-toast";
import ApiService from "../services/api";
import selectStyles from "../styles/select.css";
import { Route, Redirect, hashHistory } from 'react-router'

// min header
import Minheader from './views/minheader'

// footer
import Footer from './views/footer'

// images
import logo from '../images/logo.png'

let user_id = localStorage.getItem('user-id');

class AddMenuPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menutitle: "",
      menudescription: "",
      user_id: ""
    };


    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    let emptyFields = this.checkEmptyFields();

    if (emptyFields) {
      notify.show("Please add Menu Title", "error", 2000);
    } else {
      try {

        ApiService.addmenu(this.state.menutitle, this.state.menudescription, user_id)
          .then(res => res.json())
          .then(response => {
            if (response.success) {
              notify.show("Menu added successfully", "success", 3000);
              <Redirect to="/additem" />
              /*this.setState({
                formDisabled: true
              });*/
              setTimeout(() => {
                this.props.history.push('/additem');
              }, 4000)

            } else {
              notify.show(response.message, "error", 5000);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    }

    //alert("A name was submitted: " + this.state.menutitle);
    //alert("A name was submitted: " + this.state.menudescription);
  }

  checkEmptyFields() {
    let registerFields = ["menutitle"];
    let emptyFields = false;
    for (let registerField of registerFields) {
      if (this.state[registerField] === "") {
        // console.log(registerField+ ' is empty')
        emptyFields = true;
      }
    }
    return emptyFields;
  }

  render() {
    return (
      <div className="right">
        <Notifications />
        <div className="rightSideHeader">
          <ul className="breadcrumbNavigation">
            <li>
              <Link to={"dashboard"} className="home">
                Home
              </Link>
            </li>
            <li>
              <Link to={"menu"} className="active">
                Menu List
              </Link>
            </li>
            <li>{" > "}</li>
            <li>
              <Link to={"addmenu"} className="active">
                Add Menu
              </Link>
            </li>
          </ul>
        </div>
        <div className="dashboardBody">
          <div className="loginWrapperOuter">
            <div className="loginWrapper">
              <header>Add Menu</header>
              <form className="form" onSubmit={this.handleSubmit}>
                <div className="inputOuter">
                  <input
                    type="text"
                    placeholder="Menu title"
                    name="menutitle"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="textareaOuter">
                  <textarea
                    onChange={this.handleChange}
                    placeholder="Description"
                    name="menudescription"
                  />
                </div>
                <input type="hidden" name="user_id" value={user_id} />
                <input className="button" type="submit" value="Add Menu" />
              </form>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddMenuPage;
