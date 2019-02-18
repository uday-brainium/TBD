import React,{ Component } from "react";
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

class LandingPage extends React.Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        // do something
    }

    render(){
        var sliderSettings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false
        }

        return(
            <div>
                <section className="aboutSection">
                    <Container>
                        <Row>
                            <div className="col-sm-12">
                                <article>
                                    <header>
                                        About <span>TBD</span>
                                    </header>
                                    <h4>Where can I get some?</h4>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker </p>
                                    <Link to={'/'}>Learn More</Link>
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
                                        <img src={videoImg} alt="" />
                                    </div>
                                    <div className="content">
                                        <div className="free">
                                            <h1>Free really means free.</h1>
                                            <h3>It’s not a trial, and you don’t need a credit card.</h3>
                                            <h4>Where can I get some?</h4>
                                            <p>
                                                There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.
                                            </p>
                                            <Link to={'/'}>Try it for Free</Link>
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
                                                <div className="singleTestimonial">
                                                    <p>"Your designs were exactly what Josef had always imagined — clear, clean, continuous, with a focus on stylistic elements. It was a major help for us. Thank you so much for your work on this project."</p>
                                                    <h4>Carolyn Meyer</h4>
                                                </div>

                                                <div className="singleTestimonial">
                                                    <p>"Your designs were exactly what Josef had always imagined — clear, clean, continuous, with a focus on stylistic elements. It was a major help for us. Thank you so much for your work on this project."</p>
                                                    <h4>Carolyn Meyer</h4>
                                                </div>

                                                <div className="singleTestimonial">
                                                    <p>"Your designs were exactly what Josef had always imagined — clear, clean, continuous, with a focus on stylistic elements. It was a major help for us. Thank you so much for your work on this project."</p>
                                                    <h4>Carolyn Meyer</h4>
                                                </div>
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
