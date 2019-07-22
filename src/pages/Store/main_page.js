import React, { Component } from "react";
import ReactDOM from 'react-dom'
import { withRouter } from "react-router-dom"
import { Row, Col, Button } from 'react-bootstrap';
import moment from 'moment';
import LinesEllipsis from 'react-lines-ellipsis'
import noUserImage from './../../images/profile-no-image.jpg'
import foodImage from './../../images/food.jpg'
import { Base_url, live_url } from './../../utilities/config'
import ApiService from './../../services/api'
import Loader from './../components/simpleloader'
import './../../styles/style_sheet.css'
import './store.css'
import Header from './header'
import Navigation from './navigation'
import Page_title_head from "./page_title_head"
import Add_post from './../Store/Social/post_add_modal'
import InfiniteScroll from 'react-infinite-scroller';

let path = window.location.pathname
let extension = path.substring(1)
var _ = require('lodash');


let userdata = JSON.parse(localStorage.getItem('guest-userdata'))

class Main_page extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      storeDetails: {},
      loading: true,
      timeModal: false,
      overlayStyle: {
        'display': 'none'
      },
      dummyText: "Fabulous food! We had ordered Clay pot chicken, Steamed Bhetki,mei fun noodles, yong chow fried rice. Annirudha our host suggested that we have the fried rice just with egg.",
      read_more1: 0,
      read_more2: 0,
      read_more3: 0,

      add_modal: false,
      posts: [],

      skip: 0,
      limit: 6,
      currentPage: 1,
      totalPost: 0,
      hasMore: true
    }
  }

  componentDidMount() {
    this.setState({ loading: true })
    let path = window.location.pathname
    let extension = path.substring(1)

    ApiService.getBusinessProfbyUrl(extension)
      .then(res => res.json())
      .then(response => {
        if (response.status == 200) {
          this.setState({
            storeDetails: response.response,
            loading: false
          }, () => {
            this.fetchPosts()
          })

        } else {
          this.props.history.push('/')
        }

      })
      .catch(function (error) {
        console.log('err---------', error)
      })

  }


  fetchPosts = () => {
    const businessid = this.state.storeDetails.businessid
    const data = {
      businessid,
      skip: this.state.skip,
      limit: this.state.limit
    }

    ApiService.fetch_social_posts(data)
      .then(res => res.json())
      .then(response => {
     //   console.log('qwe', response);
        this.setState({ posts: response.response, totalPost: response.count })
      })
  }

  onEventClick = () => {
    this.props.history.push({
      pathname: `/${extension}/events/`,
      state: this.state.storeDetails
    })
  }


  closeAddModal = () => {
    this.setState({ add_modal: false }, () => {
      this.fetchPosts()
    })
  }

  addPost = () => {
    this.setState({ add_modal: true })
  }

  paginate = (page) => {
    let skip = ((page - 1) * this.state.limit)
   // console.log("page", page, skip);
    this.setState({ currentPage: page, skip }, () => {
      this.fetchPosts()
    })
  }

  loadMoreFetch = (limit) => {
    const businessid = this.state.storeDetails.businessid
    const data = {
      businessid,
      skip: 0,
      limit: limit
    }

    ApiService.fetch_social_posts(data)
      .then(res => res.json())
      .then(response => {
       // console.log('loader', response);
        if (response.response.length != 0) {
          this.setState({ posts: response.response })
        }
      })
  }

  loadMore = (page) => {
    const totalPage = Math.ceil(this.state.totalPost / this.state.limit)
    if (totalPage > page - 1) {
    //  console.log('hellokjdsf', page);
      const limit = page * 6
      this.loadMoreFetch(limit)
    }
  }

  onReact = (postid, reaction) => {
    if (userdata != null) {
      const click = `reactClick_${postid}`
      this.setState({ [click]: reaction })
      const userid = userdata._id
      ApiService.react_on_post(postid, userid, reaction)
        .then(res => res.json())
        .then(response => {
          if (response.status == 200) {
            this.loadMoreFetch()
          } else {
            alert('Oops something went wrong !')
          }
        })
    } else {
      alert('Please login to react on a post !')
    }
  }

  alreadyReacted = (reatedBy) => {
    if (userdata != null) {
      let reactOn = 0
      const guestId = userdata._id
      reatedBy.map(list => {
        if(list.guest == guestId) {
          reactOn = list.react;
        }
      })
      return reactOn
    } else {
      return 0
    }
  }

  postDetails = (post) => {
    this.props.history.push(`/${extension}/post`, {post, extension})
  }

  render() {
    const uri = `${live_url}${window.location.pathname}`;
    userdata = JSON.parse(localStorage.getItem('guest-userdata'))
    const { totalPost, limit } = this.state
    const { reactClick } = this.state

    return (
      <div>
        <div className="backoverlay" onClick={this.hideOverlay} style={this.state.overlayStyle}></div>
        <Loader loading={this.state.loading} background='fill' />
        <Header
          storebanner={this.state.storeDetails.storebanner}
          rating={4.7}
          votes={67}
          businessname={this.state.storeDetails.businessname}
          address={this.state.storeDetails.address}
          phone={this.state.storeDetails.phone}
          modalShow={this.state.timeModal}
          timings={this.state.storeDetails.timings}
          closedon={this.state.storeDetails.closedon}
        />
        <Page_title_head title="Social post" />
        <Add_post show={this.state.add_modal} close={this.closeAddModal} storeData={this.state.storeDetails} />
        <div className="post_type_div">
          <div className="container">
            <Row style={{ marginBottom: 10 }}>
              <Col lg={4} md={4} sm={6} xs={0}></Col>
              <Col lg={4} md={4} sm={0} xs={0}></Col>
              <Col lg={4} md={4} sm={6} xs={12}>
                <button className="button" disabled={userdata == null ? true : false} onClick={this.addPost}>Add post</button>
              </Col>
            </Row>
            <InfiniteScroll
              pageStart={0}
              loadMore={(page) => this.loadMore(page)}
              hasMore={true}
              useWindow={true}
              initialLoad={false}
            >
              <Row>
                {this.state.posts.map(data => {

                  return (
                    <Col key={data._id} md={4} s={4} xs={12}>
                      <div className="singleProfile">
                        <div className="top_detail" onClick={() => this.postDetails(data)}>
                          <Row onClick={() => this.postDetails(data)}>
                            <Col md={8} sm={8} xs={12}>
                              {data.guestimage !== null ? <div className="photo"><img src={`${Base_url}${data.guestimage}`} alt="" /></div>
                                : <div className="photo"><img src="https://us.123rf.com/450wm/triken/triken1608/triken160800029/61320775-stock-vector-male-avatar-profile-picture-default-user-avatar-guest-avatar-simply-human-head-vector-illustration-i.jpg?ver=6" alt="" /></div>}
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
                          <div onClick={() => this.postDetails(data)} className="post_img"><img src="https://jpublicrelations.com/wp-content/uploads/2015/12/placeholder-1.png.1236x617_default.png" /></div> :
                          <div onClick={() => this.postDetails(data)} className="post_img"><img src={`${Base_url}/${data.postimage}`} /></div>}
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

                          </div>
                        </div>

                        <div className="post_reaction_box">
                          <Row>
                            <Col md={6} sm={8} xs={6} style={{ padding: 10 }}>
                            {this.alreadyReacted(data.reactedby) === 0 ? 
                             <ul>
                                <li className={this.state[`reactClick_${data._id}`] === 1 ? "animated heartBeat" : ''} onClick={() => this.onReact(data._id, 1)}>
                                  <a href="javascript:void(0)" className="reaction-icon"><img src={require('./../../images/like-logo.png')} />
                                  </a>
                                </li>
                                <li className={this.state[`reactClick_${data._id}`] === 2 ? "animated heartBeat" : ''} onClick={() => this.onReact(data._id, 2)}>
                                  <a href="javascript:void(0)" className="reaction-icon"><img src={require('./../../images/smile.png')} />
                                  </a>
                                </li>
                                <li className={this.state[`reactClick_${data._id}`] === 3 ? "animated heartBeat" : ''} onClick={() => this.onReact(data._id, 3)}>
                                  <a href="javascript:void(0)" className="reaction-icon"><img src={require('./../../images/fire.png')} />
                                  </a>
                                </li>
                              </ul> : 

                              <div>
                                <ul>
                                  <li className={this.state[`reactClick_${data._id}`] === 1 ? "animated heartBeat" : ''}>
                                    <div style={{fontSize: 14}}>Reacted</div> 
                                  </li>
                               
                                <li style={{marginTop: -10}} className={this.state[`reactClick_${data._id}`] === 3 ? "animated heartBeat" : ''} >
                                  <a href="javascript:void(0)" className="reaction-icon">
                                  {this.alreadyReacted(data.reactedby) == 1 ? 
                                     <img src={require('./../../images/like-logo.png')} /> :
                                   this.alreadyReacted(data.reactedby) == 2 ?
                                     <img src={require('./../../images/smile.png')} /> :
                                   this.alreadyReacted(data.reactedby) == 3 ?
                                     <img src={require('./../../images/fire.png')} /> : ''
                                  }
                                  </a>
                                </li>
                              </ul>
                  
                              </div>
                            }
                            </Col>
                            <Col md={6} sm={4} xs={6} style={{ padding: 10 }}>
                              <div className="reactions">{data.reactedby.length} Reactions</div>
                              <div className="reactions">{data.comments.length} Comments</div>
                            </Col>
                          </Row>
                        </div>
                      </div>

                    </Col>
                  )
                })}
              </Row>
            </InfiniteScroll>
          </div>
        </div>
        <Navigation
          nav={this.props.history}
          store={extension}
          storeData={this.state.storeDetails}
        />
      </div>
    )
    // }
  }
}

export default withRouter(Main_page)
