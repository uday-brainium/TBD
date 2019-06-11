import React, { Component } from "react";
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { fetchUserData, set_usertype } from '../actions/user_action'
import { Route, Link, Redirect, withRouter } from "react-router-dom"


class DashboardPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      usertype: ''
    }
  }

  componentDidMount() {
    let userid = localStorage.getItem('user-id')
    let token = localStorage.getItem('access-token-tbd')
    this.props.fetchUserData(userid, token).then(() => {
      //   console.log("PROPS", this.props);
    })
  }

  UNSAFE_componentWillReceiveProps(nextProps, prevState) {
    if (nextProps.userdata.userdata != null) {
      let usertype = nextProps.userdata.userdata.userType
      let privilage = nextProps.userdata.userdata.privilage
      this.setState({ usertype, privilage })
      localStorage.setItem('user-type', usertype)
      localStorage.setItem('subuser-access', privilage)
    }
  }

  render() {
    const { usertype } = this.state

    return (
      <div className="right">
        <div className="rightSideHeader">
          <ul className="breadcrumbNavigation">
            <li><Link to={'/dashboard'} className="home">Home</Link></li>
            <li><Link to={'/dashboard'} className="">Welcome to dashboard</Link></li>
          </ul>
        </div>
        <div className="dashboardBody">
          <div className="dashBoardList">
            <div className="listBox colorCode1">
              <div className="content">
                <div className="inner">
                  <div className="counter">
                    <div className="number">
                      <span>58</span>
                    </div>
                  </div>
                </div>
              </div>
              <h3>User Registered</h3>
            </div>
            <div className="listBox colorCode2">
              <div className="content">
                <div className="inner">
                  <div className="counter">
                    <div className="number">
                      <span>8</span>
                    </div>
                  </div>
                </div>
              </div>
              <h3>Orders Placed</h3>
            </div>
            <div className="listBox colorCode3">
              <div className="content">
                <div className="inner">
                  <div className="counter">
                    <div className="number">
                      <span>12</span>
                    </div>
                  </div>
                </div>
              </div>
              <h3>Events Booked</h3>
            </div>
            <div className="listBox colorCode4">
              <div className="content">
                <div className="inner">
                  <div className="counter">
                    <div className="number">
                      <span>77</span>
                    </div>
                  </div>
                </div>
              </div>
              <h3>Loyalty Points Earned</h3>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    userdata: state.primaryuserdata
  }
}

export default connect(mapStateToProps, { fetchUserData, set_usertype })(withRouter(DashboardPage))