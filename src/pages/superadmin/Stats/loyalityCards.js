import React, { Component } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts'
import { Row, Col } from 'react-bootstrap'
import ApiService from '../../../services/api';
import './style.css'

export default class LoyalityCards extends Component {

  state = {
    graphData: [],
    year: '',
    month: '',
    businessId: null,
    businessList: []
  }

  componentDidMount() {
    const currentMonth = new Date().getMonth() + 1
    const currentYear = new Date().getFullYear()
    this.setState({month: currentMonth, year: currentYear}, () => {
      this.fetchLoyality()
      this.fetchBusinessList()
    })
  }

  fetchLoyality = () => {
    const { year, month, businessId } = this.state
    const data = {
      year, month, businessId
    }
    ApiService.businessLoyality(data)
      .then(res => {
        if(res.status == 200) {
          this.setState({graphData: res.data})
        }
      })
  }

  populateYearList = () => {
    const currentYear = new Date().getFullYear()
    let optArr = []
    for(var i = currentYear; i > (currentYear - 20); i--) {
      optArr.push(<option value={i}> {i} </option>)
    }
    return optArr
  }

  yearChange = (e) => {
    const value = e.target.value
    const name = e.target.name

    if(name == 'businessId' && value == 0) {
      this.setState({businessId: null}, () => {
        this.fetchLoyality()
      })
    } else {
      this.setState({[name]: value}, () => {
        this.fetchLoyality()
      })
    }
    
  }

  populateMonthList = () => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let monthArr = []
    const currentMonth = new Date().getMonth() + 1
    
    months.map((month, i) => {
      if(currentMonth == i+1) {
        monthArr.push(<option value={i+1} selected> {month} </option>)
      } else {
        monthArr.push(<option value={i+1}> {month} </option>)
      }
    })
    return monthArr
  }

  populateBusinessList = () => {
    const businesses = this.state.businessList
    let listArr = []
    businesses.map((data, i) => {
      listArr.push(<option value={data._id}>{data.businessname}</option>)
    })

    return listArr
  }

  fetchBusinessList = () => {
    ApiService.businessList()
    .then(res => {
      if(res.status == 200) {
        this.setState({businessList: res.data})
      }
    })
  }


  render() {
    return (
      <div className="editor-box">
        <h6 style={{ marginBottom: 20 }}>Loyality card sold</h6>

        <div className="filter-row">
          <Row className="sph">
            <Col lg={3} md={3} xs={12} className="responsive">
              
            </Col>

            <Col lg={3} md={3} xs={12} className="responsive">
              <span style={{ marginRight: 10 }}> Business: </span>
              <select className="year-select" name="businessId" onChange={this.yearChange}>
                <option value="0">All businesses</option>
                {this.populateBusinessList()}
              </select>
            </Col>

            <Col lg={3} md={3} xs={12} className="responsive">
              <span style={{ marginRight: 10 }}> Month: </span>
              <select className="year-select" name="month" onChange={this.yearChange}>
                {this.populateMonthList()}
              </select>
            </Col>

            <Col lg={3} md={3} xs={12} className="responsive">
              <span style={{ marginRight: 10 }}> Year: </span>
              <select className="year-select" name="year" onChange={this.yearChange}>
                {this.populateYearList()}
              </select>
            </Col>

          </Row>
        </div>

        <div className="bar-chart">
          <BarChart width={700} height={350} data={this.state.graphData}>
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <Bar type="monotone" dataKey="Free" barSize={30} fill="#8884d8" />
            <Bar type="monotone" dataKey="Silver" barSize={30} fill="silver" />
            <Bar type="monotone" dataKey="Gold" barSize={30} fill="gold" />
            <Legend width={140} wrapperStyle={{ top: 10, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '20px', textAlign: 'left' }} />
          </BarChart>
        </div>
      </div>
    );
  }
}
