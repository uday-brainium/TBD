import React, { Component } from 'react';
import { withRouter } from "react-router-dom"

class Registration_complete extends Component {

  goToDashBoard = () => {
    this.props.history.push(`/${this.props.store}`)
  }

  render() {
    return (
      <div className="animated zoomIn">
        <div className="reistraion-done-container">
          <i class="fas fa-check done-icon"></i>
          <div className="done-head-text">
            Registration completed !
          </div>
          <div className="done-sub-text">
           Thank you to be a member. Now you can enjoy the member services .
          </div>
          <div>
            <button onClick={this.goToDashBoard} className="btn btn-info done-btn">Continue</button>
          </div>
        </div>
     </div>
    );
  }
}


export default withRouter(Registration_complete)