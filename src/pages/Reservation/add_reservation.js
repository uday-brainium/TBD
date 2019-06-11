import React, { Component } from 'react';
import { Row, Col, Modal, Alert } from 'react-bootstrap';
import moment from 'moment'
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import ApiService from '../../services/api';
import Select from 'react-select';

const time = moment().hour(0).minute(0);
const format = 'h:mm a';

const resturentId = JSON.parse(localStorage.getItem('userdata')).data._id

export default class Add_reservation extends Component {
  state = {
    done: false,
    booked: false,
    morethanAvail: false,
    selectedOption: '',
    mobile: ''
  }

  handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    this.setState({[name] : value})
  }

  saveReservation = (e) => {
    e.preventDefault()
    this.props.loader(true)
    const {name, mobile, preferred, tables, people, date, time, environment, selectedOption} = this.state
    const reservationData = {
      id: resturentId,
      guestId: 0,
      name,
      mobile,
      tables,
      people,
      date,
      time,
      environment,
      preferred: preferred == 'yes' ? true : false
    }
    ApiService.saveNewReservation(reservationData)
    .then(res => res.json())
    .then(response => {
      if(response.status == 200) {
        this.props.loader(false)
        this.props.update()
        this.setState({done: true}, () => {
         setTimeout(() => {
          this.props.close()
         }, 2000) 
        })  
      } else if(response.status == 403) {
        this.props.loader(false)
        this.setState({done: false, booked: true})
      } else if(response.status == 405) {
        this.props.loader(false)
        this.setState({done: false, booked: false, morethanAvail: true})
      }
    })
  }

  renderNumbers = () => {
    let options = []
    let array = Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    array.map((data, i) => {
      options.push(<option key={data} value={data}> {data} </option>)
    })
    return options
  }

  renderGuests = () => {
    let list = []
    const {guests} = this.props
    guests.map(data => {
      list.push({ value: data._id, label: `${data.firstname} ${data.lastname}` })
    })
    return list
  }

  onTimeChange = (value) => {
    this.setState({time: value})
  }

  handleChangeUser = (selectedOption) => {
    this.setState({ selectedOption });
    const selected = selectedOption.value
    this.props.guests.map(data => {
      if(data._id == selected) {
        this.setState({mobile: data.mobile})
      }
    })
    console.log(`Option selected:`, selectedOption);
  }

  render() {
    const options = [
      { value: 'chocolate', label: 'Chocolate' },
      { value: 'strawberry', label: 'Strawberry' },
      { value: 'vanilla', label: 'Vanilla' }
    ]
    const {selectedOption} = this.state
    return (
      <div>
         <Modal
          show={this.props.show}
          onHide={() => this.props.close()}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
         
          <Modal.Body >
          <div className="settings-container">
            <div className="reservation-heading">Add reservation</div>
            {this.state.done &&<Alert variant='success'>
              Reservation successfull !
             </Alert> }
             {this.state.booked &&<Alert variant='danger'>
              All tabled has been booked !
             </Alert> }
             {this.state.morethanAvail &&<Alert variant='danger'>
              Not available please decrease table count !
             </Alert> }
            <form className="reservation-form" onSubmit={this.saveReservation}>
              <Row>
                <Col>
                   <div className="small-input">
                    <label className="label-small">Select user</label>
                    {/* <Select
                      value={selectedOption}
                      onChange={this.handleChangeUser}
                      options={this.renderGuests()}
                      classNamePrefix="user-select-res"
                    /> */}
                    <input 
                     onChange={this.handleChange}
                     type="text" name="name"
                     placeholder="Name"
                     required
                     />
                  </div>
                </Col>
                  
                <Col>
                  <div className="small-input">
                    <label className="label-small">Mobile</label>
                    <input 
                      onChange={this.handleChange} 
                      value={this.state.mobile}
                      type="text" name="mobile" 
                      placeholder="Mobile No."
                      maxLength="11"
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
                      <option value=''>No of heads</option>
                      {this.renderNumbers()}
                    </select>
                  </div>
                </Col>

                <Col>
                  <div className="small-input">
                    <label className="label-small">Date</label>
                    <input name="date" onChange={this.handleChange} type="date" />
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

                <Col>
                 {/* <div className="small-input">
                    <label className="label-small">Loyality card holder</label>
                    <select name="preferred" onChange={this.handleChange} required>
                      <option value="">Choose </option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div> */}
                </Col>
              </Row>

              <Row>
                <Col lg={3} md={3} sm={3} xs={0}></Col>
                <Col lg={6} md={6} sm={6} xs={0}>
                  <button style={{width: '100%'}} className="new-button" type="submit" name="submit">Submit</button>
                </Col>
                <Col lg={3} md={3} sm={3} xs={0}></Col>
              </Row>

            </form>
          </div>
          </Modal.Body>
        </Modal>


      </div>
      
    );
  }
}
