import React, { Component } from 'react';
import './styles.css'


export default class ActiveKey extends Component {

  render() {
    const {Key, secret} = this.props
    console.log("PROPS", this.props);
    
    return (
      <div className="editor-box">
      <h6>Active API key (Using for receiving payments )</h6>

        <div className="api-key" >
          <p style={{fontSize: 14, marginBottom: 10, marginLeft: 5}}>
            Key: <b>{Key}</b>
          </p>
          <p style={{fontSize: 14, marginBottom: 10, marginLeft: 5}}>
            Secret: <b>{secret}</b>
          </p>
        </div>


      </div>
    );
  }
}
