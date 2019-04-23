import React, { Component } from "react";
import ReactDOM from 'react-dom'
import { Route, Link, Redirect, withRouter } from "react-router-dom"
import { Container, Row, Col, Nav } from 'reactstrap';
import selectStyles from "../styles/select.css";
import Notifications, { notify } from 'react-notify-toast';
import ApiService from '../services/api'
import NoProfileImage from '../images/profile-no-image.jpg'
import LoadingSpinnerView from './views/spinner'
let user_id = localStorage.getItem('user-id')


class EditItemPage extends React.Component {
  constructor(props) {
    super(props)

    this.displaySelectOptions = this.displaySelectOptions.bind(this);
    this.hideSelectOptions = this.hideSelectOptions.bind(this);
    this.optionSelected = this.optionSelected.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.optionClicked = this.optionClicked.bind(this);
    this.optionChanged = this.optionChanged.bind(this);

    this.state = {
      submitDisabled: true,
      formDisabled: false,
      // form properties
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
      getmenudata: [],
      title: '',
      content: '',
      // spinner
      spinnerShowing: false
    }
  }


  componentDidMount() {
    // show spinner
    this.setState({
      spinnerShowing: true
    })

    let itemid = this.props.location.state.dynamicMenuListid;

    ApiService.getItembyID(itemid)
      .then(res => res.json())
      .then(response => {
        if (response.success) {
          this.setState({
            // username: response.data.userID,
            menuitem: response.data.menuitem,
            itemtitle: response.data.itemtitle,
            itemcost: response.data.itemcost,
            itemdescription: response.data.itemdescription
          })

        }
        this.setState({spinnerShowing: false})
      })
      .catch(function (error) {
        console.log("Error Found")
      })
  }



  componentDidMount() {
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
    // show spinner
    this.setState({
      spinnerShowing: true
    })


    let itemid = this.props.location.state.dynamicMenuListid;

    ApiService.getMenuDetailsID(itemid)
      .then(res => res.json())
      .then(response => {
        if (response.success) {
          this.setState({
            // username: response.data.userID,            
            title: response.data.title,
            content: response.data.content
          })

        }
        // hide spinner
        this.setState({
          spinnerShowing: false
        })
      })
      .catch(function (error) {
        console.log("Error Found")
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
    /*this.setState({
      option: e.target.value
    });*/
    this.setState({ [event.target.name]: event.target.value });
  }


  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })

    /*if (!this.checkEmptyFields()) {
      this.setState({
        submitDisabled: false
      })
    }*/
  }

  handleSubmit(e) {
    e.preventDefault()

    /*let emptyFields = this.checkEmptyFields()

    if (emptyFields) {
      notify.show('All fields are required', 'error', 5000);
    }
    else {
     */
    //let userId = localStorage.getItem('user-id')
    let itemid = this.props.location.state.dynamicMenuListid;
    var data = {
      'user_id': user_id,
      'menutitle': this.state.title,
      'menudescription': this.state.content
    }

    ApiService.updatemenubyID(itemid, data)
      .then(res => res.json())
      .then(response => {
        console.log(response)
        if (response.success) {
          notify.show(response.message, 'success', 3000)
          // update local storage
          //localStorage.setItem('full-name', data.fullName)
          this.setState({
            formDisabled: true
          })
          setTimeout(() => {
            this.props.history.push('/menu')
          }, 4000)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    // }
  }



  /*checkEmptyFields() {
    var registerFields = ['itemtitle', 'itemcost', 'itemdescription', 'menuitem']
    var emptyFields = false
    for (let registerField of registerFields) {
      if (this.state[registerField] === '') {
        console.log(registerField + ' is empty')
        emptyFields = true
      }
    }

    return emptyFields
  }*/

  render() {


    var OptionText = "";
    var OptionValueName = "";
    if (this.state.option === "") {
      OptionValueName = "Choose an Option";
    } else {
      OptionText = this.state.menuitem;
      OptionValueName = this.state.option;
    }



    return (
      <div className="right" onClick={this.hideSelectOptions}>
        {/*<LoadingSpinnerView showing={this.state.spinnerShowing} />*/}

        <Notifications options={{ top: '50px' }} />

        <div className="rightSideHeader">
          <ul className="breadcrumbNavigation">
            <li><Link to={'/dashboard'} className="home">Home</Link></li>
            <li>|</li>
            <li><Link to={'/edititem'}>Edit Menu</Link></li>
          </ul>
        </div>
        <div className="dashboardBody">
          <div className="loginWrapperOuter">
            <div className="loginWrapper">
              <header>Edit Menu</header>
              <form className="form" onSubmit={this.handleSubmit}>
                <fieldset disabled={this.state.formDisabled}>
                  {/* <div className="inputOuter">
                                        <input name="username" type="text" value={this.state.username} onChange={this.handleChange} readOnly="true"/>
                                    </div> */}


                  <div className="inputOuter">
                    <input name="title" type="text" value={this.state.title} onChange={this.handleChange} />
                  </div>

                  <div className="textareaOuter">
                    <textarea onChange={this.handleChange} name="content" value={this.state.content} />
                  </div>




                  <button type="submit" /*disabled={this.state.submitDisabled}*/ className="button">Update</button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(EditItemPage)
