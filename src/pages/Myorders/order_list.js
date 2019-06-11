import React, { Component } from 'react';
import { Row, Col, Card, OverlayTrigger, Popover, Button } from 'react-bootstrap';
import moment from 'moment'
import Empty from '../components/empty'
import { Base_url } from '../../utilities/config'
import './../Reservation/style.css'


export default class Order_list extends Component {
  state = {
    show: false,
  }

  showAddress = (target) => {
    console.log(target);

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

    return (
      <div className="list-container">
        {this.props.orders.length > 0 ?
          this.props.orders.map(data => {
            return (
              <Card key={data._id} className="order-card">
                <Card.Header className="card-head">
                  <Row>
                    <Col>
                      <i className="fas fa-user-tie"></i> Order by: <span className="bold">{data.user.firstname} {data.user.lastname}</span>
                    </Col>
                    <Col>
                      <i className="fas fa-calendar-week"></i> Date: <span className="bold">{new Date(data.order.createdAt).toLocaleDateString()}
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
                  { data.order.items.map(item => {
                    return (
                      <Row className="item-box">
                      <Col lg={6} md={6} sm={6} xs={12}>
  
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
  
                      <Col lg={6} md={6} sm={6} xs={12} style={{display: 'grid', alignItems: 'center', justifyContent: 'center' }}>
  
                        <div className="r-stages row">
                          <div  className={data.order.status == 'ORDERED' ? `r-stage1 stage-active col` : `r-stage1`}>
                            New
                           </div>
                          <div  className={data.order.status == 'ACCEPTED' ? `r-stage2 stage-active col` : `r-stage2`}>
                            Accepted
                            </div>
                          <div  className={data.order.status == 'READY' ? `r-stage3 stage-active col` : `r-stage3`}>
                            Ready
                            </div>
                          <div  className={data.order.status == 'READY' ? `r-stage3 stage-active col` : `r-stage3`}>
                            Not Accepted
                            </div>
                        </div>
  
  
                        <div style={{ marginTop: 5 }}>

                          <div className="r-stages row r-bottom">
                            <div  className={data.order.status == 'CANCELED' ? `r-stage1 stage-active col` : `r-stage1`}>
                              Canceled
                           </div>
                            <div  className={data.order.status == 'ACCEPTED' ? `r-stage2 stage-active col` : `r-stage2`}>
                              Completed
                            </div>
                            <div  className={data.order.status == 'READY' ? `r-stage3 stage-active col` : `r-stage3`}>
                              Discount/Refund
                            </div>
  
                          </div>
                        </div>
  
                      </Col>
  
                    </Row>
                    )
                })
                }
                 
                </Card.Body>
              </Card>

            )
          }) :
          <Empty text="No reservation found !" />
        }
      </div>
    );
  }
}
