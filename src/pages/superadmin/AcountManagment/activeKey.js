import React, { Component } from 'react';
import './styles.css'


export default class ActiveKey extends Component {

  render() {
    const {activeKey} = this.props
    return (
      <div className="editor-box">
      <h6>Active API key (Using for receiving payments )</h6>

        <div className="api-key" >
          <p style={{color: 'green', fontSize: 14, marginBottom: 10, marginLeft: 5}}>API Key</p>
          <i className="key">{activeKey}</i> <span className="active-btn1" >Active</span>
        </div>


      </div>
    );
  }
}
