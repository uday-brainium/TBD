import React, { Component } from 'react';
import ApiService from '../../services/api';
import { Alert } from 'react-bootstrap';
import { Row, Col, Modal } from 'react-bootstrap';
const userid = localStorage.getItem('user-id')

export default class Settings extends Component {

  state = {
    tables: 0,
    indoortables: 0,
    outdoortables: 0,
    error: false,
    successfull: false,
    preferred: false
  }

  handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    const checked = e.target.checked
    if(name == 'preferred') {
      this.setState({[name]: checked})
    } else {
      this.setState({[name]: value})
    }

  }

  saveSettings = (e) => {
    e.preventDefault()
    const {tables, indoortables, outdoortables, preferred} = this.state
    if(tables != '') {
      this.setState({error: false})
      this.props.loader(true)
      const data = {
        tables,
        indoortables,
        outdoortables,
        preferred
      }
      ApiService.saveReservation(userid, data)
      .then(res => res.json())
      .then(response => {
        this.props.loader(false)
        this.props.update()
        this.setState({successfull: true}, () => {
          setTimeout(() => {
            this.props.close()
          }, 2000)
        })
      })
    } else {
      this.setState({error: true})
    }
  }

  render() {
    return (
      <Modal
      show={this.props.show}
      onHide={() => this.props.close()}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
      <div className="settings-container">
        <div className="reservation-heading">Reservation settings</div>
        <center>
        {this.state.successfull &&<Alert variant='success'>
            Total seats updated successfully !
          </Alert> }
        <div className="reservation-form">

          <form className="form" onSubmit={this.saveSettings}>
          <Row>
            <Col>
              <div className="inputOuter">
                <label>Total tables *</label><br></br>
                <input maxLength={4} placeholder="Total tables" type="text" name="totaltables" onChange={(e) => this.setState({tables: e.target.value})} required/>
              </div>
              {this.state.error && <span style={{color: 'red', fontSize: 14, marginTop: -20}}>Please fill out this field</span>}
            </Col>    
          </Row>
          <Row>
            <Col>
            <div className="inputOuter">
                <label>Indoor tables</label><br></br>
                <input type="text" 
                  name="indoortables" 
                  placeholder="Indoor table's count" 
                  maxLength={3} 
                  onChange={this.handleChange}
                  required/>
              </div>
            </Col>
            <Col>
              <div className="inputOuter">
                <label>Outdoor tables</label><br></br>
                <input type="text" 
                  placeholder="Outdoor table's count"
                  maxLength={3}
                  name="outdoortables"
                  onChange={this.handleChange}
                  required/>
              </div>
            </Col>
          </Row>
          {/* <Row>
            <Col>
              <label className="checkbox-react">Enable preferred reservation for loyality card holders
                <input type="checkbox" name="preferred" defaultChecked={this.state.preffered} onChange={this.handleChange} />
                <span className="checkmark"></span>
              </label>
            </Col>
          </Row> */}
            <button className="button" type="submit" name="submit">
                save
            </button>
          </form>
    
        </div>
        </center>
      </div>
      </Modal.Body>
    </Modal>
    );
  }
}
