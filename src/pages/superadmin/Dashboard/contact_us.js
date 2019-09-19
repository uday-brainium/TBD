import React, { Component } from 'react';
import ApiService from '../../../services/api';
import Pagination from "react-js-pagination";
import './style.css'

export default class ContactUs extends Component {

  state = {
    messagesList: [],
    limit: 10,
    skip: 0,
    count: 0,
    currentPage: 1
  }

  componentDidMount() {
    this.fetchList()
  }

  fetchList = () => {
    const data = { skip: this.state.skip, limit: this.state.limit }
    ApiService.fetch_contact_messages(data)
    .then(res => {
      if (res.status == 200) {
        console.log("TEST", res);
        this.setState({ messagesList: res.result, count: res.count })
      }
    })
  }

  paginate = (page) => {
    let offset = ((page - 1) * 10)
    this.setState({ currentPage: page, skip: offset }, () => {
      this.fetchList()
    })
  }

  render() {
    const { messagesList } = this.state
    return (
      <div className="content-container">
        <h5 className="heading-text"><i className="fas fa-sliders-h"></i> User messages</h5>
        <hr></hr>

        <div className="container-inside">
          {messagesList.map(data => (
            <div className="message-list" key={data._id}>
              <b>User email</b> - {data.from} <br></br>
              <b>User name</b> - {data.name} <br></br>
              <b>Contact reason</b> - {data.reason} <br></br>
              <b>Message</b> - {data.body}
            </div>
          ))}
        </div>
        <div className="pagination-view" style={{float: 'right', marginRight: 20}}>
          <Pagination
            activePage={this.state.currentPage}
            itemsCountPerPage={this.state.limit}
            totalItemsCount={this.state.count}
            pageRangeDisplayed={10}
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
