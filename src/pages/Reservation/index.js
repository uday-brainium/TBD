import React, { Component } from 'react';
import Loader from './../components/simpleloader'
import { Base_url } from './../../utilities/config'
import Notifications, { notify } from 'react-notify-toast';
import Page_head from './../components/page_head';
import { Row, Col, Modal } from 'react-bootstrap';
import Add_reservation from './add_reservation'
import Settings from './setting'
import './style.css'
import ApiService from '../../services/api';
import Pagination from "react-js-pagination";
import Empty from './../components/empty'
import moment from 'moment'
import Select from 'react-select';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range'
import TimeModal from './timeModal'
import ConfirmPop from './confirm_pop'
import Reservation_list from './reservation_list'

const userId = JSON.parse(localStorage.getItem('userdata')).data._id

export default class Reservation_admin extends Component {

  state = {
    loading: false,
    filter1: '',
    stage: '',
    add_reservation_modal: false,
    settings_modal: false,
    reservationList: [],
    reservationDetails: {},
    totalBooked: 0,
    currentPage: 1,
    offset: 0,
    totalReservation: 0,
    perpage: 10,

    guestList: [],

    startDate: null,
    endDate: null,
    datePicker: false,

    timeModal: false,
    timeData: {},
    countDown: '00:00',
    waitTime: 0
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('userdata'))
    if (user == null) {
      this.props.history.push('login')
    } else {
      this.setState({ loading: true })
      ApiService.get_guest(userId)
        .then(res => res.json())
        .then(response => {
          this.setState({ guestList: response.response, loading: false })
        })
      this.updateDetails()
    }
  }

  updateDetails = () => {
    this.setState({loading: true})
    const data = {
      resturentId: userId,
      offset: this.state.offset,
      perpage: this.state.perpage,
      stage: this.state.stage,
      startDate: this.state.startDate,
      endDate: this.state.endDate
    }
    ApiService.getReservations(data)
      .then(res => res.json())
      .then(response => {
        this.setState({ reservationList: response.response, totalReservation: response.count, loading: false }, () => {
          this.getTotalBookingDetails()
        })
      })

    ApiService.getBookingDetails(userId)
      .then(res => res.json())
      .then(response => {
        this.setState({ reservationDetails: response.response })
      })
      ApiService.getWaitTime(userId)
      .then(res => res.json())
      .then(response => {
        this.setState({ waitTime: response.response, })
      })
  }


  changePage = (page) => {
    this.setState({ page })
  }

  paginate = (page) => {
    let offset = ((page - 1) * 5)
    console.log("page", page, offset);
    this.setState({ currentPage: page, offset }, () => {
      this.updateDetails()
    })
  }

  changeFilter1 = (selected) => {
    this.setState({filter1: selected, stage: selected.value}, () => {
      this.updateDetails()
    })
  }

  changeDateRange = (value) => {
    this.setState({startDate: new Date(value.selection.startDate).toLocaleDateString(), endDate: new Date(value.selection.endDate).toLocaleDateString()})
  }

  clearDateFilter = () => {
    this.setState({startDate: null, endDate: null}, () => {
      this.updateDetails()
    })
  }

  presentClick = (data) => {
    const rid = data.reservation.resturentId
    if(data.reservation.stage < 1) {
      this.setState({timeModal: true, timeData: data})
    }
  }


 wait_timer = (rid, duration) => {
    let timer = 0, minutes, seconds;
    let name = `${rid}timer`
     name = setInterval(() => {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        if (++timer < 0) {
            timer = duration;
        }
        this.setState({[`countDown_${rid}`]: `${minutes} : ${seconds}`})
        if(timer < 1) {
          clearInterval(name)
         // this.updateStage(rid, 2, null)
        }
        
    }, 1000);
}

// 
  saveWaitTme = (rid, time) => {
    this.wait_timer(rid, (60 * time))
    const currentTime = new Date().getTime()
    this.updateStage(rid, 1, currentTime, null)
  }

  updateStage = (rid, stage, startTime, endTime) => {
    const update = {
      rid, stage, startTime, endTime
    }
    ApiService.updateStage(update)
    .then(res => res.json())
    .then(response => {
      if(response.status == 200) {
        this.setState({timeModal: false})
        this.updateDetails()
      } 
    })
  }

  satOnClick = (data) => {
    const rid = data.reservation._id
    const stage = data.reservation.stage
    const currentTime = new Date().getTime()
    if(stage < 3)
    this.updateStage(rid, 3, null, currentTime)
  }

  completeClick = (data) => {
    const rid = data.reservation._id
    this.updateStage(rid, 4, null)
  }

  deleteReservation = (data) => {
    const rid = data.reservation._id
    ApiService.deleteReservation(rid)
    .then(res => res.json())
    .then(response => {
      console.log(response);
      this.updateDetails()
    })
  }

  openReadyConfirm = (data) => {
    this.setState({timeData: data},() => {
     const stage = data.reservation.stage
      if(stage < 2)
        this.setState({ready: true})
    })
  }

  onReadyClick = (data) => {
    const rid = data.reservation._id
    const stage = data.reservation.stage
    if(stage < 2)
     this.setState({ready: false})
     this.updateStage(rid, 2, null)
  }

  getTotalBookingDetails = () => {
    let onGoing = []
    this.state.reservationList.map(data => {
      if(data.reservation.stage != 4) {
        onGoing.push(data)
      }
    })
    setTimeout(() => {
      this.setState({totalBooked: onGoing.length})
    }, 1000)
  }

  render() {
    const { add_reservation_modal, waitTime, settings_modal, reservationDetails, perpage, totalReservation, guestList, reservationList } = this.state
    const totalTables = reservationDetails.totalseats
    const booked = this.state.totalBooked
    const available = totalTables - booked

    const filter2 = [
      { value: '', label: 'All' },
      { value: '1', label: 'Present' },
      { value: '2', label: 'Table ready' },
      { value: '3', label: 'Sat on table' },
      { value: '4', label: 'Completed' },
    ]
    const selectionRange = {
			startDate: this.state.startDate ,
			endDate: this.state.endDate,
			key: 'selection',
		}

    return (
      <div className="reservation-container">

        <div>
          <Page_head title="Reservation" icon="fas fa-hotel" />
        </div>
        <Notifications />
        <Loader loading={this.state.loading} />
        <Add_reservation
          show={add_reservation_modal}
          close={() => this.setState({ add_reservation_modal: false })}
          loader={(loader) => this.setState({ loading: loader })}
          update={this.updateDetails}
          guests={guestList}
        />
        <Settings
          show={settings_modal}
          close={() => this.setState({ settings_modal: false })}
          loader={(loader) => this.setState({ loading: loader })}
          update={this.updateDetails}
        />
        <TimeModal waitTime={this.state.waitTime} data={this.state.timeData} onSave={(rid, time) => this.saveWaitTme(rid, time)} show={this.state.timeModal} close={() => this.setState({timeModal: false})} />
        <Loader loading={this.state.loading} fill="no-fill" />
        <ConfirmPop onSave={(data) => this.onReadyClick(data) } data={this.state.timeData} show={this.state.ready} close={() => this.setState({ready: false})} />
        {/* <ConfirmPop onSave={(data) => this.onReadyClick(data) } data={this.state.timeData} show={this.state.ready} close={() => this.setState({ready: false})} /> */}
        <div className="container">
          <div className="settings-container">
            <div className="reservation-heading">Reservation's</div>
            <div className="top-buttons">
              <Row>
                <Col>
                  <button onClick={() => this.setState({ add_reservation_modal: true })} className="new-button"><i className="fas fa-plus-circle"></i> Add reservation</button>
                </Col>
                <Col>
                  <button onClick={() => this.setState({ settings_modal: true })} className="new-button"><i className="fas fa-cogs"></i> Configure</button>
                </Col>
              </Row>
            </div>
            <center>
              <div className="reservation-blocks">
                <Row>
                  <Col className="block block1">
                    <div className="block-head">Available</div>
                    <div className="block-text">{isNaN(available) ? 0 : available}</div>
                  </Col>

                  <Col className="block block2">
                    <div className="block-head">Reserved</div>
                    <div className="block-text">{booked}</div>
                  </Col>

                  <Col className="block block3">
                    <div className="block-head">Total</div>
                    <div className="block-text">{totalTables}</div>
                  </Col>
                  <Col className="block block4">
                    <div className="block-head">Avg Wait Time</div>
                    <div className="block-text">{(waitTime / 60).toFixed(2)} m</div>
                  </Col>
                </Row>
              </div>

              <div className="reservation-list-head">
                <div><i className="fas fa-list"></i> List of reservations </div>
                <div style={{ float: 'right', position: 'absolute', right: 0}}>
                  <Pagination
                    activePage={this.state.currentPage}
                    itemsCountPerPage={perpage}
                    totalItemsCount={totalReservation}
                    pageRangeDisplayed={5}
                    onChange={this.paginate}
                    prevPageText="Prev"
                    nextPageText="Next"
                    activeClass="pagination-active"
                    activeLinkClass="pagination-active-link"
                    itemClass="pagination-item"
                    hideFirstLastPages={true}
                    linkClass="pagination-link-class"
                  />
                </div>
              </div>
              <hr></hr>
              <Row className="top-gap">
                <Col lg={6} md={6} sm={6} xs={6}>
                  <Select
                    value={this.state.filter2Selected}
                    onChange={this.changeFilter1}
                    options={filter2}
                    classNamePrefix="user-select-res"
                  />
                </Col>
                <Col lg={6} md={6} sm={6} xs={6}>
                <i className="fas fa-calendar-week inside-input"></i>
                  <input className="daterange-input" onClick={() => this.setState({datePicker: true})} value={this.state.startDate ? `${this.state.startDate} - ${this.state.endDate}`  : `Start date - End Date`} />
                  <div className="date-cross" onClick={this.clearDateFilter}><i className="far fa-times-circle"></i></div>
                  <Modal id="dateModal" style={{backgroundColor: 'transparent'}} show={this.state.datePicker} onHide={() => this.setState({datePicker: false})}>
                    <Modal.Body style={{backgroundColor: 'transparent'}}>
                      <DateRangePicker
                      ranges={[selectionRange]}
                      onChange={this.changeDateRange}
                    />

                    </Modal.Body>
                    <div className="button-div">
                      <button onClick={() => {this.setState({datePicker:false}, () => this.updateDetails())} }>Apply</button>
                    </div>
                  </Modal>
                </Col>
                </Row>

                <Reservation_list 
                  reservationList={this.state.reservationList}
                  deleteReservation = {(data) => this.deleteReservation(data)}
                  presentClick = {(data) => this.presentClick(data)}
                  openReadyConfirm = {(data) => this.openReadyConfirm(data)}
                  satOnClick = {(data) => this.satOnClick(data)}
                  completeClick = {(data) => this.completeClick(data)}
                  state = {this.state}
                />
         

            </center>
          </div>

        </div>

      </div>
    );
  }
}
