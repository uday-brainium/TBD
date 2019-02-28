import React, { Component } from 'react';
import Apiservice from './../../services/api'
import './../../styles/style_sheet.css'
import { Route, Link, Redirect, withRouter } from "react-router-dom";
import Notifications, { notify } from 'react-notify-toast';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import Loader from './../components/simpleloader'
import Skeleton from 'react-skeleton-loader';
import Empty from './../components/empty'
import Pagination from "react-js-pagination";

let base_image_url = "https://www.doublesat.com:8080/"

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventList: [],
      modal: false,
      searchkey: '',

      editTitle : '',
      editDate: '',
      editStartTime: '',
      editEndTime: '',
      editDetails: '',
      editPrice: '',

      totalEvents: 0,
      offset: 0,
      limit: 10,
      currentpage: 1,

      loading: false
    };
  }

  componentDidMount() {
    this.setState({dataLoading: true})
    let businessid= localStorage.getItem('user-id')
    let data = {
      businessid,
      limit: this.state.limit,
      searchkey: this.state.searchkey
    }
    Apiservice.get_all_events(data)
    .then((res) => res.json())
    .then((response) => {
      this.setState({eventList: response.response, totalEvents: response.count, dataLoading: false})
      console.log('sdaasd',response);
    })
  }

  editEvent = (data) => {
    this.setState({
      modal: true,
      businessid: localStorage.getItem('user-id'),
      editDate: data.date,
      editDetails: data.description,
      editTitle: data.title,
      editPrice: data.ticketPrice,
      editStartTime: data.startTime,
      editEndTime: data.endTime
    })
  }

  toggle = () => {
    this.setState({modal: !this.state.modal})
  }

  deleteEvent = (data) => {
    this.setState({loading: true})
    Apiservice.delete_event(data._id)
    .then((res) => res.json())
    .then((response) => {
      this.setState({loading: false})
      this.updateData()
    })
  }

  updateData = () => {
    this.setState({dataLoading: true})
    let businessid= localStorage.getItem('user-id')
    let data = {
      businessid,
      searchkey: this.state.searchkey,
      offset: this.state.offset,
      limit: this.state.limit
    }
    Apiservice.get_all_events(data)
    .then((res) => res.json())
    .then((response) => {
      this.setState({eventList: response.response, totalEvents: response.count, dataLoading: false})
    })
  }

  paginate = (page) => {
    let offset = ((page -1) * 10)
    console.log("page", page, offset);
    this.setState({currentpage: page, offset}, () => {
      this.updateData()
    })
  }
  clearSearchInput = () => {
    this.setState({searchkey: ''},() => {
      this.updateData()
    })
  }

  handleChange = (e) => {
    let value = e.target.value
    let name = e.target.name
    this.setState({[name]: value})
  }

  searchUsers = () => {
    this.setState({dataLoading: true})
    let key = this.state.searchkey
    let businessid= localStorage.getItem('user-id')
    let data = {
      businessid,
      searchkey: key,
      offset: this.state.offset,
      limit: this.state.limit,
    }
    Apiservice.get_all_events(data)
    .then((res) => res.json())
    .then((response) => {
      this.setState({eventList: response.response, totalEvents: response.count, dataLoading: false})
    })
  }

  goToCreateSub = () => {
    this.props.history.push('/add_new_event')
  }

  render() {
    const eventList = this.state.eventList
    .map((eventList, index) => {
        return (
          <div className="tableRow" key={index}>
            <div>{eventList.title}</div>
            <div>{eventList.eventtype}</div>
            {/* <div><img src={`${base_image_url}${eventList.eventbanner}`} /></div> */}
            <div className="edit-delete">
              <a onClick={() => this.editEvent(eventList)}>Edit</a> <span>I</span> <a onClick={() => this.deleteEvent(eventList)} >Delete</a>
            </div>
          </div>
        );
      })
  
    return (
        <div className="right">
        <Notifications />
        <Loader loading={this.state.loading}/>
        <Modal show={this.state.modal} onHide={this.toggle} className="modal-view">
            <Modal.Header closeButton>
              <Modal.Title className="modal-title">Edit event</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body">
            <Row>
            <form className="form" onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="inputOuter">
                      <input name="editTitle" type="text" value={this.state.editTitle} placeholder="Event title" onChange={this.handleChange} required/>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="inputOuter">
                      <input name="editDate" type="date" className="date-picker" value={this.state.editDate} placeholder="Last name" onChange={this.handleChange} required/>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="inputOuter">
                      <input value={this.state.editStartTime} name="editStartTime" type="text" placeholder="Start time" onChange={this.handleChange} required/>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="inputOuter">
                      <input name="editEndTime" type="text" value={this.state.editEndTime} placeholder="Mobile number" onChange={this.handleChange} required/>
                  </div>
                </div>
              </div>
  
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="inputOuter">
                  <input name="editPrice" type="text" value={this.state.editPrice} placeholder="Ticket price" onChange={this.handleChange} required/>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  
                </div>
              </div>
              
  
              <div className="row">
                <div className="col-lg-3 col-md-3 col-sm-3">
                </div>
  
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <button type="submit" disabled={false} className="button">Edit event</button>
                </div>
  
                <div className="col-lg-3 col-md-3 col-sm-3">
                </div>
              </div>
              
             </form>
            </Row>
            </Modal.Body>
            
          </Modal>
          <div className="rightSideHeader">
            <ul className="breadcrumbNavigation">
                <li><i className="fas fa-calendar-week breadcumb-icon"></i></li>
                <li className="breadcumb-text"><span className="left-space">Events management</span></li>
            </ul>
          </div>
          <div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-0">
               <div className="form gap">
                <Row>
                  <Col xs={6} lg={6} md={6}>
                    <div className="inputOuter">
                        <i onClick={this.clearSearchInput} className="far fa-times-circle input-clear"></i>
                        <input className="search-input" name="searchkey" type="text"  placeholder="Search events" value={this.state.searchkey} onChange={this.handleChange}/>
                    </div>
                  </Col>
                  <Col xs={6} lg={6} md={6}>
                   <button onClick={this.searchUsers} type="submit" disabled={false} className="button search-btn">Search</button>
                  </Col>
                  </Row>
                </div>
              </div>
              <div className="col-lg-2 col-md-2 col-sm-2">
              </div>
              <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
              <button onClick={this.goToCreateSub} className="add-btn right" ><i class="fas fa-plus-circle "></i> Add new event</button>
              </div>
            </div>
          </div>
          
           <div className="searchTable top-fix">
              <div className="header">
                <div className="">Eventname</div>
                <div className="">Event type</div>
                {/* <div className="">Time</div> */}
                <div className="">Action</div>
              </div>
    
              {this.state.dataLoading ? 
                <Skeleton count={10} width='90%' /> : 
                eventList.length > 0 ? 
                eventList :
                <Empty text="No events found !"/>
              }
            </div>
  
            <div className="paginationWrapper">   
              <Pagination
                activePage={this.state.currentpage}
                itemsCountPerPage={10}
                totalItemsCount={this.state.totalEvents}
                pageRangeDisplayed={5}
                onChange={this.paginate}
                prevPageText="Prev"
                nextPageText="Next"
                activeClass = "pagination-active"
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

export default withRouter(Events);