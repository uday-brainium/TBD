import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Route, Link, Redirect, withRouter } from "react-router-dom";
import { Container, Row, Col, Nav } from "reactstrap";
import Notifications, { notify } from "react-notify-toast";

import ApiService from "../services/api";

import LoaderStyle from "../styles/loader.css";

import NoProfileImage from "../images/profile-no-image.jpg";

const token = localStorage.getItem("access-token-tbd");
const userid = localStorage.getItem("user-id");

class ViewProfilePage extends React.Component {
  constructor(props) {
    super(props);

    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.updateProfilePicture = this.updateProfilePicture.bind(this);

    this.state = {
      submitDisabled: false,
      // form properties
      username: "",
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      address: "",
      // profile image
      profilepicture: "",
      // loader
      loaderStyle: {
        display: "none"
      }
    };
  }

  componentDidMount() {
    let userId = localStorage.getItem("user-id");
    let token = localStorage.getItem("access-token-tbd");
    ApiService.profileData(token, userId)
      .then(res => res.json())
      .then(response => {
        // console.log(response)
        if (response.success) {
          var fullName = response.data.fullName.split(" ");
          if (response.data.phone === null && response.data.address === null) {
            this.setState({
              // username: response.data.userID,
              firstname: fullName[0],
              lastname: fullName[1],
              email: response.data.email,
              phone: "",
              address: ""
            });
          } else {
            this.setState({
              // username: response.data.userID,
              firstname: fullName[0],
              lastname: fullName[1],
              email: response.data.email,
              phone: response.data.phone,
              address: response.data.address
            });
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    // set profile picture
    let profileImagePath = localStorage.getItem("profile-image-path");
    if (profileImagePath !== null) {
      this.setState({
        profilepicture: profileImagePath
      });
    } else {
      this.setState({
        profilepicture: NoProfileImage
      });
    }
  }

  componentDidUpdate() { }

  updateProfilePicture() {
    this.props.profilePicUpdated();
  }

  handleFileUpload(e) {
    this.setState({
      submitDisabled: true,
      loaderStyle: {
        display: "block"
      }
    });

    let formData = new FormData();
    formData.append("image", e.target.files[0]);

    ApiService.updateProfilePicture(token, userid, formData)
      .then(res => res.json())
      .then(response => {
        if (response.success) {
          notify.show(response.message, "success", 5000);
          setTimeout(() => {
            // console.log(response.data)
            if (response.data !== null) {
              localStorage.setItem("profile-image-path", response.data);
            }
            this.setState({
              profilepicture: localStorage.getItem("profile-image-path"),
              submitDisabled: false
            });

            // emitter
            this.updateProfilePicture();
          }, 6000);

          // hide loader
          this.setState({
            loaderStyle: {
              display: "none"
            }
          });
        } else {
          notify.show(response.message, "error", 5000);
        }
      });
  }

  render() {
    return (
      <div className="right">
        <div className="loaderView" style={this.state.loaderStyle}>
          <div className="spinner" />
        </div>

        <Notifications options={{ top: "50px" }} />

        <div className="rightSideHeader">
          <ul className="breadcrumbNavigation">
            <li>
              <Link to={"/dashboard"} className="home">
                Home
              </Link>
            </li>
            <li>|</li>
            <li>
              <Link to={"/viewprofile"}>User Profile</Link>
            </li>
          </ul>
        </div>
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="dashboardBody">
            <div className="loginWrapperOuter">
              <div className="loginWrapper">
                <div className="userProfilePhoto">
                  <div className="inner">
                    <img src={this.state.profilepicture} alt="" />
                  </div>

                  <div className="fileupload">
                    <input
                      type="file"
                      name="profile_image"
                      value=""
                      id="profile_image"
                      onChange={this.handleFileUpload}
                      accept="image/*"
                      disabled={this.state.submitDisabled}
                    />
                  </div>
                </div>

                <div className="profile">
                  {/* <div className="inputOuter">
                                    <div className="inner">
                                        <p>{this.state.username}</p>
                                    </div>
                                </div> */}
                  <div className="inputOuter">
                    <div className="inner">
                      <p>{this.state.firstname}</p>
                    </div>
                  </div>
                  <div className="inputOuter">
                    <div className="inner">
                      <p>{this.state.lastname}</p>
                    </div>
                  </div>
                  <div className="inputOuter">
                    <div className="inner">
                      <p>{this.state.email}</p>
                    </div>
                  </div>
                  <div className="inputOuter">
                    <div className="inner">
                      <p>{this.state.phone}</p>
                    </div>
                  </div>
                  <div className="inputOuter">
                    <div className="inner">
                      <p>{this.state.address}</p>
                    </div>
                  </div>
                  <Link to={"/editprofile"} className="button text-center">
                    edit profile
                </Link>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(ViewProfilePage);
