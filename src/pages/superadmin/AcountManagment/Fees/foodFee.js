import React, { Component } from 'react';
import ApiService from '../../../../services/api';
import Loader from './../../../components/simpleloader'

export default class FoodFees extends Component {

  state = {
    loading: false,
    discounttype: 'Doller',
    amount: 0
  }

  componentDidMount() {
    const {value} = this.props
    console.log("PROPS", value);
    
    this.setState({discounttype: value.type, amount: value.amount})
  }

  formSubmit = (e) => {
    e.preventDefault()
    const {discounttype, amount} = this.state
    let ask = window.confirm("Are you sure to update charges ?")
    if(ask) {
      this.setState({loading: true})
      ApiService.food_fee(amount, discounttype)
      .then(res => {
        if(res.status == 200) {
          this.setState({loading: false})
          this.props.alert()
        }
      })
    }
  }

  changeField = (e) => {
    const name = e.target.name
    const value = e.target.value

    this.setState({ [name]: value })
  }

  renderOptions = (type) => {
    let opt = []
    for (let i = 0; i < 51; i++) {
      opt.push(<option key={i} value={i}>{type == "Doller" ? `$${i}` : `${i}%`}</option>)
    }
    return opt
  }


  render() {
    const {discounttype, amount, loading} = this.state
    return (
      <div>
        <Loader loading={loading} />
        <form onSubmit={this.formSubmit}>
          <div>
            <label style={{ marginBottom: -15, color: 'green', marginTop: 10, fontSize: 16 }}>Food sale fee</label><br></br>
            <select className="select-type" value={discounttype} name="discounttype" onChange={this.changeField}>
              <option value="Doller">Dollar</option>
              <option value="Percent">Percentage</option>
            </select>
            <select className="select-value" value={amount} name="amount" onChange={this.changeField}>
              {this.renderOptions(this.state.discounttype == "Percent" ? "%" : "Doller")}
            </select>
            <input className="select-btn" style={{ marginLeft: 10, width: 100 }} type="submit" value="Save" />
          </div>
        </form>

      </div>
    );
  }
}
