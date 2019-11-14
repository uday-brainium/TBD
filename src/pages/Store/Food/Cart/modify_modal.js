import React, { Component } from 'react';
import { Row, Col, Modal } from 'react-bootstrap';
import {updateCart} from './../Cart'

let totalUpcharge = 0

export default class Modify_modal extends Component {
  state = {
    field: '',
    error: false,
    ingredientArrayModal: [],
    freeIngredients: [],
    paidIngredients: [],
    selectedIngredients: [],
    upcharge: true,
    totalUpcharge: 0,
    allIngredient: [],
    selected: ''
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if(nextProps) {

      this.state.selectedIngredients = []
      this.setState({ingredientArrayModal: nextProps.item.ingredients}, () => {
        if(this.state.ingredientArrayModal){
        this.state.ingredientArrayModal.map(data => {
          if(data.included) {
            this.state.freeIngredients.push(data)
            this.state.selectedIngredients.push(data)
            this.setState({test: true})
          } else {
            this.state.paidIngredients.push(data)
          }
        })
        }
      })
    }
  }

  removeingredientsModal = (name) => {
    this.state.selectedIngredients.map((data, i) => {
      if(data.name == name) {
        this.state.selectedIngredients.splice(i, 1)
        this.setState({test: true})
      }
    })
  }

  checkExistIngredient = () => {
    return new Promise((resolve, reject) => {
      this.state.selectedIngredients.map(selectedData => {
        if(this.state.selected == selectedData.name) {
          resolve(true)
        }
      })
      resolve('undefined')
    })
    
  }

  addIngredients = () => {
     this.checkExistIngredient().then(res => {

      if(res != true) {
        this.state.ingredientArrayModal.map((data, i) => {
          if(data.name == this.state.selected) {
              this.state.selectedIngredients.push(data)
              this.setState({test: true})
             } 
        })
      }
    })
  }

  countUpcharge = () => {
    let total = 0
    if(this.state.selectedIngredients) {
      this.state.selectedIngredients.map (data => {
        if(!data.included)
          total += JSON.parse(data.price)
      })
      return total.toFixed(2)
    }
  }

  handleChange = () => {  
    this.setState({upcharge: !this.state.upcharge})
  }

  getIngredients = (itemid) => {
    let ing = []
    const cart = JSON.parse(localStorage.getItem('cart'))
    cart.cart.map(data =>  {
      if(data.itemid == itemid) {
        ing.push(data.ingredients)
      }
    })
    return ing
  }

  saveItem = () => {    
    const {item} = this.props

    let cartitem = {
      itemid: item.itemid,
      itemname: item.itemname,
      itemprice: item.itemprice,
      itemdescription: item.itemdescription,
      ingredients: this.getIngredients(item.itemid)[0],
      selectedIngredients: this.state.ingredientArrayModal,
      ingredientPrice: this.countUpcharge(),
      count: item.count
    }

    const cart = JSON.parse(localStorage.getItem('cart'))
    cart.cart.map(data =>  {
      if(data.itemid == item.itemid) {
        data.itemid = item.itemid,
        data.itemname = item.itemname,
        data.itemprice = item.itemprice,
        data.itemdescription = item.itemdescription,
        data.ingredients = this.getIngredients(item.itemid)[0],
        data.selectedIngredients = this.state.ingredientArrayModal,
        data.ingredientPrice = this.countUpcharge(),
        data.count = item.count
      }
    })

    localStorage.setItem('cart', JSON.stringify(cart))
    this.props.close()
  }

  renderPaidIngredients = () => {
    let paid = [(<option key={0} selected="selected" disabled="disabled" value="">Choose Ingredient</option>)]
    if(this.state.ingredientArrayModal) {
      this.state.ingredientArrayModal.map(data => {
        if(!data.included) {
          paid.push(<option key={data.name} value={data.name}>{data.name}</option>)
        }
      })
      return paid
    } 
  }

  render() {
    const {item} =this.props
    const {ingredientArrayModal, selectedIngredients} = this.state
    console.log('ingredients', this.state.selectedIngredients);
    

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
              Modify {item.itemname}
          </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ width: '100%'}}>
          <div>
            <label> Choose ingredient: 
              <select onChange={(e) => this.setState({selected: e.target.value})} className="ingredient-select">
                {this.renderPaidIngredients()}
              </select>
              <button disabled={this.state.selected == "" ? true : false} onClick={this.addIngredients} className="add-ingredient">Add</button>
            </label>
            {selectedIngredients &&
              selectedIngredients.length > 0 ?
            <div className="ingredients-container" style={{margin: 0,width: '95%'}}>
              {selectedIngredients.map(data => {
                return (
                <div key={data.name} className="ingredient-item">
                  {data.name}
                  <div onClick={() => this.removeingredientsModal(data.name)} style={{float: 'right', marginLeft: 10, color: 'red', fontSize: 18, cursor: 'pointer'}}><i className="fas fa-times-circle"></i></div>
                  <div style={{float: 'right', color: 'green'}}>{data.included ? 'Included' : `$${data.price}`}</div> 
                </div>
                )
              })
              }
            </div> :
            <div><h6>No included ingredients found !</h6></div>
            }
            
            <span style={{fontSize: 14, color: 'gray'}}>Above ingredients will be added with your item.</span> 
            {/* <label className="checkbox-react" style={{marginTop: 10}}>Upcharge amount - ${this.countUpcharge()}
              <input type="checkbox" name="upcharge" defaultChecked={this.state.upcharge} onChange={this.handleChange} />
              <span className="checkmark"></span>
            </label> */}

            <button onClick={this.saveItem} className="place-order" style={{marginTop: 5, width: '95%'}} disabled={!this.state.upcharge}>
              Modify item
            </button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
