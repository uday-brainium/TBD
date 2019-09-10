import React, { Component } from "react";
import {
  Container,
  Col,
  Row
} from 'reactstrap';
import ApiService from './../services/api'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';


class AboutUsPage extends Component {

  state = {
    html: '',
    title: '',
    content: ''
  }

  componentDidMount() {
    this.fetchAboutUs()
  }

  fetchAboutUs = () => {
    ApiService.fetch_aboutUs()
    .then(res => {      
      this.setState({
        html: res.result[0].htmlData,
        content: res.result[0].content,
        title: res.result[0].title
      })
    })
  }

  render() {
    const {html, title, content} = this.state
    return (
      <div>
        <Container>
          <Row>
            <Col>
              <h4>{title}</h4>
              <p>{content}</p>

              <div style={{marginTop: 40}}>
                {ReactHtmlParser(html)}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default AboutUsPage
