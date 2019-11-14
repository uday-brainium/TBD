import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

export default class Add_card extends Component {

  state = {
    cardnumber: '',
    expiry: '',
    cvv: ''
  }


  renderYear = () => {
    let years = []
    for(let i=2018; i < 2050; i++) {
      years.push(<option key={i} value={i}>{i}</option>)
    }
   return years
  }

  render() {
    return (
       <div>
        <div className="add-new-card animated slideInRight">
            <p>Add new card <span onClick={this.props.close} className="close-icon"><i className="far fa-times-circle"></i></span></p> 
            
            <form onSubmit={this.props.saveCard}>
                <div>
                <span>Card number</span>
                <input maxLength="19" name="cardnumber" type="text" onChange={this.props.change}  className="card-input" required/>
                </div>
  
                <Row>
                  <Col>
                  <div>
                    <span>Name on card</span>
                    <input name="name" type="text" onChange={this.props.change}  className="card-input" required/>
                  </div>
                  </Col>

                  <Col>
                  <div>
                    <span>CVV</span>
                    <input name="cvv" maxLength={3} type="password" onChange={this.props.change}  className="card-input" required/>
                  </div>
                  </Col>
                </Row>

                <Row>
                
                <Col>
                    <div>
                    <span>Month</span>
                        <select name="month" onChange={this.props.change}  className="card-input" required>
                        <option value="01">Jan</option>
                        <option value="02">Feb</option>
                        <option value="03">March</option>
                        <option value="04">April</option>
                        <option value="05">May</option>
                        <option value="06">June</option>
                        <option value="07">July</option>
                        <option value="08">August</option>
                        <option value="09">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                        </select>
                    </div>
                </Col>

                <Col>
                <div>
                    <span>Year</span>
                        <select name="year" onChange={this.props.change} className="card-input" required>
                        {this.renderYear()}
                        </select>
                    </div>
                </Col>
                </Row>
                <input type="submit" name="submit" value="Save" className="add-payment btn"/>
                </form>
            </div>
       </div>
    );
  }
}
