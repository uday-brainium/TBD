import React, { Component } from 'react';
import { Row, Col, Modal } from 'react-bootstrap';
import ApiService from '../../services/api';
import './food.css'
import './../Store/store.css'
import Loader from './../components/simpleloader'
import Notifications, { notify } from 'react-notify-toast';
import IngredientsModal from './../Food_menu/ingridientModal'

export default class Item_edit extends Component {

  state = {
    menuList: [],
    user_id: '',
    ingredientModal: false,
    ingredientArray: [],
    ingredientname: '',
    ingredientprice: 0.5,
    included: false
    // is_veg: '',
    // glutenfree: ''
  }


  changeIngredient = (e) => {
    if(e.target.name == 'included') {
      this.setState({included: e.target.checked})
    } else {
      this.setState({[e.target.name] : e.target.value})
    }
  }

  saveIngredient = () => {
    let array = {
      name: this.state.ingredientname,
      price: this.state.ingredientprice,
      included: this.state.included
    }
    this.state.ingredientArray.push(array)
    //console.log('array', this.state.ingredientArray);
  }

  removeingredients = (name) => {
    this.state.ingredientArray.map((data, i) => {
      if(data.name == name) {
        this.state.ingredientArray.splice(i, 1)
        this.setState({test: true})
      }
    })
  }


  UNSAFE_componentWillReceiveProps (nextProps) {
    if(nextProps && nextProps.item.user_id) {   
      this.setState({
        itemtitle: nextProps.item.itemtitle,
        itemcost: nextProps.item.itemcost,
        itemdescription: nextProps.item.itemdescription,
        is_veg: nextProps.item.is_veg,
        glutenfree: nextProps.item.glutenfree,
        ingredientArray: nextProps.item.ingredients
      })
      ApiService.fetchmenuData(nextProps.item.user_id)
      .then(res => res.json())
      .then(response => {
        if (response.success) {
          this.setState({menuList: response.menu})
        } else {
          console.log('error in fetching menulist');
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    }
  }

  handleChange = (e) => {
    let name = e.target.name
    let val = e.target.value
    if(name == 'is_veg' || name == "glutenfree") {
      console.log('qwqwe',  e.target.checked,   e.target.checked  );
      this.setState({[name]: e.target.checked})
    } else {
      this.setState({[name]: val})
    }
   
  }

  handleSubmit = (e) => {
    this.setState({loading: true})
    e.preventDefault()
    let data = {
      itemid: this.props.item._id,
      title: this.state.itemtitle,
      cost: this.state.itemcost,
      description: this.state.itemdescription,
      is_veg: this.state.is_veg,
      glutenfree: this.state.glutenfree,
      ingredients: this.state.ingredientArray
    }
    ApiService.updateItem(data)
    .then(res => res.json())
    .then((response) => {
      if(response.status == 200) {
        this.setState({loading: false})
        this.props.closeEdit()
        notify.show('Item edited !', 'success', 3000);
      } else {
        notify.show('Item edit failed !', 'error', 3000);
        this.setState({loading: false})
      }
    })
  }

  render() {
   // console.log('asd0', this.state);
    
    return (
      <div>
        <Loader loading={this.state.loading} />
        <Notifications />
        <Modal
          show={this.props.show}
          onHide={() => this.props.closeEdit()}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
             Edit item
          </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="form" onSubmit={this.handleSubmit}>
              <div className="inputOuter">
              <div className="label-small">Food menu</div>
                <select disabled={true} name="menuitem" onChange={this.handleChange} required>
                  {this.state.menuList.map((dynamicData, index) => 
                     (
                      <option key={dynamicData._id} value={dynamicData._id}>
                        {dynamicData.title}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div className="inputOuter">
              <div className="label-small">Item name</div>
                <input type="text" name="itemtitle" defaultValue={this.props.item.itemtitle} onChange={this.handleChange} required/>
              </div>

              <div className="inputOuter">
              <div className="label-small">Item cost</div>
                <input type="text" name="itemcost" defaultValue={this.props.item.itemcost} onChange={this.handleChange} required/>
              </div>
               
              <div className="item-ingredients" onClick={() => this.setState({ingredientModal: true})}>
                  <div className="plus-btn"><i className="fas fa-plus-circle"></i> ingredients</div>
              </div>

              {this.state.ingredientArray.length > 0 &&
                <div className="ingredients-container">
                  {this.state.ingredientArray.map(data => { 
                    return (
                    <div key={data.name} className="ingredient-item">
                       {data.name}
                      <div onClick={() => this.removeingredients(data.name)} style={{float: 'right', marginLeft: 10, color: 'red', fontSize: 18, cursor: 'pointer'}}><i className="fas fa-times-circle"></i></div>
                      <div style={{float: 'right'}}>${data.price}</div> 
                      <div style={{float: 'right', color: 'green', marginRight: 5}}>{data.included == true ? '(Inc)' : ''}</div> 
                    </div>
                    )
                  })
                  }
                </div>}
                
                <IngredientsModal
                 close={() => this.setState({ingredientModal: false})} 
                 show={this.state.ingredientModal} 
                 change={(e) => this.changeIngredient(e)}
                 save = {() => this.saveIngredient()}
                 />

              <Row className="checkbox-row">
                  <Col>
                  <div className="">
                    <label className="checkbox-react">Veg
                      <input type="checkbox" name="is_veg" defaultChecked={this.state.is_veg} onChange={this.handleChange} />
                      <span className="checkmark"></span>
                    </label>
                   
                  </div>
                  </Col>

                  <Col>
                    <div className="">
                    <label className="checkbox-react">Gluten Free
                      <input type="checkbox" name="glutenfree" defaultChecked={this.state.glutenfree} onChange={this.handleChange} />
                      <span className="checkmark"></span>
                    </label>
                    </div>
                  </Col>
                </Row>
              <div className="textareaOuter">
              <div className="label-small">Item description</div>
                <textarea
                  onChange={this.handleChange}
                  placeholder="Description"
                  name="itemdescription"
                  defaultValue = {this.props.item.itemdescription}
                  required
                /> 
                
              </div>
              <input className="button" type="submit" value="Edit item" />
            </form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
