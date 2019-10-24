import React, { Component } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import ApiService from '../../../services/api';
import { Row, Col } from 'react-bootstrap';
import './style.css'

export default class LandingCard extends Component {

  state = {
    image: null,
    content: '',
    btnText: '',
    imageUrl: '',
    done: false,
    fileType: ''
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = () => {
    ApiService.landing_card_fetch()
      .then(res => {
        if (res.status == 200) {
          this.setState({
            imageUrl: res.result.image,
            content: res.result.content,
            btnText: res.result.buttonText,
            fileType: res.result.fileType
          })
        }
      })
  }

  changeField = (e) => {
    const name = e.target.name
    const value = e.target.value
    this.setState({ [name]: value })
  }

  changeEditor = (e) => {
    const value = e.target.getContent()
    this.setState({ content: value })
  }

  changeImage = (e) => {
    const image = e.target.files[0]

    this.setState({ image })
  }

  submitChange = (e) => {
    e.preventDefault()
    const { content, btnText, image } = this.state

    let formData = new FormData()
    formData.append('image', image)
    formData.append('content', content)
    formData.append('buttonText', btnText)

    ApiService.landing_card_update(formData)
      .then(res => {
        if (res.status == 200) {
          this.setState({ done: true, imageUrl: null }, () => {
            this.fetchData()
          })
        }
      })

  }

  render() {
    const { btnText, imageUrl, content, fileType } = this.state
    return (
      <div>
        <div className="editor-box">
          <h6>Middle card</h6>
          {content &&
            <form onSubmit={this.submitChange}>

              <label>Content</label>
              <Editor
                initialValue={content}
                apiKey='ng24obfsj5xtr4fgank7r4sx5bhtt0xqvkn8pj3i3reldmuq'
                init={{
                  plugins: 'link image code',
                  toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
                }}
                onChange={this.changeEditor}
              />
              {fileType != '' &&
                fileType === "IMAGE" ? 
                <img src={imageUrl} /> :
                <video width="100%" height="300" controls>
                 <source src={imageUrl}  />
                 Your browser does not support the video tag.
                </video> 
              }
              
              <label>Card image</label>
              <input className="image-upload" type="file" onChange={this.changeImage} name="image" />

              <label>Button text</label>
              <input type="text" value={btnText} name="btnText" onChange={this.changeField} />

              <input type="submit" name="submit" value="submit" />
              {this.state.done && <span style={{ color: 'green', marginLeft: 10 }}> Updated successfully</span>}
            </form>}
        </div>
      </div>
    )
  }
}
