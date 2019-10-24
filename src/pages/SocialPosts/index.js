import React, { Component } from 'react';
import Page_head from './../components/page_head';
import Loader from './../components/simpleloader'
import ApiService from '../../services/api';
import { Row, Col, Modal } from 'react-bootstrap';
import { Base_url, live_url } from './../../utilities/config'
import LinesEllipsis from 'react-lines-ellipsis'
import './../Store/store.css'
import ConfirmPop from './../Reservation/confirm_pop'
import Pagination from "react-js-pagination";

const user = JSON.parse(localStorage.getItem('userdata')).data

export default class Social_posts extends Component {
  state = {
    loading: false,
    skip: 0,
    limit: 10,
    totalPost: 0,
    posts: [],
    ready: false,
    selectedPostId: '',
    currentPage: 1
  }

  componentDidMount() {
    this.getPosts()
  }

  getPosts = () => {
    this.setState({ loading: true })
    const data = {
      businessid: user._id,
      skip: this.state.skip,
      limit: this.state.limit
    }
    ApiService.fetch_social_posts(data)
      .then(res => res.json())
      .then(response => {
        this.setState({ posts: response.response, totalPost: response.count, loading: false })
      })
  }

  onConfirm = (id) => {
    ApiService.delete_social_post(id)
      .then(res => res.json())
      .then(response => {
        this.setState({ ready: false }, () => {
          this.getPosts()
        })
      })
  }

  deleteClick = (id) => {
    this.setState({ ready: true, selectedPostId: id })
  }

  paginate = (page) => {
    let skip = ((page - 1) * 10)
    this.setState({ currentPage: page, skip }, () => {
      this.getPosts()
    })
  }

  render() {
    const uri = `${live_url}${window.location.pathname}`
    const {limit, totalPost} =this.state
    return (
      <div className="content-container">

        <div>
          <Page_head title="Social posts" icon="fas fa-rss" />
        </div>
        <Loader loading={this.state.loading} />
        <ConfirmPop delete={true} onSave={(data) => this.onConfirm(data)} data={this.state.selectedPostId} show={this.state.ready} close={() => this.setState({ ready: false })} />
        <div className="container-inside">
          <Row>
            {this.state.posts.map(data => {
              return (
                <Col key={data._id} md={3} sm={4} xs={12} style={{ textAlign: 'left' }}>
                  <div className="singleProfile">
                    <div className="top_detail">
                      <Row>
                        <Col md={8} sm={8} xs={12}>
                          {/* <div className="photo"><img src="http://portal.bilardo.gov.tr/assets/pages/media/profile/profile_user.jpg" alt="" /></div> */}
                          <div className="name-add-time">
                            <h4>{data.guestname}</h4>
                            <p>Kolkata, India</p>
                            <p>{new Date(data.createdAt).toLocaleDateString()}</p>
                          </div>
                        </Col>
                        <Col md={4} sm={4} xs={12}>
                          <div className="post_detail">
                            <div className="postedinfacebook">
                              <div className="fb-share-button"
                                data-href={`${uri}`}
                                data-layout="button"
                                data-size="large">
                                <a target="_blank" href={`https://www.facebook.com/sharer/sharer.php?u=${uri}&amp;src=sdkpreparse`}
                                  className="fb-xfbml-parse-ignore">Share</a>
                              </div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>

                    {data.postimage == null ?
                      <div className="post_img"><img src="https://jpublicrelations.com/wp-content/uploads/2015/12/placeholder-1.png.1236x617_default.png" /></div> :
                      <div className="post_img"><img src={`${Base_url}/${data.postimage}`} /></div>}
                    <div className='body-content'>
                      <div style={{ fontWeight: 'bold' }}>{data.posttitle}</div>
                      <div className="post_middle_sec">

                        <LinesEllipsis
                          text={data.postdetails}
                          maxLine={data.postdetails == 0 ? 3 : this.state[data._id]}
                          ellipsis=' . . .'
                          trimRight
                          basedOn='letters'
                        />
                        <span style={{ color: 'blue', fontSize: 12 }} onClick={() => this.setState({ [data._id]: [data._id] > 3 ? 3 : 10 })}> {this.state[data._id] == 0 || this.state[data._id] == 3 ? 'Read more' : 'read less'} </span>
                        <div className="delete-post">
                          <button onClick={() => this.deleteClick(data._id)} className="delete-btn">Delete post</button>
                        </div>
                      </div>
                    </div>


                  </div>

                </Col>
              )
            })}
          </Row>
          <center style={{float: 'right'}}>
            <Pagination
              activePage={this.state.currentPage}
              itemsCountPerPage={limit}
              totalItemsCount={totalPost}
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
            </center>
        </div>
      </div>
    );
  }
}
