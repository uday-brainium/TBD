import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Notifications, { notify } from "react-notify-toast";
import ApiService from "../services/api";
import selectStyles from "../styles/select.css";

let user_id = localStorage.getItem('user-id');

class MenusPage extends Component {
  constructor(props) {
    super(props);

    this.displaySelectOptions = this.displaySelectOptions.bind(this);
    this.hideSelectOptions = this.hideSelectOptions.bind(this);
    this.optionSelected = this.optionSelected.bind(this);
    this.optionChanged = this.optionChanged.bind(this);
    this.addNew = this.addNew.bind(this);
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
      getmenulistdata: []
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
      alert("ok");
    }
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
    //console.log(dynamicMenuList._id); return;
    this.props.history.push({
      pathname: "/editmenu",
      state: {
        dynamicMenuListid: dynamicMenuList._id
      }
    });

  }

  checkEmptyFields() {
    var registerFields = ["option", "item"];
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

    const itemList = this.state.getmenudata
      .map((dynamicMenuList, index) => {
        return (
          <div className="tableRow" key={index}>
            <div>{dynamicMenuList.title}</div>
            <div className="edit-delete">
              <a onClick={this.update.bind(this, dynamicMenuList)} >Edit</a> <span>I</span> <a onClick={this.delete.bind(this, dynamicMenuList)} >Delete</a>

            </div>
          </div>
        );
      })

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
                    <input type="text" name="item" placeholder="Item" onChange={this.handleChange}
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
              <div className="">Menu</div>
              <div className="">Action</div>
            </div>
            {itemList}
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

export default withRouter(MenusPage);
