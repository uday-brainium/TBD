import React, { Component } from 'react';
import PrivacyModal from './privacy_pop'
import TermsModal from './terms_pop'
import ApiService from '../../services/api';


export default class Step1 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      privacy_pop: false,
      terms_pos: false,
      privacyText: '',
      termsText: ''
    }
  }

  componentDidMount() {
    ApiService.fetch_privacy()
    .then(res => {
      if(res.status == 200) {
        this.setState({
          privacyText: res.response.privacy.privacy,
          termsText: res.response.privacy.terms
        })
      }
    })
  }

  render() {
    return (
      <div>
        <PrivacyModal show={this.state.privacy_pop} data={this.state.privacyText} close={() => this.setState({privacy_pop: false})}/>
        <TermsModal show={this.state.terms_pos} data={this.state.termsText} close={() => this.setState({terms_pos: false})}/>
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
            <label htmlFor="terms"><span></span>I agree to the <em onClick={() => this.setState({privacy_pop: true})} style={{color: 'blue'}}>Privacy Policy</em> and <em onClick={() => this.setState({terms_pos: true})} style={{color: 'blue'}}>Terms</em> of Use</label>
        </div>
      </div>
    );
  }
}
