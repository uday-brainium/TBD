import React, { Component } from 'react';
import AddKey from './addKey'
import KeyList from './keyList'
import ApiService from '../../../services/api';
import ActiveKey from './activeKey'
import PayoutCard from './payOutCard'

export default class AccountManagent extends Component {

  state = {
    keyList: []
  }

  componentDidMount() {
    this.fetchList()
  }

  fetchList = () => {
    ApiService.get_keys()
    .then(res => {
      if(res.status == 200) {
        this.setState({keyList: res.response.apiKeys, activeKey: res.response.selectedKey})
      }
    })
  }

  render() {
    return (
      <div className="page-container">
        <h5 className="heading-text"><i className="fas fa-chart-bar"></i> API Keys</h5>
        <hr></hr>

        <div className="content">
          <ActiveKey activeKey={this.state.activeKey} />
          <AddKey updateList={() => this.fetchList()}/>
          <KeyList list={this.state.keyList} activeKey={this.state.activeKey} updateList={() => this.fetchList()}/>
          {/* <PayoutCard /> */}
        </div>
      </div>
    );
  }
}
