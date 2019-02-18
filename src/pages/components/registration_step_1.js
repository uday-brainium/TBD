import React, { Component } from 'react';


export default class Step1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <div className="inputOuter">
            <input placeholder="First Name" type="text" name="firstname" onChange={(e) => this.props.change(e)} />
        </div>

        <div className="inputOuter">
            <input placeholder="Last Name" type="text" name="lastname" onChange={(e) => this.props.change(e)} />
        </div>

        <div className="inputOuter">
            <input placeholder="Email Address" type="email" name="email" onChange={(e) => this.props.change(e)} />
        </div>

        <div className="inputOuter">
            <input placeholder="Password" type="password" name="password" onChange={(e) => this.props.change(e)} />
        </div>

        <div className="inputOuter">
            <input placeholder="Confirm Password" type="password" name="confirmPassword" onChange={(e) => this.props.change(e)} />
        </div>

        <div className="singleCheckbox">
            <input id="terms" type="checkbox" name="terms" defaultChecked={this.state.chkbox} onChange={(e) => this.props.change(e)} />
            <label htmlFor="terms"><span></span>I agree to the <em>Privacy Policy</em> and <em>Terms</em> of Use</label>
        </div>
      </div>
    );
  }
}
