import React, { Component } from 'react';
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
import './../Store/store.css'
import './style.css'
import Header from './../Store/header'
import Navigation from './../Store/navigation'
import Page_title_head from "./../Store/page_title_head"
import Add_post from './../Store/Social/post_add_modal'
import * as Scroll from 'react-scroll';
import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

let path = window.location.pathname
let extension = path.substring(1)
//console.log("EXTENION", extension);
const defaultImage = 'https://jpublicrelations.com/wp-content/uploads/2015/12/placeholder-1.png.1236x617_default.png'

let userdata = JSON.parse(localStorage.getItem('guest-userdata'))


export default class PostsDetails extends Component {

  state = {
    loading: false,
    storeDetails: [],
    extension: '',
    post: '',
    reactedby: [],
    comments: [],
    commmentInput: '',
    loading: false
  }


  commentInputChange = (e) => {
    const value = e.target.value
    this.setState({ commmentInput: value })
  }

  componentDidMount() {
    this.setState({ loading: true })
    const location = this.props.history.location.state
    const post = location.post
    const extension = location.extension
    const reactedby = location.post.reactedby
    const comments = location.post.comments
    this.setState({ post, extension, reactedby, comments })
    ApiService.getBusinessProfbyUrl(extension)
      .then(res => res.json())
      .then(response => {
        if (response.status == 200) {
          this.setState({
            storeDetails: response.response,
            loading: false
          }, () => {
            //this.fetchPosts()
          })

        } else {
          this.props.history.push('/')
        }
      })
      .catch(function (error) {
        console.log('err---------', error)
      })

      Events.scrollEvent.register('begin', function(to, element) {
        console.log("begin", arguments);
      });
  
     Events.scrollEvent.register('end', function(to, element) {
        console.log("end", arguments);
      });
  
      scrollSpy.update();
  
  }

  scrollToBottom = () => {
    scroll.scrollToBottom(0);
  }

  postCommment = () => {
    if (userdata) {
      this.setState({ loading: true })
      const comment = this.state.commmentInput
      const { _id } = this.state.post
      const data = {
        guestid: userdata._id,
        postid: _id,
        guestname: `${userdata.firstname} ${userdata.lastname}`,
        datetime: new Date(),
        comment
      }
      ApiService.add_comment(data)
        .then(res => res.json())
        .then(response => {
          if (response.status == 200) {
            this.setState({
              loading: false,
              post: response.response,
              reactedby: response.response.reactedby,
              comments: response.response.comments,
              commmentInput: ''
            }, () => {
              this.scrollToBottom()
              
            })
          } else {
            alert('Failed to post comment !')
          }
        })
    } else {
      alert('User must be logged in !')
    }
  }

  deleteComment = (commentid, guestid) => {
    //  console.log("TEST", commentid);
    const data = {
      guestid,
      postid: this.state.post._id,
      commentid
    }

    ApiService.delete_comment(data)
      .then(res => res.json())
      .then(response => {
        if (response.status == 200) {
          console.log('data', response);
          this.setState({
            post: response.response,
            comments: response.response.comments,
          })
        }

      })
  }

  render() {
    const { post, reactedby, comments } = this.state
    //console.log('POST', post);

    return (
      <div>
        <Loader loading={this.state.loading} background='no-fill' />
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
        <Page_title_head title={this.state.post.posttitle} />
        <Add_post show={this.state.add_modal} close={this.closeAddModal} storeData={this.state.storeDetails} />
        <Loader loading={this.state.loading} />
        <div className="post_type_div">
          <div className="container">
            <h2><i className="fab fa-facebook-square"></i> {post.posttitle}</h2>
            <Row className="post-details-container">
              <Col lg={6} md={6} sm={12} xs={12}>
                <div>

                </div>
                <div className="post-image-div">
                  {post.postimage ?
                    <img className="post-details-image" src={`${Base_url}${post.postimage}`} /> :
                    <img className="post-details-image" src={defaultImage} />
                  }
                </div>
                <div style={{ marginTop: 10 }}>
                  <i className="fas fa-asterisk"></i> {post.postdetails}
                </div>
              </Col>

              <Col lg={6} md={6} sm={12} xs={12} className="right-col">
                <div className="comment-section">
                  <Row className="right-head">
                    <Col>
                      <p className="reaction-head">{reactedby.length} Reactions</p>
                    </Col>
                    <Col>
                      <p className="reaction-head">{comments.length} comments</p>
                    </Col>
                  </Row>

                  <div>
                    <Row className="comments-head">
                      <Col>
                        <p className="comment-text">Comments</p>
                      </Col>
                    </Row>

                    <div className="comments-list" >
                      {comments.length > 0 ?
                        comments.map(data => {
                          return (
                            <div className='comment'>
                              <span className="username"><i className="fas fa-user"></i> {data.name} <span style={{ color: 'black', float: 'right' }}>{`${new Date(data.datetime).toLocaleDateString()} ${new Date(data.datetime).toLocaleTimeString()}`}</span></span>
                              <div className="comment-body">{data.comment} <span style={{ float: 'right' }}> {userdata._id === data.guest ? <i onClick={() => this.deleteComment(data._id, data.guest)} className="fas fa-trash-alt delete-c"></i> : ''} </span></div>

                            </div>
                          )
                        }) :
                        <div className="no-comment">No comments posted</div>
                      }
                    </div>

                    {userdata ? <div className="new-comment">
                      <div className="comment-input-div">
                        <input placeholder="Add new comment" onChange={this.commentInputChange} className="comment-input" type="text" />
                      </div>

                      <button disabled={this.state.commmentInput == '' ? true : false} onClick={this.postCommment} className="button">
                        Add comment
                    </button>
                    </div> :
                      <div className="login-error">
                        Login to post a comment
                  </div>
                    }
                  </div>

                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}
