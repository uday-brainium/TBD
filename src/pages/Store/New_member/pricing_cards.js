import React, { Component } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import  './member.css'
import Payment_btn from './payment_form'
import {update_guest} from './update_guest'
import Loader from './../../components/simpleloader'

export default class Price_cards extends Component {


  selectFree = () => {
    update_guest(this.props.userid, this.props.membership, null)
    this.props.moveToDone()
  }

  render() {
    const business = this.props.serviceProps
    const membership = this.props.membership
    const freeObj = business.members_service.freemember
    const silverObj = business.members_service.silvermember
    const goldObj = business.members_service.goldmember
    return (
      <div>
        {!business &&
          <Loader loading={true} />
        }
       {freeObj && silverObj && goldObj ?
          <div className="">
          <ul className="price">
            <li className={`header price-${membership}`}>{membership}</li>
            <li className="grey">
              {membership === 'Free' ? '$0 / Year' : membership === "Silver" ? `$${silverObj.silver_price} / Year` : membership === "Gold" ? `$${goldObj.gold_price} / Year` : ''}
            </li>
  
            <li className="price-card-points">{ membership === "Free" ?
               `${freeObj.points} points` :
              membership === 'Silver' ?
               `${silverObj.points} points` :
              membership === 'Gold' ?
               `${goldObj.points} points` : ''
            }</li>
  
            <li className="price-card-points">
              {membership === 'Free' ?
                freeObj.instant_promotion === 'yes' ?  'Instant Promotion' : 'No Instant Promotion' :
                membership === 'Silver' ?
                  silverObj.instant_promotion === 'yes' ?  'Instant Promotion' : 'No Instant Promotion' :
                membership === 'Gold' ? 
                 goldObj.instant_promotion === 'yes' ?  'Instant Promotion' : 'No Instant Promotion' : ''
              }
            </li>
            <li className="price-card-points">
              {membership === 'Free' ?
                  freeObj.birthday_promotion === 'yes' ?  'Birthday Promotion' : 'No Birthday Promotion' :
                membership === 'Silver' ?
                  silverObj.birthday_promotion === 'yes' ?  'Birthday Promotion' : 'No Birthday Promotion' :
                membership === 'Gold' ? 
                  goldObj.birthday_promotion === 'yes' ?  'Birthday Promotion' : 'No Birthday Promotion' : ''
              }
            </li>
            <li className="price-card-points">
              {membership === 'Free' ?
                  `${freeObj.discount}% Discount` :
                membership === 'Silver' ?
                  `${silverObj.discount}% Discount` :
                membership === 'Gold' ? 
                 `${goldObj.discount}% Discount` : ''
              }
            </li>
            <li className="price-card-points">
              {membership === 'Free' ?
                 'Transaction Fees May Apply' :
               membership === 'Silver' ?
                 'No Transaction Fees' :
               membership === 'Gold' ? 
                 'No Transaction Fees' : ''
              }
            </li>
            
            {business.eventbooking &&
               <li className="price-card-points">
               {membership === 'Free' ?
                  freeObj.free_events === 'yes' ? 'Free events' : 'No free events' :
                membership === 'Silver' ?
                  silverObj.free_events === 'yes' ? 'Free events' : 'No free events' :
                membership === 'Gold' ? 
                  goldObj.free_events === 'yes' ? 'Free events' : 'No free events' : ''
               }
             </li>}
         
             {business.tablereservationservice &&
              <li className="price-card-points">
                {membership === 'Free' ?
                  freeObj.reservation === 'yes' ? 'Priority Reservation' : 'No Priority Reservation' :
                membership === 'Silver' ?
                  silverObj.reservation === 'yes' ? 'Priority Reservation' : 'No Priority Reservation' :
                membership === 'Gold' ? 
                  goldObj.reservation === 'yes' ? 'Priority Reservation' : 'No Priority Reservation' : ''
                }
              </li>
             }

            <li className="grey">
            {membership === "Free" && 
              <Button className="price-free-btn" onClick={this.selectFree}>Choose</Button>
            } 
            {membership === 'Silver' &&
              <Payment_btn 
               plan = "Silver"
               price = {silverObj.silver_price * 100}
               userid = {this.props.userid}
               moveToDone = {this.props.moveToDone}
             />
            }
  
            {membership === 'Gold' &&
              <Payment_btn 
               plan = "Gold"
               price = {goldObj.gold_price * 100}
               userid = {this.props.userid}
               moveToDone = {this.props.moveToDone}
             />
            }
           </li>
          </ul>
        </div> : ''
       } 
       
      </div>
    );
  }
}