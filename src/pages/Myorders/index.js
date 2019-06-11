import React, { Component } from 'react';
import Notifications, { notify } from 'react-notify-toast';
import Loader from './../components/simpleloader'
import Page_head from './../components/page_head';
import { Row, Col, Modal } from 'react-bootstrap';
import Select from 'react-select';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range'
import './styles.css'
import ApiService from '../../services/api';
import Order_list from './order_list'

const userId = JSON.parse(localStorage.getItem('userdata')).data._id


export default class Myorders extends Component {
  state = {
    loading: false,
    filter: '',
    datePicker: false,
    startDate: null,
    endDate: null,
    orderData: []
  }

  componentDidMount() {
    this.fetchOrders()
  }

  fetchOrders = () => {
    this.setState({loading: true})
    const data = {
      userId,
      status: this.state.filter,
      startDate: this.state.startDate,
      endDate: this.state.endDate
    }
    ApiService.ordersByResturent(data)
    .then(res => res.json())
    .then(response => {
      console.log('orders', response);
      this.setState({ orderData: response.response, loading: false })
    })
  }

  changeFilter = (selected) => {
    this.setState({ filter: selected.value }, () => {
      this.fetchOrders()
    })
  }

  changeDateRange = (value) => {
    this.setState({ startDate: new Date(value.selection.startDate).toLocaleDateString(), endDate: new Date(value.selection.endDate).toLocaleDateString() }, () => {
      this.fetchOrders()
    })
  }

  clearDateFilter = () => {
    this.setState({ startDate: null, endDate: null }, () => {
      this.fetchOrders()
    })
  }

  render() {
    const filter = [
      { value: '', label: 'All' },
      { value: 'ORDERED', label: 'NEW' },
      { value: 'ACCEPTED', label: 'Order accepted' },
      { value: 'READY', label: 'Order ready' },
      { value: 'NOT_ACCEPTED', label: 'Order not accepted' },
      { value: 'CANCELED', label: 'Order canceled' },
      { value: 'COMPLETE', label: 'Order completed' },
      { value: 'REFUND', label: 'Order refunded' },
    ]
    const selectionRange = {
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      key: 'selection',
    }
    return (
      <div className="content-container">
        <div>
          <Page_head title="My orders" icon="fas fa-pizza-slice" />
        </div>
        <Notifications />
        <Loader loading={this.state.loading} fill="no-fill" />
        <div className="container-inside">
          <Row className="top-gap">
            <Col lg={6} md={6} sm={6} xs={6}>
              <Select
                value={this.state.filter}
                onChange={this.changeFilter}
                options={filter}
                classNamePrefix="user-select-res"
              />
            </Col>
            <Col lg={6} md={6} sm={6} xs={6}>
              <i className="fas fa-calendar-week inside-input"></i>
              <input className="daterange-input" onClick={() => this.setState({ datePicker: true })} value={this.state.startDate ? `${this.state.startDate} - ${this.state.endDate}` : `Start date - End Date`} />
              <div className="date-cross" onClick={this.clearDateFilter}><i className="far fa-times-circle"></i></div>
              <Modal id="dateModal" style={{ backgroundColor: 'transparent' }} show={this.state.datePicker} onHide={() => this.setState({ datePicker: false })}>
                <Modal.Body style={{ backgroundColor: 'transparent' }}>
                  <DateRangePicker
                    ranges={[selectionRange]}
                    onChange={this.changeDateRange}
                  />
                </Modal.Body>
                <div className="button-div">
                  <button onClick={() => { this.setState({ datePicker: false }, () => this.fetchOrders()) }}>Apply</button>
                </div>
              </Modal>
            </Col>
          </Row>

          <div className="orderlist-head">
            <i className="fas fa-list"></i> List of orders
          <hr style={{ marginTop: 5 }}></hr>
          </div>

          <Order_list orders={this.state.orderData}/>
        </div>
      </div>
    );
  }
}
