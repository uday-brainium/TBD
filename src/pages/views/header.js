import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  Container,
  Row,
  Col,
  Nav
} from 'reactstrap';
import { Link, withRouter } from 'react-router-dom'
import $ from "jquery"
import logo from '../../images/logo.png'
import phoneImg from '../../images/phone-img.png'
import ApiService from './../../services/api'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';



class HeaderView extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.hideMenu = this.hideMenu.bind(this);
    this.state = {
      popoverOpen: false,
      elementClass: 'hamburger',
      menuBodystyle: {
        'display': 'none'
      },
      windowWidth: window.innerWidth,
      header1: '',
      header2: '',
      header3: '',
      buttontext: ''
    };
  }

  componentDidMount() {
    this.showMenuRenderer()

    ApiService.fetch_header()
    .then(res => {
      if(res.status == 200) {
        const {header} = res.result
        this.setState({
          header1: header.sectionOne,
          header2: header.sectionTwo,
          header3: header.sectionThree,
          buttontext: header.buttonText
        })
      }
    })
  }

  toggle() {
    if (this.state.popoverOpen) {
      this.setState({
        popoverOpen: !this.state.popoverOpen,
        elementClass: 'hamburger',
        menuBodystyle: {
          'display': 'none'
        }
      });
    }
    else {
      this.setState({
        popoverOpen: !this.state.popoverOpen,
        elementClass: 'hamburger close',
        menuBodystyle: {
          'display': 'flex'
        }
      });
    }
  }

  hideMenu() {
    if (this.state.popoverOpen) {
      this.setState({
        popoverOpen: false,
        elementClass: 'hamburger',
        menuBodystyle: {
          'display': 'none'
        }
      })
    }
  }

  showMenuRenderer() {
    if (this.state.windowWidth < 767) {
      this.setState({
        menuBodystyle: {
          'display': 'none'
        }
      })
    }
    else {
      this.setState({
        menuBodystyle: {
          'display': 'flex'
        }
      })
    }
  }

  render() {
    const { header1, header2, header3, buttontext } = this.state
    return (
      <header className="header" onClick={this.hideMenu}>
        <Container fluid={true}>
          <Row>
            <div className="banner">
              <div className="indexHeader">
                <div className="container">
                  <Row>
                    <Col sm={12}>
                      <div className="topHeader">
                        <div className="logo">
                          <Link to='/'><img src={logo} alt="" /></Link>
                        </div>
                        <div className="menuContainer">
                          <div className={this.state.elementClass} id="hamburger" ref="hamburger" onClick={this.toggle}>
                            <span></span>
                            <span></span>
                            <span></span>
                          </div>
                          <Nav className="navigation" style={this.state.menuBodystyle}>
                            <ul className="secondary">
                              <li><Link to='/registration' className="signUp">Sign Up</Link></li>
                              <li><Link to='/login' className="signIn">Sign In</Link></li>
                            </ul>
                            <ul className="primary">
                              <li><Link to='/'>Home</Link></li>
                              <li><Link to='/about'>About Us</Link></li>
                              <li><Link to='/contact'>Contact</Link></li>
                            </ul>
                          </Nav>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
              <div className="bannerContent">
                <Container>
                  <Row>
                    <Col sm={12}>
                      <div className="captionWrapper">
                        <div className="caption">
                          <h3>{ReactHtmlParser(header1)}</h3>
                          <h1>{ReactHtmlParser(header2)}</h1>
                          <p>{ReactHtmlParser(header3)}</p>
                          {/* <h3>Start your</h3>
                          <h1>business</h1>
                          <p>With TBD Landing Page</p> */}
                          <Link to='/'>{buttontext}</Link>
                        </div>
                        <div className="phoneImg">
                          <img src={phoneImg} alt="" />
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Container>
              </div>
            </div>
          </Row>
        </Container>
      </header>
    )
  }
}

export default HeaderView
