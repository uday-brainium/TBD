import React, { Component } from 'react';

export default class Page_title extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
     <div>
        <div className="heading"><i className={this.props.fa_icon_class}></i> {this.props.title} </div>
     </div>
    );
  }
}
