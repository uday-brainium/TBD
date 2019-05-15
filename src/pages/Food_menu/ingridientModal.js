import React, { Component } from 'react';
import { Row, Col, Modal } from 'react-bootstrap';

export default class Ingridient_modal extends Component {
  state = {
    field: '',
    error: false,
    included: false
  }

  renderPriceField = () => {
    let decimal = []
    for(let i = 1; i < 21; i++ ){
      decimal.push(<option value={i/4} key={i}>$ {i / 4}</option>)
    }
    return decimal
  }

  fieldChange = (e) => {
    this.setState({field: e.target.value})
    this.props.change(e)
  }

  handleChange = (e) => {
    const value = e.target.value
    this.setState({included: value})
    this.props.change(e)
  }

  saveIngredients = (e) => {
    e.preventDefault()
    if(this.state.field == "") {
      this.setState({error: true})
    } else {
      this.setState({error: false})
      this.props.save()
      this.props.close()
    }
  }

  render() {
    return (
      <div>
        <Modal
          show={this.props.show}
          onHide={() => this.props.close()}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Add ingredients
          </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{width: '100%', padding: 0}}>
          <div>
    
            <div className="input-amount">
              <input placeholder="Ingredient name" type="text" name="ingredientname" onChange={this.fieldChange} required/>
              {this.state.error ? (<p style={{color: 'red', fontSize: 12, marginTop: -15, marginLeft: 10}}>This field is required</p>) : ''}
            </div>
            <Row>
              <Col lg={3} md={3} sm={3} xs={3}>
                <div className="input-label">
                  price
                </div>
              </Col>

              <Col lg={9} md={9} sm={9} xs={9}>
                <div className="input-unit">
                  <select name="ingredientprice" onChange={(e) => this.props.change(e)} required> 
                    {this.renderPriceField()}
                  </select>
                </div>
              </Col>
            </Row>

            <label className="checkbox-react" style={{marginTop: 10}}>Included with base price
                <input type="checkbox" name="included" defaultChecked={this.state.included} onChange={this.handleChange} />
                <span className="checkmark"></span>
              </label>

            <button onClick={this.saveIngredients} style={{width: '92%', backgroundColor: 'orange'}}>
              Save
            </button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
