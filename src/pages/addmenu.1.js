import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Route, Link, Redirect, withRouter } from "react-router-dom";
import { Container, Row, Col, Nav } from "reactstrap";

import selectStyles from "../styles/select.css";

class AddMenuPage extends React.Component {
  constructor(props) {
    super(props);

    this.displaySelectOptions = this.displaySelectOptions.bind(this);
    this.hideSelectOptions = this.hideSelectOptions.bind(this);
    this.optionSelected = this.optionSelected.bind(this);

    this.state = {
      optionsShowing: false,
      styledSelectClass: "styledSelect",
      optionsDisplayedStyle: {
        display: "none"
      }
    };
  }

  displaySelectOptions() {
    this.setState({
      optionsShowing: true,
      styledSelectClass: "styledSelect active",
      optionsDisplayedStyle: {
        display: "block"
      }
    });
  }

  hideSelectOptions() {
    if (this.state.optionsShowing) {
      this.setState({
        optionsShowing: false,
        styledSelectClass: "styledSelect",
        optionsDisplayedStyle: {
          display: "none"
        }
      });
    }
  }

  optionSelected(option = "") {
    if (option !== " ") {
      this.setState({
        option: option
      });
    }
  }

  render() {
    return (
      <div className="right" onClick={this.hideSelectOptions}>
        <div className="rightSideHeader">
          <ul className="breadcrumbNavigation">
            <li>
              <a href="#" className="home">
                Home
              </a>
            </li>
            <li>|</li>
            <li>
              <a href="#" className="active">
                Menu item add
              </a>
            </li>
          </ul>
        </div>
        <div className="dashboardBody">
          <div className="loginWrapperOuter">
            <div className="loginWrapper">
              <header>Menu Item Add</header>
              <form className="form">
                <div className="inputOuter">
                  <div className="select">
                    <select id="menu2" className="s-hidden">
                      <option value="">Menu names</option>
                      <option value="India">Menu 1</option>
                      <option value="usa">Menu 2</option>
                      <option value="australia">Menu 3</option>
                    </select>
                    <div
                      className={this.state.styledSelectClass}
                      onClick={this.displaySelectOptions}
                    >
                      Menu 1
                    </div>
                    <ul
                      className="options"
                      style={this.state.optionsDisplayedStyle}
                    >
                      <li rel="">Menu names</li>
                      <li rel="India">Menu 1</li>
                      <li rel="usa">Menu 2</li>
                      <li rel="australia">Menu 3</li>
                    </ul>
                  </div>
                </div>

                <div className="inputOuter">
                  <input type="text" placeholder="Item title" value="" />
                </div>
                <div className="textareaOuter">
                  <textarea name="" id="" placeholder="Description" />
                </div>
                <div className="inputOuter">
                  <input type="text" value="" placeholder="Cost" />
                </div>
                <button className="button">Add item</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddMenuPage;
