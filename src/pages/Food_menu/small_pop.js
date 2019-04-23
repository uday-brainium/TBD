import React, { Component } from 'react';
import { Row, Col, Modal, Button } from 'react-bootstrap';
import ApiService from '../../services/api';
import './food.css'
import Loader from './../components/simpleloader'
import Notifications, { notify } from 'react-notify-toast';
import './food.css'
export default class Small_pop extends Component {

  state = {
    charge: '1'
  }

  renderOptions = () => {
    let opts = []
    for(let i=1; i < 51; i++) {
      opts.push(<option key={i} value={i}>$ {i}</option>)
    }
    return opts
  }

  inputChange = (e) => {
    this.setState({charge: e.target.value})
  }

  render() {
    return (
      <div>
        <Loader loading={this.state.loading} />
        <Notifications />
        <Modal
          show={this.props.show}
          onHide={() => this.props.close()}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
         <Modal.Body>
            <div className="inputOuter">
            <div className="form">
              <div className="label-small">Delivery charge</div>
                <select onChange={this.inputChange}>
                  {this.renderOptions() }
                </select>
              </div>
            </div>
            <Row>
              <Col>
                <div className="inputOuter">
                  <input className="button" onClick={() => this.props.saveData(this.state.charge)} type="submit" value="Save" />
                </div>
              </Col>

              <Col>
                <div className="inputOuter">
                  <input className="button cancle" onClick={this.props.close} type="submit" value="Cancle" />
                </div>
              </Col>
            </Row>
            
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
