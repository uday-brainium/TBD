import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import moment from 'moment'
import Empty from '../components/empty'
import {Base_url} from '../../utilities/config'

export default class Reservation_list extends Component {
  state = {

  }

  render() {
    return (
      <div className="list-container">
      {this.props.reservationList.length > 0 ?
        this.props.reservationList.map(data => {
          return (
            <div key={data._id} className={!data.reservation.preferred ? 'r_list' : 'r_list gold'}>
              <Row>
                <Col lg={2} md={2} sm={3} xs={3}>
                  <div className="p-image">
                    { data.user === null ?
                      <img src={require('./../../images/user.jpg')} /> :
                      <img src={`${Base_url}${data.user.profile_image}`} />
                    }
                    <div className="r_status">{data.reservation.stage == 1 ? 'Present' : data.reservation.stage == 2 ? 'Ready': data.reservation.stage == 3 ? 'Sat On' : data.reservation.stage == 4 ? 'Completed' : 'Booked'}</div>
                  </div>
                </Col>
                <Col lg={4} md={4} sm={3} xs={9}>
                  {/* <div className="preffred-badge">
                    Preffred
                   </div> */}
                  <div>
                    Name: <span>{data.user === null ? data.reservation.name : `${data.user.firstname} ${data.user.lastname}`}</span>
                  </div>
                  <div>
                    Mobile: <span>{data.user === null ? data.reservation.mobile : data.user.mobile}</span>
                  </div>
                  <div>
                    Tables : <span className="gap">{data.reservation.tables}</span>
                    Persons : <span >{data.reservation.persons}</span>
                  </div>
                  <div>
                    Date: <span className="gap">{moment(data.reservation.reservationDate).format('DD-MM-YYYY')}</span>
                    Time: <span>{moment(data.reservation.reservationTime).format('hh:mm a')}</span>
                  </div>
                  <div>Environment: <span>{data.reservation.environment}</span></div>
                </Col>

                <Col lg={6} md={6} sm={6} xs={12} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  {data.reservation.stage == 1 &&
                     <div className="wait-time-block">
                     <div className="wait-text">Wait Time: <span className="time-clock">{this.props.state[`countDown_${data.reservation._id}`]}</span></div>
                   </div> 
                  }
                  <div onClick={() => this.deleteReservation(data)} className="cancle-btn">
                   cancel
                  </div>
                 
                  <div className="r-stages row">
                      <div onClick={() => this.props.presentClick(data)} className={data.reservation.stage  == 1 ? `r-stage1 stage-active col` : `r-stage1`}>
                        Present
                      </div>
                      <div onClick={() => this.props.openReadyConfirm(data)} className={data.reservation.stage  == 2 ? `r-stage2 stage-active col` : `r-stage2`}>
                         Ready
                      </div>
                      <div onClick={() => this.props.satOnClick(data)} className={data.reservation.stage  == 3 ? `r-stage3 stage-active col` : `r-stage3`}>
                         Sat on
                      </div>
                      <div onClick={() => this.props.completeClick(data)} className={data.reservation.stage  == 4 ? `r-stage4 stage-active col` : `r-stage4`}>
                        Completed
                      </div>
                  </div>
                  
                </Col>
              </Row>
        
            </div>
            //   <div key={data._id} className={!data.preferred ? 'r_list' : 'r_list gold'}>
            //   {data.preferred && <div className="preffered-badge"><i className="fas fa-crown"></i></div>}
            //   <div className="inrow r_table">Name : <span> {data.name}</span></div>
            //   <div className="inrow r_date">Date : <span>{new Date(data.reservationDate).toLocaleDateString()}</span> </div>
            //   <div className="">Mobile : <span>{data.mobile}</span></div>
            //   <div className="inrow r_date">Time : <span>{new Date(data.reservationTime).toLocaleTimeString()}</span></div>

            //   <div className="">Tables. : <span>{data.tables}</span></div>
            //   <div className="">No of heads : <span>{data.persons} heads</span></div>

            //   <div className=" ">Environment: <span>{data.environment}</span></div>
            //   <div className="">Status: <span> confirmed </span></div>
            // </div>
          )
        }) :
        <Empty text="No reservation found !" />
      }
    </div>
    );
  }
}
