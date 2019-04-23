import React, { Component } from 'react';
import Apiservice from '../../services/api'
import './../../styles/style_sheet.css'
import { Route, Link, Redirect, withRouter } from "react-router-dom";
import Notifications, { notify } from 'react-notify-toast';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import Loader from '../components/simpleloader'
import Skeleton from 'react-skeleton-loader';
import Empty from '../components/empty'
import Pagination from "react-js-pagination";
import Page_head from '../components/page_head';


class Sub_users_list extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subUserList: [],
      totalSubUser: 0,
      currentPage: 1,
      offset: 0,
      modal: false,
      loading: false,
      dataLoading: false,
      searchkey: '',

      editPrivilage: 'admin',
      editFirstName: '',
      editLastName: '',
      editMobile: '',
      editEmail: '',
      editUserid: ''
    };
  }

  componentDidMount() {
    this.setState({dataLoading: true})
      let userId = localStorage.getItem('user-id')
      Apiservice.get_sub_user(String(userId))
      .then((res) =>  res.json())
      .then((response) => {
          this.setState({subUserList: response.response, totalSubUser: response.count, dataLoading: false})
      })
  }

  update = () => {
    this.setState({dataLoading: true})
    let userId = localStorage.getItem('user-id')
    let offset = this.state.offset
    Apiservice.get_sub_user(String(userId), offset)
    .then((res) =>  res.json())
    .then((response) => {
        this.setState({subUserList: response.response, totalSubUser: response.count, dataLoading: false})
    })
  }

  editSubUser = (userdata) => {
    let firstname = userdata.fullName.substr(0,userdata.fullName.indexOf(' '))
    let lastname = userdata.fullName.substr(userdata.fullName.indexOf(' ')+1)
    
    this.setState({
      modal: true,
      editFirstName: '',
      editLastName: '',
      editPrivilage: '',
      editMobile: '',
      editEmail: '',
      editUserid: ''
     }, () => {
       this.setState({
         editFirstName: firstname,
         editLastName: lastname,
         editPrivilage: userdata.privilage,
         editMobile: userdata.phone,
         editEmail: userdata.email,
         editUserid: userdata._id
       })
     })
    
  }

  handleChange = (e) => {
    let value = e.target.value
    let name = e.target.name
    this.setState({[name]: value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.setState({loading: true})
    let editData = {
      userid: this.state.editUserid,
      firstname: this.state.editFirstName,
      lastname:  this.state.editLastName,
      mobile: this.state.editMobile,
      privilage: this.state.editPrivilage
    }

    Apiservice.edit_sub_user(editData)
    .then((res) => res.json())
    .then((response) => {
       if(response.status == 200) {
        notify.show('Edit successfull', 'success', 3000);
        this.setState({modal: false}, () => {
          this.setState({loading: false})
        })
        this.update()
       } else {
        notify.show('Failed to edit user', 'error', 3000);
       }
    })
  }

  toggle = () => {
    this.setState({modal: !this.state.modal})
  }

  deleteSubUSer = (userid) => {
    this.setState({loading: true})
    Apiservice.delete_sub_user(userid)
    .then((res) => res.json())
    .then((response) => {
      if(response.status == 200) {
        notify.show('Sub user deleted successfully', 'success', 5000);
        this.update()
        this.setState({loading: false})
      } else {
        notify.show('Failed to delete user', 'error', 5000);
      }
    })
  }

  goToCreateSub = () => {
    this.props.history.push("/create_sub_users")
  }

  renderList = () => {
    this.state.subUserList.map((userList, index) => {
      return (
        <div className="tableRow" key={index}>
          <div>{userList.fullName}</div>
          <div className="edit-delete">
            <a onClick={this.editSubUser(userList._id)}>Edit</a> <span>I</span> <a onClick={this.deleteSubUSer(userList._id)} >Delete</a>
          </div>
        </div>
      );
    })
  }

  searchUsers = () => {
    this.setState({dataLoading: true}) 
    let key = this.state.searchkey
    let userid = localStorage.getItem('user-id')
    let filter = {
      userid: userid,
      searchkey: key,
    }
    Apiservice.filter_sub_user(filter)
    .then((res) => res.json())
    .then((response) => {
      this.setState({subUserList: response.response, dataLoading: false})
    })
    
  }

  clearSearchInput = () => {
    this.setState({searchkey: ''})
    this.update()
  }

  paginate = (page) => {
    let offset = ((page -1) * 10)
    console.log("page", page, offset);
    this.setState({currentPage: page, offset}, () => {
      this.update()
    })
    
  }

  render() {
  const {editPrivilage} = this.state
   const list = this.state.subUserList
   .map((userList, index) => {
      return (
        <div className="tableRow" key={index}>
          <div>{userList.fullName}</div>
          <div>{userList.email}</div>
          <div>{userList.privilage}</div>
          <div className="edit-delete">
            <a className="link" onClick={() => this.editSubUser(userList)}>Edit</a> <span>I</span> <a className="link" onClick={() => this.deleteSubUSer(userList._id)} >Delete</a>
          </div>
        </div>
      );
    })

    let totalresult = this.state.totalSubUser
    let perpage = 10
    let currentpage = this.state.currentPage


    return (
      <div className="right">
      <Notifications />
      <Loader loading={this.state.loading}/>
      <Modal show={this.state.modal} onHide={this.toggle} className="modal-view">
          <Modal.Header closeButton>
            <Modal.Title className="modal-title">Edit sub user</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-body">
          <Row>
          <form className="form" onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6">
                <div className="inputOuter">
                    <input name="editFirstName" type="text" value={this.state.editFirstName} placeholder="First name" onChange={this.handleChange} required/>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6">
                <div className="inputOuter">
                    <input name="editLastName" type="text" value={this.state.editLastName} placeholder="Last name" onChange={this.handleChange} required/>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6">
                <div className="inputOuter">
                    <input disabled='disabled' value={this.state.editEmail} name="editEmail" type="text" placeholder="Email address" onChange={this.handleChange} required/>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6">
                <div className="inputOuter">
                    <input name="editMobile" type="text" value={this.state.editMobile} placeholder="Mobile number" onChange={this.handleChange} required/>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6">
                <p className="privilage-text">Select privileges</p>
                <div className="inputOuter">
                  <select name="privilage" value={this.state.editPrivilage} onChange={(e) => this.setState({editPrivilage: e.target.value})}>
                    <option value="admin">Administrator</option>
                    <option value="manager">Manager</option>
                    <option value="associate">Associate</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6">
                
              </div>
            </div>
            

            <div className="row">
              <div className="col-lg-3 col-md-3 col-sm-3">
              </div>

              <div className="col-lg-6 col-md-6 col-sm-6">
                <button type="submit" disabled={false} className="button">Edit sub user</button>
              </div>

              <div className="col-lg-3 col-md-3 col-sm-3">
              </div>
            </div>
            
           </form>
          </Row>
          </Modal.Body>
          
        </Modal>
        <Page_head title="Sub users" icon="fas fa-users" />
        <div>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-0">
             <div className="form gap">
              <Row>
                <Col xs={6} lg={6} md={6}>
                  <div className="inputOuter">
                      <i onClick={this.clearSearchInput} className="far fa-times-circle input-clear"></i>
                      <input className="search-input" name="searchkey" type="text"  placeholder="Search users" value={this.state.searchkey} onChange={this.handleChange}/>
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
            <button onClick={this.goToCreateSub} className="add-btn right" >Add sub user</button>
            </div>
          </div>
        </div>
        
         <div className="searchTable top-fix">
            <div className="header">
              <div className="">Username</div>
              <div className="">Email</div>
              <div className="">Privilage</div>
              <div className="">Action</div>
            </div>
  
            {this.state.dataLoading ? 
              <Skeleton count={5} width='90%' /> : 
              list.length > 0 ? 
              list :
              <Empty text="No sub useres found !"/>
            }
          </div>

          <div className="paginationWrapper">
          <Pagination
            activePage={this.state.currentPage}
            itemsCountPerPage={perpage}
            totalItemsCount={totalresult}
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
            {/* <Pagination_component
             totaldata = {totalresult}
             perpage = {perpage}
             currentpage = {this.state.currentPage}
             paginate = {(page) => this.paginate(page)}
             />   */}
          </div>

     </div>
    );
  }
}

export default withRouter(Sub_users_list);