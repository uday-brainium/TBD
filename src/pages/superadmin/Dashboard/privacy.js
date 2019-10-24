import React, { Component } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import ApiService from '../../../services/api';
import { Row, Col } from 'react-bootstrap';
import './style.css'

export default class PrivacyTerms extends Component {

  state = {
    privacy: '',
    terms: '',
    done: false,
    fileType: ''
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = () => {
    ApiService.fetch_privacy()
      .then(res => {
        if (res.status == 200) {
          this.setState({
            privacy: res.response.privacy.privacy,
            terms: res.response.privacy.terms,
          })
        }
      })
  }

  changeField = (e) => {
    const name = e.target.name
    const value = e.target.value
    this.setState({ [name]: value })
  }

  changeEditor = (e, name) => {
    const value = e.target.getContent()
    this.setState({ [name]: value })
  }

  submitChange = (e) => {
    const { privacy, terms } = this.state
    e.preventDefault()

    ApiService.save_privacy(privacy, terms)
    .then(res => {
      if(res.status == 200) {
        this.setState({done: true})
        setTimeout(() => {
          this.setState({done: false})
        }, 5000)
      }
      console.log("res", res);
      
    })
  }

  render() {
    const { privacy, terms, done } = this.state
    return (
        <div className="page-container" >
          <h5 className="heading-text"><i className="fas fa-sliders-h"></i>  Page settings -> Privacy and Terms & conditions</h5>
          <hr></hr>

          <div className="content">
            <Row>
              <Col>
                <div className="editor-box">
                  <h6>Privacy and Terms</h6>
                  {privacy &&
                    <form onSubmit={this.submitChange}>
                      <label>Privacy policy</label>
                      <Editor
                        initialValue={privacy}
                        apiKey='ng24obfsj5xtr4fgank7r4sx5bhtt0xqvkn8pj3i3reldmuq'
                        init={{
                          height: 300,
                          plugins: 'link image code',
                          toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
                        }}
                        onChange={(e) => this.changeEditor(e, 'privacy')}
                      />
                      <label>Terms & conditions</label>
                      <Editor
                        initialValue={terms}
                        apiKey='ng24obfsj5xtr4fgank7r4sx5bhtt0xqvkn8pj3i3reldmuq'
                        init={{
                          height: 300,
                          plugins: 'link image code',
                          toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
                        }}
                        onChange={(e) => this.changeEditor(e, 'terms')}
                      />

                      <input type="submit" value="Save" />
                      {done && <span style={{color: 'green', textAlign: 'center', marginLeft: 10}}>Updated successfully</span>}
                    </form>}
                </div>
              </Col>
            </Row>
          </div>
        </div>
    )
  }
}
