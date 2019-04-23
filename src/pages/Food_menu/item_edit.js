import React, { Component } from 'react';
import { Row, Col, Modal, Button } from 'react-bootstrap';
import ApiService from '../../services/api';
import './food.css'
import Loader from './../components/simpleloader'
import Notifications, { notify } from 'react-notify-toast';

export default class Item_edit extends Component {

  state = {
    menuList: [],
    user_id: '',
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    if(nextProps && nextProps.item.user_id) {
      this.setState({
        itemtitle: nextProps.item.itemtitle,
        itemcost: nextProps.item.itemcost,
        itemdescription: nextProps.item.itemdescription
      })
      ApiService.fetchmenuData(nextProps.item.user_id)
      .then(res => res.json())
      .then(response => {
        if (response.success) {
          this.setState({menuList: response.menu})
        } else {
          console.log('error in fetching menulist');
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    }
  }

  handleChange = (e) => {
    let name = e.target.name
    let val = e.target.value
    this.setState({[name]: val})
  }

  handleSubmit = (e) => {
    this.setState({loading: true})
    e.preventDefault()
    let data = {
      itemid: this.props.item._id,
      title: this.state.itemtitle,
      cost: this.state.itemcost,
      description: this.state.itemdescription
    }
    ApiService.updateItem(data)
    .then(res => res.json())
    .then((response) => {
      if(response.status == 200) {
        this.setState({loading: false})
        this.props.closeEdit()
        notify.show('Item edited !', 'success', 3000);
      } else {
        notify.show('Item edit failed !', 'error', 3000);
        this.setState({loading: false})
      }
    })
  }

  render() {
    return (
      <div>
        <Loader loading={this.state.loading} />
        <Notifications />
        <Modal
          show={this.props.show}
          onHide={() => this.props.closeEdit()}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
             Edit item
          </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="form" onSubmit={this.handleSubmit}>
              <div className="inputOuter">
              <div className="label-small">Food menu</div>
                <select disabled={true} name="menuitem" onChange={this.handleChange} required>
                  {this.state.menuList.map((dynamicData, index) => 
                     (
                      <option key={dynamicData._id} value={dynamicData._id}>
                        {dynamicData.title}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div className="inputOuter">
              <div className="label-small">Item name</div>
                <input type="text" name="itemtitle" defaultValue={this.props.item.itemtitle} onChange={this.handleChange} required/>
              </div>

              <div className="inputOuter">
              <div className="label-small">Item cost</div>
                <input type="text" name="itemcost" defaultValue={this.props.item.itemcost} onChange={this.handleChange} required/>
              </div>

              <div className="textareaOuter">
              <div className="label-small">Item description</div>
                <textarea
                  onChange={this.handleChange}
                  placeholder="Description"
                  name="itemdescription"
                  required
                > 
                {this.props.item.itemdescription}
                </textarea>
              </div>
              <input className="button" type="submit" value="Edit item" />
            </form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
