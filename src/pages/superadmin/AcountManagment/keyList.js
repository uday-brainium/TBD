import React, { Component } from 'react';
import ApiService from '../../../services/api';
import './styles.css'


export default class KeyList extends Component {

  removeApiKey = (keyId) => {
    let ask = window.confirm("Are you sure to delete ?")
    if(ask) {
      ApiService.remove_key(keyId)
      .then(res => {
        this.props.updateList()
      })
    }
  }

  activateKey = (key, secret) => {
    ApiService.active_key(key, secret)
    .then(res => {
      console.log("1", res);
      this.props.updateList()
    })
  }

  render() {
    const {list, activeKey} = this.props
    return (
      <div className="editor-box">
      <h6>Stripe API key List</h6>

      {list.map(key => (
        <div className="api-key-inactive" key={key.id}>
          <p style={{color: 'green', fontSize: 14, marginBottom: 10, marginLeft: 5}}>API Key & Secret</p>
          <p style={{fontSize: 14, marginBottom: 10, marginLeft: 5}}>
            Key: <b>{key.key}</b>
          </p>
          <p style={{fontSize: 14, marginBottom: 10, marginLeft: 5}}>
            Secret: <b>{key.secret}</b>
          </p>
          {key.key != activeKey.key && <span className="active-btn1" onClick={() => this.activateKey(key.key, key.secret)}>Active</span> }
          {key.key != activeKey.key && <span className="remove-btn1" onClick={() => this.removeApiKey(key.id)}>Remove</span> }
        </div>
      ))}

      </div>
    );
  }
}
