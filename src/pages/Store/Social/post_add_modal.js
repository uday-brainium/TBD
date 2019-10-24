import React, { Component } from 'react';
import { Row, Col, Modal } from 'react-bootstrap';
import './style.css'
import ApiService from '../../../services/api';
import Loader from './../../components/simpleloader'
import { Base_url, live_url } from './../../../utilities/config'

let userdata = JSON.parse(localStorage.getItem('guest-userdata'))
let path = window.location.pathname
let extension = path.substring(1)

export default class Post_add_modal extends Component {

  state = {
    postimage: false,
    title: '',
    details: '',

    loading: false,
  }



  componentDidMount = () => {
   // console.log('store', this.state.storeDetails);s
  }

  handleChange = (e) => {
    let name = e.target.name;
    let val = e.target.value
    this.setState({ [name]: val })
  }

  savePost = () => {
    this.setState({ loading: true })
    const { title, details, postimage } = this.state
   // console.log(postimage, details);
    const data = {
      title, details, postimage,
      businessid: userdata.businessid, guest: userdata._id,
      guestname: `${userdata.firstname} ${userdata.lastname}`,
      guestimage: userdata.profile_image
    }
    return new Promise((resolve, reject) => {
      ApiService.add_social_post(data)
      .then(res => res.json())
      .then(response => {
        this.setState({ loading: false })
        this.props.close()
        resolve(response)
      })
    })
  }
  
  earnReward = () => {
    return new Promise((resolve, reject) => {
      const guestId = userdata._id
      const data = {guestid: guestId, datetime: new Date()}
      ApiService.post_reward(data)
      .then(res => res.json())
      .then(response => {
        if(response.status == 200) {
          resolve(response)
        }
      })
    })
  }

  handleFileUpload = (e) => {
    var base64 = ""
    var file = document.querySelector('#post_image').files[0];
    var reader = new FileReader();

    reader.addEventListener("load", function () {
      base64 = reader.result;
    }, false);

    setTimeout(() => {
      this.setState({ postimage: base64 })
     // console.log('data', base64);

    }, 1000)

    if (file) {
      reader.readAsDataURL(file);
    }
  }



  feed = (e) => {
    e.preventDefault()
    const { title, details, postimage } = this.state
    const {storeData} = this.props
    if (title == '' || details == '') {
      alert('Please fill all fields')
    } else {
      window.fbAsyncInit = function () {
        window.FB.init({
          appId: 353429871985553,
          cookie: true,  // enable cookies to allow the server to access
          // the session
          xfbml: true,  // parse social plugins on this page
          version: 'v2.1' // use version 2.1
        });


        window.FB.ui({
          method: 'feed',
          name: ''+storeData.businessname+'',
          link: ''+live_url+'/'+extension+'',
          picture: ' '+Base_url+''+storeData.storebanner+'',
          caption: 'Doublesat TBD',
          description: ''+storeData.extension+''
        },  (response) => {
          if (response) {
            this.savePost().then(res => {
              this.earnReward().then((resolve) => {
                window.location.reload();
              })
            })       
          } else {
            alert('failed to share post try again')
            window.location.reload();
          }

        });

      }.bind(this);

      // Load the SDK asynchronously
      (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    }
  }

  render() {
  //  console.log(this.props.storeData);
    
    const uri = `${live_url}${window.location.pathname}`
    userdata = JSON.parse(localStorage.getItem('guest-userdata'))
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
              Add new post
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <center>
              <Loader loading={this.state.loading} />
              <form onSubmit={this.feed}>

                <div className="add-input">
                  <label className="label-small">Post title</label>
                  <input name="title" onChange={this.handleChange} type="text" placeholder="Post title" required />
                </div>

                <div className="add-input">
                  <label className="label-small">Post details</label>
                  <textarea name="details" onChange={this.handleChange} placeholder="post details" required></textarea>
                </div>


                <div className="add-input">
                  {this.state.postimage &&
                    <div className="upload-zone">
                      <div className="label-small">Post image</div>
                      <img src={this.state.postimage} />
                    </div>}

                  <div className="upload-btn"><i className="fas fa-image"></i> Upload image</div>
                  <input onChange={this.handleFileUpload} id="post_image" accept="image/*" type="file" />
                </div>


                {/* <a style={{ color: '#fff' }} target="_blank" href={`https://www.facebook.com/sharer/sharer.php?u=${uri}&amp;src=sdkpreparse`} className="fb-xfbml-parse-ignore">
                  <div className="fb-share-button facebook-share" data-href="https://developers.facebook.com/docs/plugins/" data-layout="button" data-size="large">
                    Share in facebook
                  </div>
                </a>*/}
                <div className="info-text">* This post will also post to your facebook, Please allow posting to your facebook to complete this post.</div>
                <button className="button" type="submit">Add post</button>

              </form>
            </center>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
