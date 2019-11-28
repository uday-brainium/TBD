import React, { Component } from 'react';
import { Row, Col, Card, OverlayTrigger, Popover, Button } from 'react-bootstrap';
import moment from 'moment'
import Empty from '../components/empty'
import { Base_url } from '../../utilities/config'
import './../Reservation/style.css'
import * as type from './order_types'
import OrderReciept from './Reciepts'



export default class Order_list extends Component {
  state = {
    show: false,
  }

  showAddress = (target) => {
    this.setState({ show: !this.state.show, target })
  }

  popoverAddress = (address) => {
    return (
      <Popover id="popover-basic" title="Delivery address">
        {address}
      </Popover>
    )
  }



  render() {
    const { changeStatus } = this.props
    return (
      <div className="list-container">
        {this.props.orders.length > 0 ?
          this.props.orders.map((data, i) => {
            return (
              <Card key={i} className="order-card">
                <Card.Header className="card-head">
                  <Row>
                    <Col className="head-cols">
                      <i className="fas fa-user-tie bold" style={{ marginRight: 5 }}></i> Order by: <span className="bold">{data.user.firstname} {data.user.lastname}</span>
                    </Col>
                    <Col className="head-cols">
                      <i className="fas fa-calendar-week" style={{ marginRight: 5 }}></i> Date: <span className="bold">{new Date(data.order.createdAt).toLocaleDateString()}
                        <span style={{ marginLeft: 5 }}>{moment(data.order.createdAt).format('hh:mm a')}</span></span>
                    </Col>
                    <Col>
                      <i className="fas fa-map-marker-alt"></i> Address :
                     <OverlayTrigger trigger="click" placement="bottom" overlay={this.popoverAddress(data.user.address)}>
                        <Button style={{ marginLeft: 5 }} size="sm" variant="success">Show</Button>
                      </OverlayTrigger>

                    </Col>
                  </Row>

                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col style={{ display: 'grid', alignItems: 'center', justifyContent: 'center' }}>

                      <div className="r-stages row">
                        <div onClick={() => changeStatus(data, type.ORDERED)} className={data.order.status == 'ORDERED' ? `r-stage1 stage-active col` : `r-stage1`}>
                          New Order
                           </div>
                        <div onClick={() => changeStatus(data, type.ACCEPTED)} className={data.order.status == 'ACCEPTED' ? `r-stage2 stage-active col` : `r-stage2`}>
                          Accept
                            </div>
                        <div onClick={() => changeStatus(data, type.READY)} className={data.order.status == 'READY' ? `r-stage3 stage-active col` : `r-stage3`}>
                          Ready
                            </div>
                        <div onClick={() => changeStatus(data, type.NOT_ACCEPTED)} className={data.order.status == 'NOT_ACCEPTED' ? `r-stage3 stage-active col` : `r-stage3`}>
                          Reject
                            </div>

                        <div onClick={() => changeStatus(data, type.CANCELED)} className={data.order.status == 'CANCELED' ? `r-stage1 stage-active col` : `r-stage1`}>
                          Cancel
                           </div>
                        <div onClick={() => changeStatus(data, type.COMPLETE)} className={data.order.status == 'COMPLETE' ? `r-stage2 stage-active col` : `r-stage2`}>
                          Completed
                            </div>
                        <div onClick={() => changeStatus(data, type.REFUND)} className={data.order.status == 'REFUND' ? `r-stage3 stage-active col` : `r-stage3`}>
                          Discount/Refund
                            </div>

                      </div>

                    </Col>
                  </Row>
                  <div className="print-order" onClick={() => OrderReciept.OrderReciept(data)}> PRINT ORDER RECEIPT</div>
                  {data.order.items.map((item, i) => {
                    return (
                      <Row key={i} className="item-box">
                        <Col>
                          <div>
                            Food item: <span>{item.itemname}</span>
                          </div>
                          <div>
                            Description: <span>{item.itemdescription}</span>
                          </div>
                          <div>
                            Quantity: <span>{item.count}</span>
                          </div>
                          <div>
                            Ingredients : {item.selectedIngredients.map(ing => (
                              <span className="ing">{ing.name}</span>
                            ))}
                          </div>
                          <div>
                            Date: <span className="gap">{new Date(data.order.createdAt).toLocaleDateString()}</span>
                            Time: <span>{moment(data.order.createdAt).format('hh:mm a')}</span>
                          </div>
                          <div>Cost: <span>$ {item.itemprice}</span></div>
                        </Col>
                      </Row>
                    )
                  })
                  }
                </Card.Body>
              </Card>
            )
          }) :
          <Empty text="No orders found !" />
        }
      </div>
    );
  }
}
