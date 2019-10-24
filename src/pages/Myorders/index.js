import React, { Component } from 'react';
import Notifications, { notify } from 'react-notify-toast';
import Loader from './../components/simpleloader'
import Page_head from './../components/page_head'
import { Row, Col, Modal } from 'react-bootstrap'
import Select from 'react-select';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range'
import './styles.css'
import ApiService from '../../services/api';
import Order_list from './order_list'
import Pagination from "react-js-pagination";
import Confirm_pop from './confirm_pop'
import AlertBox from './../components/alertBox'
import * as type from './order_types'
import Payback from './../Payment/payback'

const userId = JSON.parse(localStorage.getItem('userdata')).data._id


export default class Myorders extends Component {
  state = {
    loading: false,
    filter: '',
    datePicker: false,
    startDate: new Date(new Date().setHours(0)) ,
    endDate: new Date(new Date().setHours(12)),
    orderData: [],
    limit: 10,
    skip: 0,

    currentPage: 1,
    totalOrder: 0,

    confirm_pop: false,
    selectedStatus: '',
    orderId: '',
    selectedOrder: {},

    alertBox: false,
    alertMsg: '',
    alertType: ''
  }

  componentDidMount() {
    this.fetchOrders()
  }


  fetchOrders = () => {
    this.setState({loading: true})
    const {filter, startDate, endDate, limit, skip} = this.state
    const data = {
      userId,
      status: filter,
      startDate: startDate != null ? new Date(new Date(startDate).setHours(0) ) : null,
      endDate: endDate != null ?  new Date(new Date(endDate).setHours(12)) : null,

      limit,
      skip
    }
    ApiService.ordersByResturent(data)
    .then(res => res.json())
    .then(response => {
      this.setState({ orderData: response.response,  totalOrder: response.count, loading: false })
    })
  }

  changeFilter = (selected) => {
    this.setState({ filter: selected.value, filter1: selected }, () => {
      this.fetchOrders()
    })
  }

  changeDateRange = (value) => {
    this.setState({ startDate: new Date(value.selection.startDate), endDate: new Date(value.selection.endDate) })
  }

  clearDateFilter = () => {
    this.setState({ startDate: null, endDate: null }, () => {
      this.fetchOrders()
    })
  }

  paginate = (page) => {
    let offset = ((page - 1) * 10)
    console.log("page", page, offset);
    this.setState({ currentPage: page, skip: offset }, () => {
      this.fetchOrders()
    })
  }

  changeOrderStep = (orderid, status) => {
    const data = { orderid, status }
    ApiService.updateOrderStatus(data)
    .then(res => res.json())
    .then(response => {
      console.log(response);
      if(response.status == 200) {
        this.fetchOrders()
        this.setState({confirm_pop: false})
      }
    })
  }

  changeOrderStatus = (data, status) => {
    this.setState({selectedStatus: status, orderId: data.order._id, selectedOrder: data})
    const activeStatus = data.order.status
    const orderId = data.order._id
   if(activeStatus !== type.COMPLETE && activeStatus !== type.REFUND && activeStatus !== type.NOT_ACCEPTED && activeStatus !== type.CANCELED) {

      if(status === type.NOT_ACCEPTED && activeStatus !== type.NOT_ACCEPTED && activeStatus !== type.READY && activeStatus !== type.ACCEPTED) {
        this.setState({confirm_pop: true})
      } 
      else if (status === type.CANCELED && activeStatus !== type.CANCELED) {
        this.setState({confirm_pop: true})
      } 
      else if(status === type.REFUND) {
        this.setState({confirm_pop: true})
      }
      else if(status === type.ACCEPTED) {
        this.changeOrderStep(orderId, status)
      }
      else if(status === type.READY) {
        this.changeOrderStep(orderId, status)
      }
      else if(status === type.COMPLETE) {
        this.changeOrderStep(orderId, status)
        Payback.initiatePayback(data)
      } 
      else if(status === type.ORDERED) {
        this.changeOrderStep(orderId, status)
      }
   }
  }

  popupContinue = (refundAmount = 0, chargeId = '0') => {
    const {selectedStatus, orderId} = this.state 
    if(selectedStatus === type.NOT_ACCEPTED) {
      //Send user a message notification
      //REfund the money to customer
      //Charge the resturent $0.35
      this.changeOrderStep(orderId, selectedStatus)
    } else if(selectedStatus === type.CANCELED) {
      //SImply cancel the order
      this.changeOrderStep(orderId, selectedStatus)
    } else if(selectedStatus === type.REFUND) {
      console.log(refundAmount, chargeId);
      this.setState({loading: true})
      ApiService.refund_amount(refundAmount * 100, chargeId)
      .then(res => res.json())
      .then(response => {
        if(response.status == "succeeded") {
        //  console.log('Refund-test', response);
          this.changeOrderStep(orderId, selectedStatus)
          this.setState({
            loading: false, 
            alertBox: true, 
            alertMsg: 'Refund successfull',
            alertType: 'ok'
          }, () => {
              setTimeout(() => {
              this.setState({alertBox: false})
            }, 1500)
          })
        } else {
          this.setState({
            loading: false, 
            alertBox: true, 
            alertMsg: 'Refund failed !',
            alertType: 'failed'
          }, () => {
            setTimeout(() => {
              this.setState({alertBox: false})
            }, 1500)
          })
        }
      })
    }
  }


  render() {
    const filter = [
      { value: '', label: 'All' },
      { value: type.ORDERED, label: 'NEW' },
      { value: type.ACCEPTED, label: 'Accepted orders' },
      { value: type.READY, label: 'Order ready' },
      { value: type.NOT_ACCEPTED, label: 'Rejected orders' },
      { value: type.CANCELED, label: 'Canceled orders' },
      { value: type.COMPLETE, label: 'Completed orders' },
      { value: type.REFUND, label: 'Refunded orders' },
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
        <AlertBox show={this.state.alertBox} type={this.state.alertType} message={this.state.alertMsg} />
        <Confirm_pop 
          show={this.state.confirm_pop}
          close={() => this.setState({confirm_pop: false})}
          status = {this.state.selectedStatus}
          data = {this.state.selectedOrder}
          onContinue={(refundAmount, chargeId) => this.popupContinue(refundAmount, chargeId)}
        />
        <Loader loading={this.state.loading} fill="no-fill" />
        <div className="container-inside">
          <Row className="top-gap">
            <Col lg={6} md={6} sm={6} xs={6}>
              <Select
                value={this.state.filter1}
                onChange={this.changeFilter}
                options={filter}
                classNamePrefix="user-select-res"
              />
            </Col>
            <Col lg={6} md={6} sm={6} xs={6}>
              <i className="fas fa-calendar-week inside-input"></i>
              <input className="daterange-input" onClick={() => this.setState({ datePicker: true })} value={this.state.startDate ? `${new Date(this.state.startDate).toLocaleDateString()} - ${new Date(this.state.endDate).toLocaleDateString()}` : `Start date - End Date`} />
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
          <Order_list changeStatus = {(data, status) => this.changeOrderStatus(data, status)} orders={this.state.orderData}/>
        </div>
        <div className="pagination-view">
          <Pagination
            activePage={this.state.currentPage}
            itemsCountPerPage={this.state.limit}
            totalItemsCount={this.state.totalOrder}
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
    );
  }
}
