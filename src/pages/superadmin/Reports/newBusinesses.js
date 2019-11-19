import React, { Component } from 'react';
import ApiService from '../../../services/api';
import { Row, Col } from 'react-bootstrap'
import ExportToExcel from './exportToExcel'

export default class NewBusinesses extends Component {

  state = {
    list: []
  }

  componentDidMount() {
    this.fetchList()
  }

  fetchList = () => {
    ApiService.get_new_business()
    .then(res => {
      if(res.status == 200) {
        this.setState({list: Array.reverse(res.response)})
      }
    })
  }

  deleteBusiness = (id) => {
    const ask = window.confirm('Are you sure to delete business permanently ?')
    if(ask) {
      ApiService.delete_business(id)
      .then(res => {
        if(res.statusCode == 200) {
          this.fetchList()
        }
      })
    } 
  }


  render() {
    const {list} = this.state
    return (
      <div className="editor-box" style={{marginTop: 40}}>
        <Row>
          <Col lg={8}>
            <h6>New registered business (In 30 days)</h6>
          </Col>
          <Col lg={4}>
            <ExportToExcel data={this.state.list} />
          </Col>
        </Row>
       
        
        <div style={{marginTop: 30}}>
        {list.map(business => (
         <div key={business._id} className="editor-box">
            <Row >
              <Col lg={3}> 
                <h6>Name  </h6>
                <p style={{fontSize: 14, marginTop: -2, marginBottom: -2}}>{business.fullName}</p>
              </Col>
              <Col lg={3}> 
                <h6>Business  </h6>
                <p style={{fontSize: 14, marginTop: -2, marginBottom: -2}}>{business.businessname}</p>
              </Col>
              <Col>
                <h6>Email</h6>
                <p style={{fontSize: 14, marginTop: -2, marginBottom: -2}}>{business.email}</p>
              </Col>
              <Col>
                <h6>URL</h6>
                <p style={{fontSize: 14, marginTop: -2, marginBottom: -2}}>/{business.url}</p>
              </Col>

              <Col>
                <h6>Delete</h6>
                 <button style={{backgroundColor: 'red', color: 'white', fontSize: 12}} onClick={() => this.deleteBusiness(business._id)}>Delete permanently</button>
              </Col>
              {/* <Col>
              <span>
                <button className="monitor-btn" onClick={() => onMonitor(business._id, business.businessname)}> Monitor </button>
                <button className="monitor-btn" onClick={() => alert('Are you sure ?')}> Blo </button>
              </span>
              </Col> */}
            </Row>
          </div>          
        ))}
        </div>
          
      </div>
    );
  }
}
