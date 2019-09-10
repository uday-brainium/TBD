import React, { Component } from "react";
import {
  Container,
  Col,
  Row
} from 'reactstrap';
import { Link } from "react-router-dom"

// slick slider
import Slider from "react-slick";

// services
import ApiService from '../services/api'

// images
import videoImg from '../images/video-img.png'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

class LandingPage extends React.Component {
  
  state = {
    testimonials: [],
    content: '',
    title: '',
    middleBtn: '',
    middleContent: '',
    middleImage: '',
    fileType: ''
  }

  componentDidMount() {
    ApiService.fetch_testimonial()
    .then(res => {
      if(res.status == 200) 
       this.setState({testimonials: res.result})
    })

    this.fetchAboutUs()
    this.fetchMiddleCard()
  }

  fetchMiddleCard = () => {
    ApiService.landing_card_fetch()
    .then(res => {
      if(res.status == 200) {
        this.setState({middleContent: res.result.content, middleBtn: res.result.buttonText, middleImage: res.result.image, fileType: res.result.fileType})
      }
      
    })
  }

  fetchAboutUs = () => {
    ApiService.fetch_aboutUs()
    .then(res => {
      this.setState({content: res.result[0].content, title: res.result[0].title})
    })
  }

  render() {
    var sliderSettings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false
    }
    const { testimonials, content, title, middleBtn, middleContent, middleImage, fileType } = this.state
    return (
      <div>
        <section className="aboutSection">
          <Container>
            <Row>
              <div className="col-sm-12">
                <article>
                  <header>
                    About <span>TBD</span>
                  </header>
                  <h4>{title}</h4>
                  <p>{content}</p>
                  {/* <h4>Where can I get some?</h4> */}
                  {/* <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker </p> */}
                  <Link to={'/about'}>Learn More</Link>
                </article>
              </div>
            </Row>
          </Container>
        </section>
        <section className="reallyFreeSection">
          <Container>
            <Row>
              <div className="col-sm-12">
                <div className="reallyFree">
                <div className="video">
                {fileType != '' ?
                  fileType === 'IMAGE' ? 
                    <img src={middleImage} alt="" /> :
                    <video width="100%" height="300" controls>
                      <source src={middleImage}  />
                      Your browser does not support the video tag.
                    </video> 
                   : null}
                  </div>
                  <div className="content">
                    <div className="free">
                      {ReactHtmlParser(middleContent)}
                      <Link to={'/'}>{middleBtn}</Link>
                      {/* <h1>Free really means free.</h1>
                      <h3>It’s not a trial, and you don’t need a credit card.</h3>
                      <h4>Where can I get some?</h4>
                      <p>
                        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.
                                            </p>
                      <Link to={'/'}>Try it for Free</Link> */}
                    </div>
                  </div>
                </div>
              </div>
            </Row>
          </Container>
        </section>
        <section className="testimonialSection">
          <Container>
            <Row>
              <div className="col-sm-12">
                <div className="testimonial">
                  <article>
                    <header>
                      Testimonial
                    </header>

                    <section>
                      <Slider {...sliderSettings} className="bxslider">
                        {testimonials.map(data => (
                           <div className="singleTestimonial">
                           <p>{ReactHtmlParser(data.content)}</p>
                           <h4>{ReactHtmlParser(data.author)}</h4>
                         </div>
                        ))}
                       
                      </Slider>
                    </section>
                  </article>
                </div>
              </div>
            </Row>
          </Container>
        </section>
      </div>
    )
  }
}

export default LandingPage
