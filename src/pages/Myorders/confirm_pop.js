import React, { Component } from 'react';
import { Row, Col, Modal } from 'react-bootstrap';
import * as type from './order_types'
import ManagerAuth from './../components/managerAuthenticater'

export default class ConfirmPop extends Component {

  state = {
    refundAmount: 0,
    selectRefund: 0,
    type: 'doller',

    openAuthenticater: false
  }

  getTotalPrice = (items) => {
    let price = 0
    let ingredientPrice = 0
    items.map(item => {
      price += (JSON.parse(item.itemprice) * item.count)
      ingredientPrice += (JSON.parse(item.ingredientPrice) * item.count)
    })
    return (price + ingredientPrice)
  }

  selectRefund = (amount, mode) => {
    this.setState({ refundAmount: amount, selectRefund: mode })
  }

  changeField = (e, items) => { 
    const {type} = this.state
    const name = e.target.name
    const val = e.target.value
    const totalPrice = this.getTotalPrice(items)
    if(name === "discounttype") {
      this.setState({type: val})
    }
    if(name === 'discountvalue') {
      let refundAmount = type === 'doller' ? val : totalPrice * val / 100
      this.setState({ refundAmount})
    }
  }

  populateValues = (items) => {
    const {type} = this.state
    const totalPrice = this.getTotalPrice(items)
   
    const arr = type === 'doller' ? Array(totalPrice).fill() : Array(100).fill()
    let options = []

    arr.map((_, i) => {
      options.push(<option key={i+1} value={i+1}>{type === 'doller'  ? `$ ${i+1}` : `${i+1} %`}</option>)
    })

    return options
  }

  onContinue = () => {
    this.setState({openAuthenticater: true})
  }

  authenticate = (status) => {
    if(status) {
      const { data } = this.props
      const { refundAmount } = this.state
      const chargeId = data.order ? data.order.paymentinfo.chargeId : 0
      this.props.onContinue(refundAmount, chargeId)
      this.setState({openAuthenticater: false})
    } else {
      alert('Authentication error !')
    }
  }

  render() {
    const { status, data } = this.props
    const { selectRefund, refundAmount } = this.state
    const chargeId = data.order ? data.order.paymentinfo.chargeId : 0
    return (
      <div>
        <ManagerAuth show={this.state.openAuthenticater} authenticate={(status) => this.authenticate(status)} close={() => this.setState({openAuthenticater: false})}/>
        <Modal
          show={this.props.show}
          onHide={() => this.props.close()}
          size="sm"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton style={{ padding: 10, }}>
            <Modal.Title id="contained-modal-title-vcenter">
              Are you sure ?
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ margin: 0, padding: 2 }}>
            <div className="time-modal-container">
              <center>
                <div className="modal-desc-text">
                  {status === type.NOT_ACCEPTED &&
                    <p>
                      Full amount will be refunded to customer and
                      you will be charged $0.35.
                  </p>
                  }
                  {status === type.CANCELED &&
                    <p>
                      Order will be canceled and the amount will not be refunded !
                  </p>
                  }
                  {status === type.REFUND &&
                    <div>
                      <p>
                        Partial or full amount can be refunded to the customer
                    </p>
                      <div style={{ marginBottom: 10 }}>Full amount - $ {this.getTotalPrice(data.order.items)}</div>

                      {/* <Row>
                        <Col>
                          $ {this.getTotalPrice(data.order.items)}
                          <button onClick={() => this.selectRefund(this.getTotalPrice(data.order.items), 1)} className={selectRefund === 1 ? "ref-active refund-btn" : "refund-btn"}>Full refund</button>
                        </Col>
                        <Col>
                          $ {this.getTotalPrice(data.order.items) / 2}
                          <button onClick={() => this.selectRefund(this.getTotalPrice(data.order.items) / 2, 2)} className={selectRefund === 2 ? "ref-active refund-btn" : "refund-btn"}>Half refund</button>
                        </Col>
                        <Col>
                          $ {this.getTotalPrice(data.order.items) / 4}
                          <button onClick={() => this.selectRefund(this.getTotalPrice(data.order.items) / 4, 3)} className={selectRefund === 3 ? "ref-active refund-btn" : "refund-btn"}>Quater refund</button>
                        </Col>
                      </Row>

                      OR  */}

                      <Row>
                        <Col>
                          <div>
                            <select name="discounttype" onChange={(e) => this.changeField(e, data.order.items)} className="discount-type-select">
                              <option value="doller">Doller</option>
                              <option value="percent">Percent</option>
                            </select>

                            <select name="discountvalue" onChange={(e) => this.changeField(e, data.order.items)} className="discount-value-select">
                            {this.populateValues(data.order.items)}
                            </select>
                          </div>

                        </Col>
                      </Row>
                    </div>
                  }
                </div>
                <div className="row btn-row">
                  <button disabled={refundAmount < 0 ? true : false} onClick={this.onContinue} style={{ backgroundColor: '#ff6400', marginRight: 10 }} className="col wait-time-btn">Continue</button>
                  <button onClick={this.props.close} className="col wait-time-btn" >Cancel</button>
                </div>
              </center>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
