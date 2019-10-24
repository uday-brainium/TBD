import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import ApiService from './../../../services/api'
import LandingCard from './landingCard'
import { Editor } from '@tinymce/tinymce-react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

import './style.css'


export default class Dashboard extends Component {

  state = {
    done: false,
    sectionOne: '',
    sectionTwo: '',
    sectionThree: '',
    buttonText: '',
    testimonials: [],
    adding: false
  }

  componentDidMount() {
    ApiService.fetch_header()
    .then(res => {
      if(res.status == 200) {
        const {header} = res.result
        this.setState({
          sectionOne: header.sectionOne,
          sectionTwo: header.sectionTwo,
          sectionThree: header.sectionThree,
          buttonText: header.buttonText
        })
      }
    })
    this.fetch_testimonial()
  }

  fetch_testimonial = () => {
    ApiService.fetch_testimonial()
    .then(res => {
      if(res.status == 200) {
        this.setState({testimonials: res.result})
      }
    })
  }

  changeField = (e) => {
    const name = e.target.name
    const value = e.target.value
    this.setState({[name]: value})
  }

  changeEditor = (e, name) => {
    const value = e.target.getContent()
    this.setState({[name]: value})
  }


  headerSubmit = (e) => {
    const {sectionOne, sectionTwo, sectionThree, buttonText} = this.state
    e.preventDefault()
    let data = { 
      sectionOne, sectionTwo, sectionThree, buttonText
    }
    ApiService.edit_header(data)
    .then(res => {
      if(res.status == 200) {
        console.log("res", res);
       this.setState({done: true}) 
       setTimeout(() => {
        this.setState({done: false}) 
       }, 2000)
      }
    })
  }

  addTestimonial = (e) => {
    e.preventDefault()
    const {author, content} = this.state
    const data = {author, content}
    ApiService.add_testimonial(data)
    .then(res => {
      if(res.status == 200) {
        console.log('TEST', res);
        this.fetch_testimonial()
        this.setState({done2: true, adding: false})
        setTimeout(() => {
          this.setState({done2: false}) 
         }, 2000)
      }
    })
  }

  deleteItem = (id) => {
    ApiService.delete_testimonial(id)
    .then(res => {
      console.log("DELETE", res);
      this.fetch_testimonial()
    })
  }

  render() {
   const {sectionOne, sectionTwo, sectionThree, testimonials, adding, buttonText} = this.state
    return (
      <div className="page-container">
        <h5 className="heading-text"><i className="fas fa-sliders-h"></i>  Page settings -> Landing page</h5>
        <hr></hr>

        <div className="content">
        <Row>
          <Col lg={6} md={6} xs={12} sm={12}>
            <div className="editor-box">
              <h6>Page header</h6>
            {sectionOne && 
              <form onSubmit={this.headerSubmit}>
                <label>Heading 1</label>
                <div>
                <Editor
                  initialValue={sectionOne}
                  apiKey='ng24obfsj5xtr4fgank7r4sx5bhtt0xqvkn8pj3i3reldmuq'
                  init={{
                    plugins: 'link image code',
                    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
                  }}
                  onChange={(e) => this.changeEditor(e, 'sectionOne')}
                />
                </div>
                <label>Heading 2</label>
                <Editor
                  initialValue={sectionTwo}
                  apiKey='ng24obfsj5xtr4fgank7r4sx5bhtt0xqvkn8pj3i3reldmuq'
                  init={{
                    plugins: 'link image code',
                    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
                  }}
                  onChange={(e) => this.changeEditor(e, 'sectionTwo')}
                />
                <label>Heading 3</label>
                 <Editor
                  initialValue={sectionThree}
                  apiKey='ng24obfsj5xtr4fgank7r4sx5bhtt0xqvkn8pj3i3reldmuq'
                  init={{
                    plugins: 'link image code',
                    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
                  }}
                  onChange={(e) => this.changeEditor(e, 'sectionThree')}
                 />

                <div className="btnText-input">
                 <label>Button text</label>
                 <input type="text" onChange={this.changeField} name="buttonText" value={buttonText} />
                </div>
                
                <input type="submit" value="Save" />
                {this.state.done && <span style={{color: 'green', marginLeft: 10}}>Updated successfully</span> }
              </form> }
           </div>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12}> 
            <div className="editor-box">
              <Row>
                <Col>
                  <h6>Testimonial's</h6>
                </Col>
                <Col>
                 <button style={{float: 'right'}} onClick={() => this.setState({adding: !adding})}>{adding ? 'Cancel' : 'Add new'}</button>
                </Col>
              </Row>
              {adding &&
                <div className="add-testimonial">
                  <form onSubmit={this.addTestimonial}>
                    <input type="text" name="author" onChange={this.changeField} placeholder="Author name"/>
                    {/* <textarea name="content" onChange={this.changeField}> </textarea> */}
                    <Editor
                      initialValue=""
                      apiKey='ng24obfsj5xtr4fgank7r4sx5bhtt0xqvkn8pj3i3reldmuq'
                      init={{
                        plugins: 'link image code',
                        toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
                      }}
                      onChange={(e) => this.changeEditor(e, 'content')}
                    />
                    <input type="submit" name="submit" value="Add" />
                    {this.state.done && <span style={{color: 'green', marginLeft: 10}}> Updated successfully</span> }
                  </form>
                </div>
              }
                
                {!adding &&
                <div>
                  {testimonials.map(data => (
                    <div className="testimonial-list" key={data._id}>
                      <h5>{data.author}</h5>
                      <span onClick={() => this.deleteItem(data._id)} style={{float: 'right', fontSize: 20, color: 'red', marginLeft: 5}}><i class="fas fa-times-circle"></i></span>
                      <span style={{fontSize: 14}}><i>{ReactHtmlParser(data.content)}</i></span>
                    </div>
                  ))}
                </div>}
            
            </div>
            
             <LandingCard />
            
          </Col>
         
        </Row>
        </div>
      </div>
    );
  }
}