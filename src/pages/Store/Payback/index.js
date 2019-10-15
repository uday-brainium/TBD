import React, { Component } from 'react';
import ApiService from '../../../services/api';

export default class Payback extends Component {

  

  componentDidMount() {
    ApiService.get_keys()
    .then(res => {
      console.log("Res", res);
      
    })
  }

  render() {
    return (
      <div> textInComponent </div>
    )
  }
}
