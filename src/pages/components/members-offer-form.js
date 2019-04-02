import React, { Component } from 'react';
import { Row, Col, Modal, Button, Table} from 'react-bootstrap';
import './../../styles/style_sheet.css'

class Member_offer_form extends Component {


  renderDiscountOptions = () => {
    let discountOpt = []
    for(let i = 0; i < 26; i ++) {
      discountOpt.push(<option key={i} value={i}> {i} </option>)
    }
    return discountOpt
  }

  renderPriceOptions = () => {
    let discountOpt = []
    for(let i = 0; i < 51; i ++) {
      discountOpt.push(<option key={i} value={i}> {i} </option>)
    }
    return discountOpt
  }

 silverPrice = (e) => {
    this.props.changeLoyalityPrice(e)
    this.props.change(e)
  }
 
  renderSelectBox = (label, name, optionType, member, defaultVal) => {
    let eventBooking = this.props.eventbooking
    let reservation = this.props.reservation
    let orConditionEvent = (name === 'free_member_free_events' || name === "silver_member_free_events" || name === "gold_member_free_events")
    let orConditionReservation = (name === 'free_member_reservation' || name === "silver_member_reservation" || name === "gold_member_reservation")
    let defaultProp = (this.props.name)
    return (
      <div className={`small-input 
      ${(orConditionEvent && eventBooking == false) || (orConditionReservation && reservation == false) ? 'disabled-member-field' : '' }`}>
      <span className="small-label">{label}</span>
          {optionType == 'yesNo' ?
            <select key={label} defaultValue={!defaultVal ? member === 'free' ? 'no' : 'yes' : defaultVal} className="small-select" name={name} onChange={(e) => this.props.change(e)}>
              <option value="yes">Yes</option>
              <option value="no">No</option>
             </select> :
           optionType == "points" ? 
            <select key={label} defaultValue={!defaultVal ? member === 'free' ? 'none' : member === 'silver' ? 'double' : 'tripple' : defaultVal } className="small-select" name={name} onChange={(e) => this.props.change(e)}>
              <option value="none">None</option>
              <option value="single">Single</option>
              <option value="double">Double</option>
              <option value="triple">Triple</option> 
            </select> :
           optionType == "discount" ? 
             <select key={label} defaultValue={!defaultVal ? member === 'free' ? 0 : member === 'silver' ? 3 : 5 : defaultVal} className="small-select" name={name} onChange={(e) => this.props.change(e)}>
              {this.renderDiscountOptions()}
            </select>:
            ''
           }
      </div>
    )
  }

  render() {
    const prop = this.props.defaults
    return (
      <div className="member-container">
      {prop != null && 
        <Row>
          <Col className="member-column">
            <div className="member-header-free">
              Free
              <div className="member-price">$0 / Year</div>
            </div>
            
            <div className="member-column-div">

             <div class="small-input disabled-member-field" style={{display: 'block'}}>
                <span class="small-label">Price/year (AUD)</span>
                <select class="small-select" name="free_price">
                  <option value="free"> Free </option>
                </select>
             </div>

              {this.renderSelectBox(
                'Points', 'free_member_points', 'points', 'free', 
                 prop.freemember != null ? prop.freemember.points : null
              )}

              {this.renderSelectBox(
                'Instant promotion', 'free_member_instant_promotion', 'yesNo', 'free',
                prop.freemember != null ? prop.freemember.instant_promotion : null
              )}

              {this.renderSelectBox(
                'Birthday promotion', 'free_member_birthday_promotion', 'yesNo', 'free',
                 prop.freemember != null ? prop.freemember.birthday_promotion : null
              )}

              {this.renderSelectBox(
                '% of discounts', 'free_member_discount', 'discount', 'free',
                  prop.freemember != null ? prop.freemember.discount : null
              )}

              {this.renderSelectBox(
                'Free events', 'free_member_free_events','yesNo', 'free',
                 prop.freemember != null ? prop.freemember.free_events : null
              )}

              {this.renderSelectBox(
                'Priority reservation', 'free_member_reservation', 'yesNo', 'free',
                  prop.freemember != null ? prop.freemember.reservation : null
              )}
         
            </div>
          </Col>
          <Col className="member-column">
            <div className="member-header-silver">
             Silver
             <div className="member-price">{`$${this.props.loyalityPoints} / Year`}</div>
             </div>
            <div className="member-column-div">

            <div class="small-input">
              <span class="small-label">Price/year (AUD)</span>
              <select value={this.props.loyalityPoints} class="small-select" name="silver_price" onChange={this.silverPrice}>
               {this.renderDiscountOptions()}
              </select>
            </div>
              
              {this.renderSelectBox(
                'Points', 'silver_member_points','points', 'silver',
                 prop.silvermember != null ? prop.silvermember.points : null
              )}

              {this.renderSelectBox(
                'Instant promotion', 'silver_member_instant_promotion', 'yesNo',
                prop.silvermember != null ? prop.silvermember.instant_promotion : null
              )}

              {this.renderSelectBox(
                'Birthday promotion', 'silver_member_birthday_promotion','yesNo', 'silver',
                  prop.silvermember != null ? prop.silvermember.birthday_promotion : null
              )}

              {this.renderSelectBox(
                '% of discounts', 'silver_member_discount', 'discount', 'silver',
                 prop.silvermember != null ? prop.silvermember.discount : null
              )}

              {this.renderSelectBox(
                'Free events', 'silver_member_free_events', 'yesNo', 'silver',
                  prop.silvermember != null ? prop.silvermember.free_events : null
              )}

              {this.renderSelectBox(
                'Priority reservation', 'silver_member_reservation', 'yesNo', 'silver',
                  prop.silvermember != null ? prop.silvermember.reservation : null
              )}

            </div>
          </Col>
          <Col className="member-column no-border">
            <div className="member-header-gold">
              Gold
              <div className="member-price">{`$${this.props.loyalityPoints * 2} / Year`}</div>
            </div>
            <div className="member-column-div">

              <div class="small-input disabled-member-field" style={{display: 'block'}}>
                <span class="small-label">Price/year (AUD)</span>
                 <select value={(this.props.loyalityPoints * 2)} class="small-select" name="gold_price">
                  {this.renderPriceOptions()}
                </select>
              </div>

              {this.renderSelectBox(
                'Points', 'gold_member_points', 'points', 'gold',
                 prop.goldmember != null ? prop.goldmember.points : null
              )}

              {this.renderSelectBox(
                'Instant promotion', 'gold_member_instant_promotion', 'yesNo', 'gold',
                 prop.goldmember != null ? prop.goldmember.instant_promotion : null
              )}

              {this.renderSelectBox(
                'Birthday promotion', 'gold_member_birthday_promotion', 'yesNo', 'gold',
                 prop.goldmember != null ? prop.goldmember.birthday_promotion : null
              )}

              {this.renderSelectBox(
                '% of discounts', 'gold_member_discount','discount', 'gold',
                 prop.goldmember != null ? prop.goldmember.discount : null
              )}

              {this.renderSelectBox(
                'Free events', 'gold_member_free_events', 'yesNo', 'gold',
                  prop.goldmember != null ? prop.goldmember.free_events : null
              )}

              {this.renderSelectBox(
                'Priority reservation', 'gold_member_reservation', 'yesNo', 'gold',
                 prop.goldmember != null ? prop.goldmember.reservation : null
              )}

            </div>
          </Col>
        </Row> }
      </div>
    );
  }
}

export default Member_offer_form;
