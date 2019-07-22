import React, { Component } from 'react'
import LinesEllipsis from 'react-lines-ellipsis'
import { Row, Col } from 'react-bootstrap';
import Apis from './../../../services/api'

const userdata = JSON.parse(localStorage.getItem('guest-userdata'))

export default class Post extends Component {
  state = {
    [this.props.data]: 0
  }

  componentDidMount() {

  }

  onReact = (postid, reaction) => {
    console.log("Reacted", reaction);
    const userid = userdata._id
    Apis.react_on_post(postid, userid, react)
    .then(res => res.json())
    .then(response => {
      console.log('HEwllo', response);
      
    })
  }

  render() {
    return (
      <div>
        <div className="singleProfile">
          <div className="top_detail">
            <Row>
              <Col md={8} sm={8} xs={12}>
                <div className="photo"><img src="http://portal.bilardo.gov.tr/assets/pages/media/profile/profile_user.jpg" alt="" /></div>
                <div className="name-add-time">
                  <h4>Arundhuti Das</h4>
                  <p>Kolkata, India</p>
                  <p>29 June 2017</p>
                </div>
              </Col>
              <Col md={4} sm={4} xs={12}>
                <div className="post_detail">
                  <div className="postedinfacebook"><i className="fab fa-facebook" area-hidden='true'></i></div>
                </div>
              </Col>
            </Row>
          </div>

          <div className="post_img"><img src="https://media.istockphoto.com/photos/health-food-for-fitness-picture-id855098134?k=6&m=855098134&s=612x612&w=0&h=eIWWpYWKTz_z2ryYAo0Dd97igUZVExzl4AKRIhUrFj4=" /></div>
          <div className='body-content'>
            <div className="post_middle_sec">
              <LinesEllipsis
                text={this.props.description}
                maxLine={this.state.read_more2 == 0 ? 3 : this.state.read_more2}
                ellipsis=' . . .'
                trimRight
                basedOn='letters'
              />
              <span style={{ color: 'blue', fontSize: 12 }} onClick={() => this.setState({ read_more2: this.state.read_more2 > 3 ? 3 : 10 })}> {this.state.read_more2 == 0 || this.state.read_more2 == 3 ? 'Read more' : 'read less'} </span>

            </div>
          </div>

          <div className="post_reaction_box">
            <Row>
              <Col md={6} sm={8} xs={6}>
                <ul>
                  <li>
                    <a href="#" className="reaction-icon">
                      <img src={require('./../../../images/like-logo.png')} />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="reaction-icon">
                      <img src={require('./../../../images/smile.png')} />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="reaction-icon">
                      <img src={require('./../../../images/fire.png')} />
                    </a>
                  </li>
                </ul>
              </Col>
              <Col md={6} sm={4} xs={6}>
                <div className="reactions">17 Reactions</div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    )
  }
}

