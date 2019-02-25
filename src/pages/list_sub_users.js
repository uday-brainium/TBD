import React, { Component } from 'react';
import Apiservice from './../services/api'
import '../styles/style_sheet.css'
import { Route, Link, Redirect, withRouter } from "react-router-dom";
import Notifications, { notify } from 'react-notify-toast';
import { Modal, Button, Row, Col } from 'react-bootstrap';

class Sub_users_list extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subUserList: [],
      modal: false,

      editPrivilage: 'admin',
      editFirstName: '',
      editLastName: '',
      editMobile: '',
      editEmail: '',
      editUserid: ''
    };
  }

  componentDidMount() {
      let userId = localStorage.getItem('user-id')
  
      Apiservice.get_sub_user(String(userId))
      .then((res) =>  res.json())
      .then((response) => {
          this.setState({subUserList: response.response})
      })
  }

  update = () => {
    let userId = localStorage.getItem('user-id')
    Apiservice.get_sub_user(String(userId))
    .then((res) =>  res.json())
    .then((response) => {
        this.setState({subUserList: response.response})
    })
  }

  editSubUser = (userdata) => {
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
         editFirstName: userdata.fullName,
         editLastName: userdata.fullName,
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
        this.setState({modal: false})
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
    Apiservice.delete_sub_user(userid)
    .then((res) => res.json())
    .then((response) => {
      if(response.status == 200) {
        notify.show('Sub user deleted successfully', 'success', 5000);
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

    return (
      <div className="right">
      <Notifications />
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
                <p className="privilage-text">Select privilages</p>
                <div className="inputOuter">
                  <select name="privilage" value={this.state.editPrivilage} onChange={(e) => this.setState({editPrivilage: e.target.value})}>
                    <option value="admin">Administrator</option>
                    <option value="manager">Manager</option>
                    <option value="editor">Editor</option>
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
        <div className="rightSideHeader">
          <ul className="breadcrumbNavigation">
              <li><i className="fas fa-users breadcumb-icon"></i></li>
              <li className="breadcumb-text"><span className="left-space">Sub users list</span></li>
          </ul>
        </div>
        <div>
          <div class="row">
            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">

            </div>
            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <button className="add-btn right" onClick={this.goToCreateSub}>Add sub user</button>
            </div>
          </div>
        </div>
        
         <div className="searchTable">
            <div className="header">
              <div className="">Username</div>
              <div className="">Email</div>
              <div className="">Privilage</div>
              <div className="">Action</div>
            </div>
            {list}
          </div>
          <div className="paginationWrapper">
            <ul className="pagination">
              <li>
                <span className="prev">prev</span>
              </li>
              <li>
                <a href="#">1</a>
              </li>
              <li>
                <span className="next">next</span>
              </li>
            </ul>
          </div>
     </div>
    );
  }
}

export default withRouter(Sub_users_list);