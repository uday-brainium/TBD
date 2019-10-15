import React, { Component } from 'react';
import './../Dashboard/style.css'
import ApiService from '../../../services/api';

export default class AddApiKey extends Component {

  state = {
    key: ''
  }

  formSubmit = (e) => {
    e.preventDefault()
    const {key} = this.state
    ApiService.add_key(key)
    .then(res => {
      console.log("res", res);
      this.props.updateList()
    })
  }
  
  render() {
    return (
      <div className="editor-box">
        <h6>Add Stripe API key </h6>
        <div>
          <form onSubmit={this.formSubmit}>
            <label style={{marginBottom: -15, color:'green', marginTop: 10}}>Add a new stripe API key</label><br></br>
            <input type="text" onChange={(e) => this.setState({key: e.target.value})} name="key" placeholder="Enter API Key" />
            <input style={{marginLeft: 10, width: 100}} type="submit" value="Add Key" />
          </form>
        </div>
      </div>
    );
  }
}
