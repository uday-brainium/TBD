import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Route, Link, withRouter, Redirect, NavLink as RRNavLink } from 'react-router-dom'
import { Container, Row, Col, Modal } from "reactstrap";
import Notifications, { notify } from "react-notify-toast";
import ApiService from "../services/api";
import selectStyles from "../styles/select.css";
import Loader from './components/simpleloader'
import IngredientsModal from './Food_menu/ingridientModal'
import './Store/store.css'
let user_id = localStorage.getItem('user-id')

class AddItemPage extends React.Component {
  constructor(props) {
    super(props);

    this.displaySelectOptions = this.displaySelectOptions.bind(this);
    this.hideSelectOptions = this.hideSelectOptions.bind(this);
    this.optionSelected = this.optionSelected.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.optionClicked = this.optionClicked.bind(this);
    this.optionChanged = this.optionChanged.bind(this);

    this.state = {
      optionsShowing: false,
      styledSelectClass: "styledSelect",
      optionsDisplayedStyle: {
        display: "none"
      },
      // option
      option: "",
      value: "",
      optionTextStyle: {
        color: "#9fa5a5"
      },
      user_id: "",
      menuitem: "",
      itemtitle: "",
      itemdescription: "",
      itemcost: "",
      veg: false,
      glutenFree: false,
      getmenudata: [],
      fireRedirect: false,
      menuitem: '',
      loading: false,
      ingredientModal: false,
      ingredientname: '',
      ingredientprice: 0.5,
      ingredientArray: [],
      included: ''
    };
  }



  componentDidMount() {
    let selectedMenu = this.props.history.location.state
    this.setState({menuitem: selectedMenu})
    ApiService.fetchmenuData(user_id)
      .then(res => res.json())
      .then(response => {
        if (response.success) {
          this.state.getmenudata = response.menu
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

  optionChanged(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleChange(event) {
    let name = event.target.name
    if(name == "veg" || name == 'glutenFree') {
      this.setState({ [event.target.name]: event.target.checked });
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    let emptyFields = this.checkEmptyFields();

    if (emptyFields) {
      notify.show("All fields are required", "error", 5000);
    } else {
      try {
        this.setState({loading: true})
        ApiService.additem(this.state.option, this.state.itemtitle, this.state.itemdescription, this.state.itemcost, user_id, this.state.veg, this.state.glutenFree, this.state.ingredientArray)
          .then(res => res.json())
          .then(response => {
            if (response.success) {
              notify.show("Item added successfully", "success", 3000);
              this.setState({loading: false})
            } else {
              notify.show(response.message, "error", 5000);
              this.setState({loading: false})
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    }
  }

  checkEmptyFields() {
    var registerFields = ["option", "itemtitle", "itemdescription", "itemcost"];
    var emptyFields = false;
    for (let registerField of registerFields) {
      if (this.state[registerField] === "") {
        //console.log(registerField + " is empty");
        emptyFields = true;
      }
    }
    return emptyFields;
  }

  changeIngredient = (e) => {
    let name = e.target.name
    let value = e.target.value
    if(name == 'included') {
      this.setState({included: e.target.checked})
    } else {
      this.setState({[name] : value})
    } 
  }

  saveIngredient = () => {
    let array = {
      name: this.state.ingredientname,
      price: this.state.ingredientprice,
      included: this.state.included
    }
    this.state.ingredientArray.push(array)
    console.log('array', this.state.ingredientArray);
  }

  removeingredients = (name) => {
    this.state.ingredientArray.map((data, i) => {
      if(data.name == name) {
        this.state.ingredientArray.splice(i, 1)
        this.setState({test: true})
      }
    })
  }

  render() {
    const { fireRedirect } = this.state
    // console.log(this.props.dataSource);
    var OptionText = "";
    var OptionValueName = "";
    if (this.state.option === "" || this.state.value === "") {
      OptionValueName = "Choose an Option";
    } else {
      OptionText = this.state.option;
      OptionValueName = this.state.value;
    }
    return (
      <div className="right" onClick={this.hideSelectOptions}>
      
        <Notifications />
        <Loader loading={this.state.loading} />
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
            <li>{" > "}</li>
            <li>
              <Link to={"additem"} className="active">
                Add Item
              </Link>
            </li>
          </ul>
        </div>
        <div className="dashboardBody">
          <div className="loginWrapperOuter">
            <div className="loginWrapper">
              <header>Add Item</header>
              <form className="form" onSubmit={this.handleSubmit}>
                <div className="inputOuter">
                  <div className="select" onClick={this.optionClicked}>
                    <select
                      id="menu"
                      name="menuitem"
                      className="s-hidden"
                      value={this.state.menuitem}
                      onChange={this.optionChanged}>
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

                <div className="inputOuter">
                  <input
                    type="text"
                    placeholder="Item title"
                    name="itemtitle"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="textareaOuter">
                  <textarea
                    onChange={this.handleChange}
                    placeholder="Description"
                    name="itemdescription"
                  />
                </div>
                
                <div className="item-ingredients" onClick={() => this.setState({ingredientModal: true})}>
                  <div className="plus-btn"><i className="fas fa-plus-circle"></i> ingredients</div>
                </div>
                
                {this.state.ingredientArray.length > 0 &&
                <div className="ingredients-container">
                  {this.state.ingredientArray.map(data => {
                    return (
                    <div key={data.name} className="ingredient-item">
                       {data.name}
                      <div onClick={() => this.removeingredients(data.name)} style={{float: 'right', marginLeft: 10, color: 'red', fontSize: 18, cursor: 'pointer'}}><i className="fas fa-times-circle"></i></div>
                      <div style={{float: 'right'}}>${data.price}</div> 
                      <div style={{float: 'right', color: 'green', marginRight: 5}}>{data.included == true ? '(Inc)' : ''}</div> 
                    </div>
                    )
                  })
                  }
                </div>}
                
                <IngredientsModal
                 close={() => this.setState({ingredientModal: false})} 
                 show={this.state.ingredientModal} 
                 change={(e) => this.changeIngredient(e)}
                 save = {() => this.saveIngredient()}
                 />
                      
                <Row className="checkbox-row">
                  <Col>
                  <div className="">
                   <label className="checkbox-react">Veg
                      <input type="checkbox" name="veg" defaultChecked={this.state.veg == "on" ? true : false} onChange={this.handleChange} />
                    <span className="checkmark"></span>
                  </label>
                  </div>
                  </Col>

                  <Col>
                    <div className="">
                    <label className="checkbox-react">Gluten Free
                      <input type="checkbox" name="glutenFree" defaultChecked={this.state.glutenFree == 'on' ? true : false} onChange={this.handleChange} />
                      <span className="checkmark"></span>
                    </label>
                    </div>
                  </Col>
                </Row>
                
                <Row>
                  <Col lg={3} md={3} sm={3} xs={3}>
                  <div className="inputOuter unit-field">
                    <select style={{padding: 10, textAlign: 'center', fontSize: 18}}>
                      <option value="$">$</option>
                    </select>
                  </div>
                  </Col>

                  <Col lg={9} md={9} sm={9} xs={9}>
                    <div className="inputOuter">
                    <input
                      type="text"
                      placeholder="Cost"
                      name="itemcost"
                      onChange={this.handleChange}
                    />
                </div>
                  </Col>
                </Row>
                
                <div className="s-hidden">
                  <input
                    type="text"
                    name="itemtitle"
                    onChange={this.handleChange}
                  />
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

export default withRouter(AddItemPage);
