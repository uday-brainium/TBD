import React, { Component } from 'react';
import { Row, Col, Modal } from 'react-bootstrap';
import ApiService from '../../services/api';

const businessid = localStorage.getItem('user-id')

export default class ManagerAuthenticater extends Component {

  state = {
    email: '',
    password: '',
    errorText: '',
    successText: ''
  }

  changeField = (e) => {
    const name = e.target.name
    const val = e.target.value
    this.setState({ [name]: val })
  }

  authenticateManager = () => {
    const { email, password } = this.state

    ApiService.login(email, password)
      .then(res => res.json())
      .then(response => {
        if (response.statusCode == 200) {
          console.log(response.data);
          if (response.data.parentBusinessId && response.data.parentBusinessId == businessid) {
            const privilage = response.data.privilage
            if (privilage && (privilage == "manager" || privilage == "admin")) {
              this.setState({ successText: 'Authentication success', errorText: '' }, () => {
                 this.props.authenticate(true)
              })
            } else {
              this.setState({ successText: '', errorText: 'You are not Manager or Admin' })
            }
          } else {
            //Not a subuser the the current business
            this.setState({ successText: '', errorText: 'Failed to authenticate' })
          }

        } else {
          this.setState({ successText: '', errorText: 'Failed to authenticate' })
        }
      })
  }

  render() {
    return (
      <div>
        <Modal
          show={this.props.show}
          onHide={() => this.props.close()}
          size="sm"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton style={{ padding: 10, }}>
            <Modal.Title id="contained-modal-title-vcenter">
              Manager login
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ margin: 0, padding: 2 }}>
            <div className="time-modal-container">
              <center>
                <div className="manager-login-div">
                  <div>
                    <label>Email</label>
                    <input onChange={this.changeField} className="auth-input" type="email" name="email" placeholder="Please enter email" />
                  </div>

                  <div>
                    <label>Passsword</label>
                    <input onChange={this.changeField} className="auth-input" type="password" name="password" placeholder="Password" />
                  </div>

                  {this.state.errorText && <div className="error-text">
                    {this.state.errorText}
                  </div>}

                  {this.state.successText && <div className="success-text">
                    {this.state.successText}
                  </div>}

                  <button onClick={this.authenticateManager} className="auth-button" type="submit" name="submit">Authenticate</button>
                </div>
              </center>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
