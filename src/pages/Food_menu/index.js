import React, { Component } from 'react'
import Page_head from './../components/page_head'
import { Row, Col } from 'react-bootstrap'
import Pagination from "react-js-pagination"
import { withRouter } from "react-router-dom"
import { connect } from 'react-redux'
import Skeleton from 'react-skeleton-loader'
import Notifications, { notify } from "react-notify-toast"
import Empty from '../components/empty'
import ApiService from '../../services/api'
import { confirmAlert } from 'react-confirm-alert' // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import Small_pop from './small_pop'


let userid = localStorage.getItem('user-id')

class Food_menu extends Component {

  state = {
    menuData: [],
    dataLoading: true,
    offset: 0,
    limit: 10,
    page: 1,
    totalmenu: 0,
    searchkey: '',
    offerDelivery: false,
    deliveryCharge: 0,
    smallPop: false,
    business: {},
    isBankAdded: true
  };

  componentDidMount() {
    this.updateMenuData()
    this.fetchStore()
  }

  fetchStore = () => {
    ApiService.profileData("", userid)
    .then(res => res.json())
    .then(response => {
      if(response.success) {
        this.setState({business: response.data, isBankAdded: response.data.payment.stripe_account ? true : false})
      }
      console.log("response", response);
      
    })
  }

  handleChange = (e) => {
    this.setState({ searchkey: e.target.value })
  }

  handleCheckBox = (e) => {
    if (!e.target.checked) {
      this.saveDeliveryData(0, false)
    }
    this.setState({ offerDelivery: e.target.checked, smallPop: e.target.checked })
  }

  searchMenus = () => {
    this.setState({ dataLoading: true, page: 1 })
    this.updateMenuData()
  }
  clearSearchInput = () => {
    this.setState({ searchkey: '', dataLoading: true }, () => {
      this.updateMenuData()
    })
  }

  editMenu = (data) => {
    this.props.history.push({
      pathname: "/editmenu",
      state: {
        dynamicMenuListid: data._id
      }
    });
  }

  addMenu = () => {
    this.props.history.push("/addmenu");
  }

  addItem = () => {
    this.props.history.push("/additem");
  }

  deleteMenu = (menu) => {
    confirmAlert({
      title: 'Are you sure ?',
      message: 'Food items inside this menu will be deleted',
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.executeItemDelete(menu._id)
        },
        {
          label: 'View items',
          onClick: () => this.goToItems(menu)
        }
      ]
    });
  }

  executeItemDelete = (menuId) => {
    ApiService.deleteMenu(menuId)
      .then(menulistres => menulistres.json())
      .then(menulistresponse => {
        if (menulistresponse.success === true) {
          this.updateMenuData()
          notify.show('Menu deleted successfully', 'success', 5000);
        }
        else {
          notify.show(menulistresponse.message, 'error', 5000);
        }
      })
      .catch(function (menullisterror) {
        console.log(menullisterror);
      })
  }

  updateMenuData = () => {
    let userdata = localStorage.getItem('userdata')
    let delivery = JSON.parse(userdata).data.fooddelivery
    let deliveryCharge = JSON.parse(userdata).data.fooddeliverycharge
    if(delivery) {
      this.setState({offerDelivery: true, deliveryCharge})
    } else {
      this.setState({offerDelivery: false})
    }

    let searchKey = this.state.searchkey
    let offset = this.state.offset
    let limit = this.state.limit
    ApiService.fetchmenuData(userid, offset, limit, searchKey)
      .then((res) => res.json())
      .then((response) => {
        this.setState({ menuData: response.menu, totalmenu: response.count, dataLoading: false })
      })
  }

  paginate = (page) => {
    let offset = ((page - 1) * 10)
    this.setState({ page, offset }, () => {
      this.updateMenuData()
    })
  }

  goToItems = (menu) => {
    this.props.history.push({
      pathname: `/food_item`,
      state: menu
    })
  }

  closeSmallPop = () => {
    this.setState({
      smallPop: false,
      offerDelivery: false
    })
  }

  saveDeliveryData = (charge, check) => {
    let update = {
      userid: localStorage.getItem('user-id'),
      delivery: check,
      charge: charge
    }
    ApiService.update_delivery_option(update)
      .then(res => res.json())
      .then((response) => {
        console.log(response);
        let save = {
          data: response.response
        }
        localStorage.setItem('userdata', JSON.stringify(save))
        notify.show('Delivery option updated', 'success', 5000);
      })
    this.setState({ smallPop: false, offerDelivery: true, deliveryCharge: charge })
  }

  navigateToPayment = () => {
    this.props.history.push('/payments')
  }

  render() {
    const { business} = this.state
    const isBankAdded = business.payment && business.payment.stripe_account && business.payment.stripe_account.id ? true : false 
    console.log("IS", isBankAdded);
   // const isBankAdded = true
    const menuList = this.state.menuData
      .map((menuList, index) => {
        return (
          <div className="tableRow" key={index}>
            <div className="link" onClick={() => this.goToItems(menuList)}>{menuList.title}</div>
            <div className="edit-delete">
              <a className="link" onClick={() => this.editMenu(menuList)}>Edit</a> <span>I</span> <a className="link" onClick={() => this.deleteMenu(menuList)} >Delete</a>
            </div>
          </div>
        );
      })
    return (
      <div className="content-container">
        <Page_head title="Food Menu" icon="fas fa-hamburger" />
        <Notifications />
        <Small_pop show={this.state.smallPop} saveData={(charge, check) => this.saveDeliveryData(charge, true)} close={this.closeSmallPop} />
        <div>
          {!isBankAdded &&  <div className="nobank-alert">
            <span className="nobank-text">No bank added yet food ordering will be disbled ! <a href="javascript:void()" onClick={this.navigateToPayment}> Add now </a></span>
           </div> }
          <Row className="form gap">
            <Col>
              <div className="singleCheckbox">
                <input id="terms" type="checkbox" name="offerDelivery" checked={this.state.offerDelivery} onChange={this.handleCheckBox} />
                <label htmlFor="terms"><span></span>Offer food delivery</label>
              </div>
              {this.state.offerDelivery && <label className="label-small" htmlFor="terms1"><span></span>* Offering delivery with ${this.state.deliveryCharge} delivery charge</label>}
            </Col>
          </Row>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-0">
              <div className="form gap">
                <Row>
                  <Col xs={6} lg={6} md={6}>
                    <div className="inputOuter">
                      <i onClick={this.clearSearchInput} className="far fa-times-circle input-clear"></i>
                      <input className="search-input" name="searchkey" type="text" placeholder="Search menu" value={this.state.searchkey} onChange={this.handleChange} />
                    </div>
                  </Col>
                  <Col xs={6} lg={6} md={6}>
                    <button onClick={this.searchMenus} type="submit" disabled={false} className="button search-btn">Search</button>
                  </Col>
                </Row>
              </div>
            </div>
            {/* <div className="col-lg-2 col-md-2 col-sm-2">
        
            </div> */}
            <div className="col-lg-3 col-md-3 col-sm-3">
              <button onClick={this.addItem} className="add-btn right" > <i className="fas fa-plus"></i> Add Item </button>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
              <button onClick={this.addMenu} className="add-btn right" ><i className="fas fa-plus"></i> Add Menu </button>
            </div>
          </div>
        </div>
        <div className="searchTable top-fix">
          <div className="header">
            <div className="">Menu</div>
            <div className="">Action</div>
          </div>

          {this.state.dataLoading ?
            <Skeleton count={5} width='90%' /> :
            menuList.length > 0 ?
              menuList :
              <Empty text="No menu found !" />
          }
        </div>

        <div className="paginationWrapper">
          <Pagination
            activePage={this.state.page}
            itemsCountPerPage={this.state.limit}
            totalItemsCount={this.state.totalmenu}
            pageRangeDisplayed={5}
            onChange={this.paginate}
            prevPageText="Prev"
            nextPageText="Next"
            activeClass="pagination-active"
            activeLinkClass="pagination-active-link"
            itemClass="pagination-item"
            hideFirstLastPages={true}
            linkClass="pagination-link-class"
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    userdata : state.primaryuserdata
  }
}

export default connect(mapStateToProps)(withRouter(Food_menu))