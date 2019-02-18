import React, { Component } from 'react';


export default class Step3 extends Component {
  
  render() { 
    return (
      <div className="animated slideInRight delay-0.5s">

        <div className="inputOuter">
            {/* <input placeholder="Loyality card price" type="text" name="loyalitycardprice" onChange={(e) => this.props.change(e)} /> */}
            <select onChange={(e) => this.props.change(e)} name="loyalitycardprice">
              <option value={5}>$5</option>
              <option value={6}>$6</option>
              <option value={7}>$7</option>
              <option value={8}>$8</option>
              <option value={9}>$9</option>
              <option value={10}>$10</option>
              <option value={11}>$11</option>
              <option value={12}>$12</option>
              <option value={13}>$13</option>
              <option value={14}>$14</option>
              <option value={15}>$15</option>
              <option value={16}>$16</option>
              <option value={17}>$17</option>
              <option value={18}>$18</option>
              <option value={19}>$19</option>
              <option value={20}>$20</option>
              <option value={21}>$21</option>
              <option value={22}>$22</option>
              <option value={23}>$23</option>
              <option value={24}>$24</option>
              <option value={25}>$25</option>
            </select>
        </div>

        <div className="inputOuter">
            <input placeholder="Loyality points need to get promotion" type="text" name="minloyalitypoints" onChange={(e) => this.props.change(e)} />
        </div>

        <div className="inputOuter">
            <input placeholder="Loyality points on social post"  type="text" name="pointsonsocialpost" onChange={(e) => this.props.change(e)} />
        </div>

        {/* <div className="inputOuter">
            <input placeholder="Loyality points user signup"  type="text" name="pointsonusersignup" onChange={(e) => this.props.change(e)} />
        </div> */}


        <div className="singleCheckbox">
            <input id="foodpickup" type="checkbox" name="foodpickup" defaultChecked={this.props.foodpickup} onChange={(e) => this.props.change(e)} />
            <label htmlFor="foodpickup"><span></span>Food pickup or Take out</label>
        </div>

        {this.props.foodpickup &&
        <div className="checkbox-details-text">
          <p className="info-text"> You need to setup food menu after login for this feture.</p>
        </div>}

        <div className="singleCheckbox">
            <input id="reservation" type="checkbox" name="reservation" defaultChecked={this.props.reservation} onChange={(e) => this.props.change(e)} />
            <label htmlFor="reservation"><span></span>Table reservation</label>
        </div>

        {this.props.reservation &&
          <div className="inputOuter">
           <input placeholder="Points earning per reservation" type="text" name="pointsperreservation" onChange={(e) => this.props.change(e)} />
          </div>
        }

        <div className="singleCheckbox">
          <input id="event" type="checkbox" name="eventbooking" defaultChecked={this.props.eventbooking} onChange={(e) => this.props.change(e)} />
            <label htmlFor="event"><span></span>Event/Ticket booking</label>
          </div>

          {this.props.eventbooking &&
            <div className="inputOuter">
            <input placeholder="Points earning per Event/Ticket booking" type="text" name="eventbookingpoints" onChange={(e) => this.props.change(e)} />
            </div>
          }
        </div>
    );
  }
}
