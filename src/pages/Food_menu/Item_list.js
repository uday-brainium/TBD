import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Page_head from './../components/page_head'
import { Row, Col } from 'react-bootstrap';
import Notifications, { notify } from 'react-notify-toast';
import Pagination from "react-js-pagination";
import ApiService from '../../services/api';
import Empty from './../components/empty'
import Skeleton from 'react-skeleton-loader';
import Loader from './../components/simpleloader'
import ItemEditModal from './item_edit'

class Item_list extends Component {

   state = {
     item: {},
      menu: {},
      items: [],
      searchkey: '',
      dataLoading: true,
      loading: false,
      offset: 0,
      limit: 10,
      page: 1,
      totalItem: 0,
      editModal: false
    };

  componentDidMount() {
    let menu = this.props.history.location.state
    this.setState({menu})

    ApiService.getItems(menu._id)
    .then((res) => res.json())
    .then((response) => {
      this.setState({items: response.menu, totalItem: response.count, dataLoading: false})
    })
  }

  updateItemData = () => {
    ApiService.getItems(this.state.menu._id, this.state.offset, this.state.limit, this.state.searchkey)
    .then((res) => res.json())
    .then((response) => {
      this.setState({items: response.menu, totalItem: response.count, dataLoading: false})
    })
  }

  clearSearchInput = () => {
    this.setState({searchkey: '', dataLoading: true}, () => {
      this.updateItemData()
    })
  }

  handleChange = (e) => {
    let name = e.target.name
    let val = e.target.value
    this.setState({[name]: val})
  }

  deleteMenu = (id) => {
    this.setState({loading: true})
    ApiService.deleteItem(id)
    .then(res => res.json())
    .then((response) => {
      if(response.success){
        this.setState({loading: false}, () => {
          notify.show('Item deleted !', 'success', 3000);
        })
      } else {
        this.setState({loading: false}, () => {
          notify.show('Failed to delete item', 'error', 3000);
        })
      }
      this.updateItemData()
    })
  }

  searchUsers = () => {
    this.setState({dataLoading: true})
   this.updateItemData()
  }

  addItem = () => {
    this.props.history.push({
      pathname: `/additem`,
      state: this.state.menu._id
    })
  }

  editMenu = (item) => {
    this.setState({
      item,
      editModal: true
    })
  }

  paginate = (page) => {
    let offset = ((page -1) * 10)
    this.setState({page, offset}, () => {
      this.updateItemData()
    })
  }

  closeEditModal = () => {
    this.setState({editModal: false, item: {}})
    this.updateItemData()
  }


  render() {
    const itemList = this.state.items
   .map((items, index) => {
      return (
        <div className="tableRow" key={index}>
          <div>{items.itemtitle}</div>
          <div>${items.itemcost}</div>
          <div className="edit-delete">
            <a className="link" onClick={() => this.editMenu(items)}>Edit</a> <span>I</span> <a className="link" onClick={() => this.deleteMenu(items._id)} >Delete</a>
          </div>
        </div>
      );
    })
    return (
      <div className="content-container">
        <Loader loading={this.state.loading} background="no-fill" />
        <div >
          <Page_head title = {`${this.state.menu.title} > Items`} icon="fas fa-hamburger"/>
          <Notifications />
          <ItemEditModal item={this.state.item} show={this.state.editModal} closeEdit={this.closeEditModal}/>
          <div>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-0">
             <div className="form gap">
              <Row>
                <Col xs={6} lg={6} md={6}>
                  <div className="inputOuter">
                      <i onClick={this.clearSearchInput} className="far fa-times-circle input-clear"></i>
                      <input className="search-input" name="searchkey" type="text"  placeholder="Search users" value={this.state.searchkey} onChange={this.handleChange}/>
                  </div>
                </Col>
                <Col xs={6} lg={6} md={6}>
                 <button onClick={this.searchUsers} type="submit" disabled={false} className="button search-btn">Search</button>
                </Col>
                </Row>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-3">
        
            </div>
            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
              <button onClick={this.addItem} className="add-btn right" ><i className="fas fa-plus"></i> Add more </button>
            </div>
          </div>
        </div>
        <div className="searchTable top-fix">
            <div className="header">
              <div className="">Item</div>
              <div className="">Price</div>
              <div className="">Action</div>
            </div>

            {this.state.dataLoading ? 
              <Skeleton count={5} width='90%' /> : 
              itemList.length > 0 ? 
              itemList :
              <Empty text="No Items found !"/>
            } 
          </div>

          <div className="paginationWrapper">
          <Pagination
            activePage={this.state.page}
            itemsCountPerPage={this.state.limit}
            totalItemsCount={this.state.totalItem}
            pageRangeDisplayed={5}
            onChange={this.paginate}
            prevPageText="Prev"
            nextPageText="Next"
            activeClass = "pagination-active"
            activeLinkClass="pagination-active-link"
            itemClass="pagination-item"
            hideFirstLastPages={true}
            linkClass="pagination-link-class"
          />
          </div>  
        </div>
      </div>
    );
  }
}

export default withRouter(Item_list)