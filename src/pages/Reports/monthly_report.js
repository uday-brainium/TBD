import React, { Component } from 'react'
import { Row, Col, Table } from 'react-bootstrap'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts'
import ApiService from './../../services/api'
import moment from 'moment'
import './styles.css'


const data = [{"name":"January","value":45, 'reservation': 12},{"name":"February","value":66, 'reservation': 55},{"name":"March","value":12, 'reservation': 33},{"name":"April","value":5, 'reservation': 30},{"name":"May","value":4, 'reservation': 10},{"name":"June","value":4,'reservation': 67},{"name":"July","value":15,'reservation': 90},{"name":"August","value":5, 'reservation': 25},{"name":"September","value":0, 'reservation': 60},{"name":"October","value":0, 'reservation': 7},{"name":"November","value":0, 'reservation': 9},{"name":"December","value":0, 'reservation': 60}]

export default class MonthlyReport extends Component {

  state = {
    year: '2019',
    graphData: []
  }

  componentDidMount() {
    this.fetchGraphData()
  }

  fetchGraphData = () => {
    const { year } = this.state
    ApiService.monthly_reports(year).then(res => {
      if (res.status === 200) {
        this.setState({ graphData: res.result })
      }
    })
  }

  yearChange = (e) => {
    const year = e.target.value
    console.log('date', year);
    
    this.setState({ year }, () => {
      this.fetchGraphData()
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


  render() {
    return (
      <div className="sph-container">
        <div>
          <Row className="sph">
            <Col lg={6} md={6} xs={12} className="responsive">
              <span className="title-text">Monthly sales report</span>
            </Col>

            <Col lg={6} md={6} xs={12} className="responsive">
             <span style={{marginRight: 10}}> Year: </span>
             <select className="year-select" name="year" onChange={this.yearChange}>
               {this.populateYearList()}
             </select>
            </Col>

          </Row>
          <div className="chart-container">
          <p style={{textAlign: 'left'}}>Year - {this.state.year} </p>
            <BarChart width={700} height={350} data={this.state.graphData}>
              <XAxis dataKey="name" />
              <YAxis />
               <Tooltip />
               <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <Bar type="monotone" dataKey="sales" barSize={30} fill="#8884d8" />
              <Bar type="monotone" dataKey="reservations" barSize={30} fill="pink" />
              <Bar type="monotone" dataKey="social" barSize={30} fill="green" />
              <Legend width={140} wrapperStyle={{ top: 10, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '20px', textAlign: 'left' }} />
             
             
            </BarChart>
          </div>

        </div>
      </div>
    );
  }
}
