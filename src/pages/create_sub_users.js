import React, { Component } from 'react';
import '../styles/style_sheet.css'
import { Route, Link, Redirect, withRouter } from "react-router-dom";
import { Alert } from 'reactstrap';
import ApiService from '../services/api'
import Notifications, { notify } from 'react-notify-toast';

class Create_sub_users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      mobile: '',
      priviliage: 'admin',

      emailErr: false
    };

    console.log(this.props.history);
    
  }

  handleChange = (e) => {
    let value = e.target.value
    let name = e.target.name
    this.setState({[name]: value})
    this.validate()
  }

  validate = () => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(String(this.state.email).toLowerCase())) {
      return false
    } else {
      return true
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let data = {
      businessid: localStorage.getItem('user-id'),
      usertype: 'subuser',
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      mobile: this.state.mobile,
      privilage: this.state.priviliage
    }
    if(!this.validate()) {
      notify.show('Email is invalid', 'error', 3000);
    } else {
    ApiService.create_sub_user(data)
    .then((res) => res.json())
    .then((response) => {
      if(response.status == 200) {
         notify.show('Sub user registered successfully', 'success', 3000);
         setTimeout(() => {
          this.props.history.push('/list_sub_users')
         }, 3000)
      } else if(response.status == 409) {
        // alert('email already exist')
        notify.show('Email already exist', 'error', 3000);
      }
    })
  }
}

  render() {
    const {priviliage} = this.state
    return (
      <div className="right">
        <Notifications />
          <div className="rightSideHeader">
            <ul className="breadcrumbNavigation">
                <li><i className="fas fa-users breadcumb-icon"></i></li>
                <li className="breadcumb-text"><span className="left-space">Create sub users</span></li>
            </ul>
          </div>

          <div className="container-inside">
          <form className="form" onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6">
                <div className="inputOuter">
                    <input name="firstname" type="text" placeholder="First name" onChange={this.handleChange} required/>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6">
                <div className="inputOuter">
                    <input name="lastname" type="text" placeholder="Last name" onChange={this.handleChange} required/>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6">
                <div className="inputOuter">
                    <input name="email" type="text" placeholder="Email address" onChange={this.handleChange} required/>
                    <span className="err">{this.state.emailErr ? 'Please enter valid email' : '' }</span>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6">
                <div className="inputOuter">
                    <input name="mobile" type="text" placeholder="Mobile number" onChange={this.handleChange} required/>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6">
                <p className="privilage-text">Select privilages</p>
                <div className="inputOuter">
                  <select name="privilage" onChange={(e) => this.setState({priviliage: e.target.value})}>
                    <option value="admin">Administrator</option>
                    <option value="manager">Manager</option>
                    <option value="editor">Editor</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6">
                <div className="privilage-info-text">
                  {priviliage == 'admin' &&
                    <div className="alert alert-success animated pulse">
                     * Administrator has the access to create update & delete 
                    food menu, food item, view orders , manage orders, etc. 
                    </div>
                  }
                  {priviliage == 'manager' &&
                    <div className="alert alert-info animated pulse">
                    * Manager can access to orders , users and food items but manager
                    can not delete any records. 
                    </div>
                  }
                  {priviliage == 'editor' &&
                    <div className="alert alert-warning animated pulse">
                      * Editor has access to create & edit food menu, food item.
                    </div>
                  }
                </div>
              </div>
            </div>
            

            <div className="row">
              <div className="col-lg-3 col-md-3 col-sm-3">
              </div>

              <div className="col-lg-6 col-md-6 col-sm-6">
                <button type="submit" disabled={false} className="button">Create sub user</button>
              </div>

              <div className="col-lg-3 col-md-3 col-sm-3">
              </div>
            </div>
            
           </form>
          </div>
      </div>
    );
  }
}

export default withRouter(Create_sub_users);