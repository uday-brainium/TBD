import React, { Component } from 'react';
import { Row, Col, Modal, Alert } from 'react-bootstrap';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment'
import ApiService from '../../../services/api';

const time = moment().hour(0).minute(0);
const format = 'h:mm a';
const guest = JSON.parse(localStorage.getItem('guest-userdata'))

export default class componentName extends Component {

  state = {
    name: '',
    mobile: '',
    success: false
  }


  componentDidMount() {
    if(guest == null) {
      this.props.nav.push('login')
    } else {
      this.setState({name: `${guest.firstname} ${guest.lastname}`, mobile: guest.mobile})
    }
  }

  saveReservation = (e) => {
    e.preventDefault()
    this.props.loader(true)
    const {name, mobile, tables, people, date, time, environment} = this.state
    const reservationData = {
      id: guest.businessid,
      guestId: guest._id,
      name,
      mobile,
      tables,
      people,
      date,
      time,
      environment
    }
    ApiService.saveNewReservation(reservationData)
    .then(res => res.json())
    .then(response => {
      this.props.loader(false)
      
      this.setState({success: true}, () => {
        setTimeout(() => {
          this.props.close()
        }, 2000)
      })
    })

  }

  handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    this.setState({ [name]: value })
  }


  renderNumbers = () => {
    let options = []
    let array = Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    array.map((data, i) => {
      options.push(<option key={data} value={data}> {data} </option>)
    })
    return options
  }

  onTimeChange = (value) => {
    this.setState({time: value})
  }

  render() {  
    return (
      <div>
        <Modal
          show={this.props.show}
          onHide={() => this.props.close()}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Book a Table
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              {this.state.success &&
                <Alert variant='success'>
                 Reservation successfull !
                </Alert>
              }
              <form className="reservation-form" onSubmit={this.saveReservation}>
                <Row>
                  <Col>
                    <div className="small-input">
                      <label className="label-small">Name</label>
                      <input
                        // onChange={this.handleChange}
                        type="text" name="name"
                        placeholder="Name"
                        value={this.state.name}
                        disabled="disabled"
                        required
                      />
                    </div>
                  </Col>
                  <Col>
                    <div className="small-input">
                      <label className="label-small">Mobile</label>
                      <input
                        // onChange={this.handleChange}
                        type="text" name="mobile"
                        placeholder="Mobile No."
                        value={this.state.mobile}
                        disabled="disabled"
                        required
                      />
                    </div>  
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="small-input">
                      <label className="label-small">No. of tables</label>
                      <select name="tables" onChange={this.handleChange} required>
                        <option>No of tables</option>
                        {this.renderNumbers()}
                      </select>
                    </div>
                  </Col>

                  <Col>
                    <div className="small-input">
                      <label className="label-small">No. of heads</label>
                      <select name="people" onChange={this.handleChange} required>
                        <option>No of heads</option>
                        {this.renderNumbers()}
                      </select>
                    </div>
                  </Col>

                  <Col>
                    <div className="small-input">
                      <label className="label-small">Date</label>
                      <input min={moment().format("YYYY-MM-DD")} name="date" onChange={this.handleChange} type="date" required />
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <div className="small-input">
                      <label className="label-small">Time arriving</label>
                      <TimePicker
                        id="timereservation"
                        showSecond={false}
                        defaultValue={time}
                        className="xxx"
                        onChange={this.onTimeChange}
                        format='h:mm a'
                        use12Hours
                        inputReadOnly
                      />
                    </div>
                  </Col>
                  <Col>
                    <div className="small-input">
                      <label className="label-small">Environment</label>
                      <select name="environment" onChange={this.handleChange} required>
                        <option value="">Choose environment</option>
                        <option value="outdoor">Outdoor</option>
                        <option value="Indoor">Indoor</option>
                      </select>
                    </div>
                  </Col>
                  <Col></Col>
                </Row>


                <Row>
                  <Col></Col>
                  <Col>
                    <button className="button">Submit</button>
                  </Col>
                  <Col></Col>
                </Row>

              </form>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
