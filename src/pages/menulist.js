import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Route, Link, Redirect, withRouter } from "react-router-dom";
import { Container, Row, Col, Nav } from "reactstrap";
import Notifications, { notify } from "react-notify-toast";
import ApiService from "../services/api";
import selectStyles from "../styles/select.css";

let user_id = localStorage.getItem('user-id');

class MenuListPage extends React.Component {
  constructor(props) {
    super(props);

    this.displaySelectOptions = this.displaySelectOptions.bind(this);
    this.hideSelectOptions = this.hideSelectOptions.bind(this);
    this.optionSelected = this.optionSelected.bind(this);
    this.optionChanged = this.optionChanged.bind(this);
    this.addNew = this.addNew.bind(this);
    this.menus = this.menus.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.optionClicked = this.optionClicked.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      optionsShowing: false,
      styledSelectClass: "styledSelect",
      optionsDisplayedStyle: {
        display: "none"
      },
      submitDisabled: true,
      // option
      option: "",
      value: "",
      optionTextStyle: {
        color: "#9fa5a5"
      },
      // item
      item: "",
      getmenudata: [],
      getmenulistdata: [],
      getSearchResult: []
    };
  }

  componentDidMount() {
    ApiService.fetchmenuData(user_id)
      .then(res => res.json())
      .then(response => {
        if (response.success) {

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

    ApiService.fetchmenuitemData(user_id)
      .then(menulistres => menulistres.json())
      .then(menulistresponse => {
        if (menulistresponse.success) {
          this.state.getmenulistdata = menulistresponse.menu

        }
        else {
          notify.show(menulistresponse.message, 'error', 5000);
        }
      })
      .catch(function (menullisterror) {
        console.log(menullisterror);
      })
  }
  optionClicked(event) {
    event.preventDefault();
    ApiService.fetchmenuData(user_id)

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
  optionSelected(option = "", value = "") {
    if (option !== " " || value !== "") {
      this.setState({
        option: option,
        value: value,
        optionTextStyle: {
          color: "#000"
        }
      });
    }
  }
  addNew(type) {
    if (type === "menu") {
      this.props.history.push("/addmenu");
    } else {
      this.props.history.push("/additem");
    }
  }
  menus(menus) {
    this.props.history.push("/menus");
  }

  optionChanged(event) {
    /*this.setState({
      option: e.target.value
    });*/

    this.setState({ [event.target.name]: event.target.value });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    let emptyFields = this.checkEmptyFields();
    if (emptyFields) {
      notify.show("All fields are required", "error", 5000);
    } else {
      try {
        ApiService.searchmenu(this.state.option, this.state.itemname, user_id)
          .then(res => res.json())
          .then(response => {

            if (response.success) {
              if (response.total === 1) {

                this.state.getSearchResult = response.menu;

              }
              else {
                notify.show("Sorry! no result found", "error", 5000);
              }

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
    console.log("form submited");
  }

  /* delete(dynamicMenuList) {
     const newState = this.state.getmenulistdata.slice();
     if (newState.indexOf(dynamicMenuList) > -1) {
       newState.splice(newState.indexOf(dynamicMenuList), 1);
       this.setState({ getmenulistdata: newState })
     }
 
   }*/

  delete(dynamicMenuList) {

    ApiService.deletemenuitemData(dynamicMenuList._id)
      .then(menulistres => menulistres.json())
      .then(menulistresponse => {
        if (menulistresponse.success === true) {
          const newState = this.state.getmenulistdata.slice();
          if (newState.indexOf(dynamicMenuList) > -1) {
            newState.splice(newState.indexOf(dynamicMenuList), 1);
            this.setState({ getmenulistdata: newState })
          }
        }
        else {
          notify.show(menulistresponse.message, 'error', 5000);
        }
      })
      .catch(function (menullisterror) {
        console.log(menullisterror);
      })
  }

  update(dynamicMenuList) {

    //console.log(dynamicMenuList._id);
    this.props.history.push({
      pathname: "/edititem",
      state: {
        dynamicMenuListid: dynamicMenuList._id
      }
    });

  }

  checkEmptyFields() {
    var registerFields = ["option", "itemname"];
    var emptyFields = false;
    for (let registerField of registerFields) {
      if (this.state[registerField] === "") {
        //console.log(registerField + " is empty");
        emptyFields = true;
      }
    }
    return emptyFields;
  }

  render() {

    /*if (this.state.getmenudata._id == this.state.getmenulistdata.menuitem) {
      console.log("svfv", this.state.getmenudata.title);
    }*/

    var OptionText = "";
    var OptionValueName = "";
    if (this.state.option === "" || this.state.value === "") {
      OptionValueName = "Choose an Option";
    } else {
      OptionText = this.state.option;
      OptionValueName = this.state.value;
    }



    const menuListID = this.state.getmenudata
      .map((dynamicData, index) => {
        return (
          <div key={index}>
            {dynamicData._id}
          </div>
        )
      })




    const itemList = this.state.getmenulistdata
      .map((dynamicMenuList, index) => {
        return (
          <div className="tableRow" key={index}>
            <div>{dynamicMenuList.itemtitle}</div>
            <div>
              {this.state.getmenudata
                .filter(function (menuid) {
                  return menuid._id === dynamicMenuList.menuitem
                })
                .map((dynamicData, index) => {
                  return (
                    <div key={index}>
                      {dynamicData.title}
                    </div>
                  )
                })
              }

            </div>
            <div className="cost">${dynamicMenuList.itemcost}</div>
            <div className="edit-delete">
              <a onClick={this.update.bind(this, dynamicMenuList)} >Edit</a> <span>I</span> <a onClick={this.delete.bind(this, dynamicMenuList)} >Delete</a>

            </div>
          </div>
        );
      })



    const itemSerachList = this.state.getSearchResult
      .map((dynamicSearchMenuList, index) => {
        return (
          <div className="tableRow" key={index}>
            <div>{dynamicSearchMenuList.itemtitle}</div>
            <div>
              {this.state.getmenudata
                .filter(function (searchmenuid) {
                  return searchmenuid._id === dynamicSearchMenuList.menuitem
                })
                .map((dynamicSearchData, index) => {
                  return (
                    <div key={index}>
                      {dynamicSearchData.title}
                    </div>
                  )
                })
              }

            </div>
            <div className="cost">${dynamicSearchMenuList.itemcost}</div>
            <div className="edit-delete">
              <a onClick={this.update.bind(this, dynamicSearchMenuList)} >Edit</a> <span>I</span> <a onClick={this.delete.bind(this, dynamicSearchMenuList)} >Delete</a>

            </div>
          </div>
        );
      })

    const finalsearchresultCount = this.state.getSearchResult.length;


    if (finalsearchresultCount >= 1) {
      console.log("318", this.state.numberofresult);
      var finalsearchresult = itemSerachList;
    } else {
      console.log("321", this.state.numberofresult);
      var finalsearchresult = itemList;
    }



    return (
      <div className="right" onClick={this.hideSelectOptions}>
        <Notifications />
        <div className="rightSideHeader">
          <ul className="breadcrumbNavigation">
            <li>
              <Link to={"dashboard"} className="home">
                Home
              </Link>
            </li>
            <li>|</li>
            <li>
              <a className="active">Menu</a>
            </li>
          </ul>
        </div>
        <div className="dashboardBody">
          <div className="topButtons">
            <div className="addRow">
              <button className="orange" onClick={() => this.addNew("menu")}>+add menu</button>
              <button className="orange" onClick={() => this.addNew("item")}>+add item</button>
              <button className="orange" onClick={() => this.menus("menus")}>Menu List</button>
            </div>
          </div>
          <h4>Search</h4>
          <form className="searchContainer form" onSubmit={this.handleSubmit}>
            <div className="left">
              <div className="first">
                <div className="col-1">
                  <div className="fieldCol">
                    <div className="select" onClick={this.optionClicked}>
                      <select id="menu" name="menuitem" className="s-hidden" value={this.state.option} onChange={this.optionChanged}>
                        {this.state.getmenudata.map((dynamicData, index) => {
                          return (
                            <option key={dynamicData._id} value={dynamicData._id}>
                              {dynamicData.title}
                            </option>
                          );
                        })}
                      </select>
                      <div
                        className={this.state.styledSelectClass}
                        onClick={this.displaySelectOptions}
                      >
                        <span style={this.state.optionTextStyle}>
                          {OptionValueName}
                        </span>
                      </div>
                      <ul
                        className="options"
                        style={this.state.optionsDisplayedStyle}
                      >
                        {this.state.getmenudata.map((dynamicData, index) => {
                          return (
                            <li
                              key={dynamicData._id}
                              onClick={() => this.optionSelected(dynamicData._id, dynamicData.title)}
                            >
                              {dynamicData.title}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-1">
                  <div className="fieldCol">
                    <input type="text" name="itemname" placeholder="Item" onChange={this.handleChange}
                    />
                  </div>
                </div>
              </div>

            </div>
            <div className="right">
              <button className="buttonOrange" /*disabled={this.state.submitDisabled}*/>Search </button>
            </div>
          </form>
          <div className="searchTable">
            <div className="header">
              <div className="">Item</div>
              <div className="">Menu</div>
              <div className="">Cost</div>
              <div className="">Action</div>
            </div>


            {finalsearchresult}
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
    );
  }
}

export default withRouter(MenuListPage);
