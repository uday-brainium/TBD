import React, { Component } from 'react';
import ApiService from '../../../services/api';
import { Table, Row, Col } from 'reactstrap';

export default class OnlineList extends Component {

  state = {
    list: []
  }

  componentDidMount() {
    ApiService.get_online_business()
      .then(res => {
        if (res.status == 200) {
          this.setState({ list: res.result })
        }
      })
  }

  render() {
    return (
      <div className="editor-box">
       <Row>
          <Col><h6 style={{ marginBottom: 20 }}>Online businesses</h6></Col>
          <Col>Total online: <span style={{color: 'green', marginLeft: 10, fontWeight: 'bold'}}>{this.state.list.length}</span></Col>
      </Row>
        
        <div classNam="table-overflow">
          <Table>
            <thead>
              <tr>
                <th>Business name</th>
                <th>Email</th>
                <th>Url</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {this.state.list.map(business => (
                <tr>
                  <td>{business.businessname}</td>
                  <td>{business.email}</td>
                  <td>{business.url}</td>
                  <td style={{ color: 'green' }}>Online</td>
                </tr>
              ))}
            </tbody>

          </Table>
          {this.state.list.length < 1 &&
            <h4 style={{ margin: 20, textAlign: 'center' }}>No online businesses</h4>
          }
        </div>
      </div>

    );
  }
}
