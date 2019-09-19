import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'
import ApiService from './../../services/api'
import './styles.css'

const userData = JSON.parse(localStorage.getItem('userdata'))
const id = userData ? userData.data._id : ''

export default class SocialPostPerHour extends Component {

  state = {
    date: new Date(),
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
    const {date, businessId} = this.state
    ApiService.social_post_per_hour(date, businessId).then(res => {
      if(res.status === 200) {
        this.setState({graphData: res.result})
      }
    })
  }

  changeDate = (e) => {
    const date = new Date(e.target.value)
    this.setState({date}, () => {
      this.fetchGraphData()
    })
  }


  render() {
    return (
      <div className="sph-container"> 
       <div>
        <Row className="sph">
          <Col lg={6} md={6} xs={12} className="responsive">
           <span className="title-text">Social posts per hour</span>
          </Col>

          <Col lg={6} md={6} xs={12} className="responsive">
            <span style={{marginRight: 10}}> Date: </span>
            <input style={{width: '80%'}} type="date" onChange={this.changeDate} name="datefilter" />
          </Col>

        </Row>
        <div className="chart-container">
          <LineChart width={700} height={300} data={this.state.graphData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <Line type="monotone" dataKey="sales" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis stroke="#000" dataKey="name" />
              <YAxis />
              <Tooltip />
          </LineChart>
        </div>

        </div>
      </div>
    );
  }
}
