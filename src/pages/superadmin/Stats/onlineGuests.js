import React, { Component } from 'react';
import ApiService from '../../../services/api';
import { Row, Col, Table } from 'react-bootstrap'

export default class OnlineGuestList extends Component {

  state = {
    list: []
  }

  componentDidMount() {
    ApiService.get_online_guests()
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
        <Col><h6 style={{ marginBottom: 20 }}>Online Guest Users</h6></Col>
        <Col>Total online: <span style={{color: 'green', marginLeft: 10, fontWeight: 'bold'}}>{this.state.list.length}</span></Col>
      </Row>
        
        <div className="table-overflow">
          <Table>
            <thead>
              <tr>
                <th>User name</th>
                <th>Email</th>
                <th>City</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {this.state.list.map(business => (
                <tr>
                  <td>{business.firstname} {business.lastname}</td>
                  <td>{business.email}</td>
                  <td>{business.city}</td>
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
