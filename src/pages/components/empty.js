import React, { Component } from 'react';


export default class Empty extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <center>
        <div className="empty-body">
            <p className="empty-text">{this.props.text}</p>
        </div>
      </center>
    );
  }
}
