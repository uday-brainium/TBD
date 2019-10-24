import React, { Component } from 'react'
import { Row, Col, Table } from 'react-bootstrap'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts'
import ApiService from './../../services/api'
import './styles.css'

  const userData = JSON.parse(localStorage.getItem('userdata'))
  const id = userData ? userData.data._id : ''

export default class RevenueReport extends Component {

  state = {
    year: '2019',
    graphData: [],
    businessId: ''
  }

  componentDidMount() {
    const businessId = this.props.businessId 
    this.setState({businessId: businessId ? businessId : id}, () => {
      this.fetchGraphData()
    })
  }

  fetchGraphData = () => {
    const { year, businessId } = this.state
    ApiService.revenue_reports(year, businessId).then(res => {
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
              <span className="title-text">Revenue report</span>
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
            
              <Legend width={140} wrapperStyle={{ top: 10, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '20px', textAlign: 'left' }} />
             
             
            </BarChart>
          </div>

        </div>
      </div>
    );
  }
}
