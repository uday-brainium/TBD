import React, { Component } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import ApiService from '../../../services/api';
import { Row, Col } from 'react-bootstrap';
import './style.css'

export default class AboutUs extends Component {

  state = {
    title: '',
    content: '',
    html: '',
    done: false
  }

componentDidMount () {
  console.log('1231323');
  
  ApiService.fetch_aboutUs()
  .then(res => {
    if(res.status == 200) {
      this.setState({title: res.result[0].title, content: res.result[0].content, html: res.result[0].htmlData})
    }
  })
}

  changeField = (e) => {
    const name = e.target.name
    const value = e.target.value
    this.setState({[name]: value})
  }

  changeEditor = (e) => {
    const value = e.target.getContent()
    this.setState({html: value})
  }

  saveAboutUs = (e) => {
    e.preventDefault()
    const {title, content, html} = this.state
    const data = {title, content, htmlData: html}
    ApiService.update_aboutUs(data)
    .then(res => {
      if(res.status == 200) {
        this.setState({done: true})
        setTimeout(() => {
          this.setState({done: false})
        }, 2000)  
      }
    })
  }

  render() {
    const {title, content, html} = this.state
   
    return (
      <div className="page-container" style={{paddingLeft: 20}}>
      <h5 className="heading-text"><i className="fas fa-sliders-h"></i>  Page settings -> About page</h5>
      <hr></hr>

      <Row>
        <Col>
        <div className="editor-box">
          <h6>About us page</h6>
          <div>
          {html &&
            <form onSubmit={this.saveAboutUs}>
              <input type="text" onChange={this.changeField} value={title} name="title"  placeholder="Landing page header" required/><br></br>
              <textarea onChange={this.changeField} name="content" value={content} required></textarea>
              <h6>Inside aboout us page</h6>
              <Editor
                initialValue={html}
                apiKey='ng24obfsj5xtr4fgank7r4sx5bhtt0xqvkn8pj3i3reldmuq'
                init={{
                  height: 500,
                  plugins: 'link image code',
                  toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
                }}
                onChange={this.changeEditor}
              />
              <br></br>
              <input type="submit" value="Save" />
              {this.state.done && <span style={{color: 'green', marginLeft: 10}}> Updated successfully</span> }
              </form> }
          </div>
          </div>
         </Col>
      </Row>
      </div>
    );
  }
}
