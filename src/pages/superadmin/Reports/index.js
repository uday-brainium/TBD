import React, { Component } from 'react';
import Select from 'react-select';
import { Row, Col } from 'react-bootstrap';
import './../Dashboard/style.css'
import ApiService from '../../../services/api';
import SearchResult from './searchResult'
import { Link, withRouter } from "react-router-dom"
import Loader from './../../components/simpleloader'
import InactiveReport from './inactiveBusiness'
import NewBusinesses from './newBusinesses'

 class Reports extends Component {

  state = {
    businessList: [],
    selectedOption: null,
    countries: {},
    states: {},
    cities: {},

    countrySeleted: 'US',
    stateSelected: 'AL',
    citySelected: '',
    zipcode: '',
    result: [],
    loading: false
  }

  componentDidMount() {
    ApiService.businessList()
    .then(res => {
      if(res.status == 200) {
        this.setState({businessList: res.data})
        this.fetchLocation()
      }
    })
  }

  fetchLocation = () => {
    ApiService.get_countries_list()
    .then((res) => res.json()
    ).then((data) => {
      this.setState({countries: data.result}, () => {
        this.setState({test: true})
      })
      this.fetchCities(this.state.stateSelected)
    })

    //default country USA states 
    ApiService.get_states_by_country(this.state.countrySeleted)
    .then((res) => res.json())
    .then((data) => this.setState({states: data.result}))
  
  }

  fetchCities = (state) => {
    ApiService.get_cities_by_state(state)
    .then((res) => res.json())
    .then((data) => this.setState({cities: data.result}))
  }

  handleChangeUser = (selectedOption) => {
    this.setState({ selectedOption }, () => {
      this.searchSubmit()
    });
    //console.log(selectedOption);
  }

  handleChangeState = (selectedOption) => {
    this.setState({ stateSelected: selectedOption, stateName: selectedOption.label }, () => {
      this.fetchCities(selectedOption.value.toString())
    });
  }

  handleChangeCities = (selectedOption) => {
    this.setState({ citySelected: selectedOption });
  }

  renderBusiness = () => {
      let list = []
      const {businessList} = this.state
      businessList.map(data => {
        list.push({ value: data._id, label: data.businessname })
      })
      return list
  }

  renderCountries = () => {
    const countriesList = Object.values(this.state.countries)
    let list = []

    if(countriesList) {
      countriesList.map(data => {
       if(data == 'United States')
        list.push({ value: data, label: data })
      })
    }
    return list
}


renderStates() {
  let stateList = []
  for(var key in this.state.states) {
    if (this.state.states.hasOwnProperty(key)) {
     if(stateList.length < 51) {
      stateList.push(
          {value : key.replace(/['"]+/g, ''), label: this.state.states[key] }
      );
     }
    }
  }
 return stateList
}

renderCities = () => {
  const citiList = Object.values(this.state.cities)
  let list = []

  if(citiList) {
    citiList.map(data => {
      list.push({ value: data, label: data })
    })
  }
  return list
}

countryChange = (selectedOption) => {
  this.setState({ countrySeleted: selectedOption });
}

searchSubmit = () => {
  this.setState({loading: true})
  this.setState({selectedOption: null})
  const { selectedOption, stateSelected, countrySeleted, citySelected, zipcode } = this.state
  const data = {
    state: stateSelected.value,
    city: citySelected.value,
    country: countrySeleted.value,
    zipcode,
    businessId: selectedOption ? selectedOption.value : null
  }
  ApiService.filteredBusinessList(data)
  .then(res => {
    if(res.status == 200) {
      this.setState({result: res.data}, () => {
        this.setState({loading: false})
      })
    }
  })
}

changeZip = (e) => {
  const value = e.target.value
  this.setState({zipcode: value})
}

monitor = (businessId, businessName) => {
  //console.log("ID", businessId);
  this.props.history.push({
    pathname: '/sa_monitor_business',
    state: { id: businessId, name: businessName }
  })
}

  blockBusiness = (businessId) => {
    let ask = window.confirm("Are you sure !");
    if(ask) {
      ApiService.block_unblock_business(businessId)
      .then(res => {
        if(res.status == 200) {
          this.searchSubmit()
        }
      })
    }
  }
  render() {
    const {test, selectedOption, countries, states, cities, countrySeleted, stateSelected, citySelected } = this.state
    return (
      <div className="page-container">
        <Loader loading={this.state.loading} background='no-fill' />
        <h5 className="heading-text"><i className="fas fa-chart-bar"></i> Business Reports</h5>
        <hr></hr>
   
        <div className="content">
          <div className="editor-box" style={{height: 600}}>
          <h6 style={{ marginBottom: 20 }}>Search for businesses</h6>
            <Row>
              <Col>
                <label>Businesses</label>
                <Select
                  value={selectedOption}
                  onChange={this.handleChangeUser}
                  options={this.renderBusiness()}
                  classNamePrefix="user-select-res"
                />
              </Col>
            </Row>
            <p style={{textAlign: 'center', marginTop: 5, marginBottom: 5}}>OR</p>
          
           <Row>
            <Col>
            <label>Country</label>
             {/* <Select
                value={countrySeleted}
                defaultValue="US"
                onChange={this.countryChange}
                options={this.renderCountries()}
                classNamePrefix="user-select-res"
              /> */}
              <h6>United States</h6>
            </Col>
            <Col>
             <label>State</label>
             <Select
                value={stateSelected}
                onChange={this.handleChangeState}
                options={this.renderStates()}
                classNamePrefix="user-select-res"
              />
            </Col>
            <Col>
             <label>Cities</label>
             <Select
                value={citySelected}
                onChange={this.handleChangeCities}
                options={this.renderCities()}
                classNamePrefix="user-select-res"
              />
            </Col>
            <Col>
             <label>Zipcode</label>
             <input className="zip-entry" type="number" maxLength="6" name="zipcode" onChange={this.changeZip} placeholder="Zipcode"/>
            </Col>
            <Col>
              <div style={{marginTop: 25}}>
                <button onClick={this.searchSubmit} className="search-btn">Search</button>
              </div>
            </Col>
           </Row> 

            <SearchResult
             result={this.state.result} 
             onMonitor={(businessId, businessName) => this.monitor(businessId, businessName)}
             blockUnblock = {(id) => this.blockBusiness(id)}
            />
          </div>
           
          <NewBusinesses />

          <InactiveReport />
        </div>
      </div>
    );
  }
}

export default withRouter(Reports)