import React, { Component } from 'react'
import { Row, Col, Table } from 'react-bootstrap'
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'
import ApiService from './../../services/api'
import moment from 'moment'
import './styles.css'

const userData = JSON.parse(localStorage.getItem('userdata'))
const id = userData ? userData.data._id : ''


export default class SalesPerItem extends Component {

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
    const { date, businessId } = this.state
    ApiService.sales_per_item(date, businessId).then(res => {
      if (res.status === 200) {
        this.setState({ graphData: res.result })
      }
    })
  }

  changeDate = (e) => {
    const date = new Date(e.target.value)
    console.log('date', date);
    
    this.setState({ date }, () => {
      this.fetchGraphData()
    })
  }


  render() {
    return (
      <div className="sph-container">
        <div>
          <Row className="sph">
            <Col lg={6} md={6} xs={12} className="responsive">
              <span className="title-text">Sales per item</span>
            </Col>

            <Col lg={6} md={6} xs={12} className="responsive">
              <span style={{marginRight: 10}}> Date: </span>
              <input style={{width: '80%'}} type="date" onChange={this.changeDate} name="datefilter" />
            </Col>

          </Row>
          <div className="chart-container">
          <p style={{textAlign: 'left'}}>Date - {this.state.date.toLocaleDateString()} </p>
          {this.state.graphData.length < 1 ?
                <h5>No records found</h5> :
            <Table striped bordered hover>
            <thead>
              <tr>
         
                <th>Food item</th>
                <th>Sold</th>
              </tr>
            </thead>
            <tbody>
              {this.state.graphData.map((data, i) => (
                <tr key={data.name}>
                 <td>{data.name}</td>
                 <td>{data.total}</td>
               </tr>
              ))}
              
            </tbody>
          </Table>
              }
          
            {/* <BarChart width={850} height={300} data={this.state.graphData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Bar type="monotone" dataKey="total" barSize={30} fill="#8884d8" />
              <Tooltip />
            </BarChart> */}
          </div>

        </div>
      </div>
    );
  }
}
