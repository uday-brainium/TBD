import React, { Component } from 'react';
import './../Dashboard/style.css'
import ApiService from '../../../services/api';

export default class PayoutCard extends Component {


  addCardSubmit = (e) => {
    e.preventDefault()
    console.log("HELLO");
    
    // const { key } = this.state
    // ApiService.add_key(key)
    //   .then(res => {
    //     console.log("res", res);
    //     this.props.updateList()
    //   })
  }

  changeField = (e) => {
    const name = e.target.name
    const value = e.target.value

    this.setState({[name]: value})
  }

  render() {
    console.log("TEST", this.state);
    
    return (
      <div classNameName="editor-box">
        <h6>Add payout card (For sending payment to businesses) </h6>
        <div>
          <form className="credit-card" onSubmit={this.addCardSubmit}>
            <div className="form-header">
              <h4 className="title">Card detail</h4>
            </div>

            <div className="form-body">

              <input type="text" maxLength="19" name="cardnumber" onChange={this.changeField} className="card-number" placeholder="Card Number" />

              <div className="date-field">
                <div className="month">
                  <select onChange={this.changeField} name="month">
                    <option value="january">January</option>
                    <option value="february">February</option>
                    <option value="march">March</option>
                    <option value="april">April</option>
                    <option value="may">May</option>
                    <option value="june">June</option>
                    <option value="july">July</option>
                    <option value="august">August</option>
                    <option value="september">September</option>
                    <option value="october">October</option>
                    <option value="november">November</option>
                    <option value="december">December</option>
                  </select>
                </div>
                <div className="year">
                  <select onChange={this.changeField} name="year">
                    <option value="2016">2016</option>
                    <option value="2017">2017</option>
                    <option value="2018">2018</option>
                    <option value="2019">2019</option>
                    <option value="2020">2020</option>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                  </select>
                </div>
              </div>


              <div className="card-verification">
                <div className="cvv-input">
                  <input onChange={this.changeField} maxLength="4" name="cvv" type="text" placeholder="CVV" />
                </div>
                <div className="cvv-details">
                  <p>3 or 4 digits usually found <br></br> on the signature strip</p>
                </div>
              </div>


              <button type="submit" name="submit" className="proceed-btn"><a href="#">Add Card</a></button>

            </div>
          </form>
        </div>
      </div>
    );
  }
}
