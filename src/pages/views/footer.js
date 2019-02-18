import React from 'react';
import {
    Container,
    Row,
    Col
} from 'reactstrap';
import { Link, withRouter } from "react-router-dom"

class FooterView extends React.Component {
    constructor(props) {
        super(props);

        /*this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };*/
    }

    /*toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }*/

    render() {
        return (
            <footer className="footerSection">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="topFooter">
                                <div className="socialMedia">
                                    <ul>
                                        <li><Link to='/' className="gplus">google+</Link></li>
                                        <li><Link to='/' className="facebook">facebook</Link></li>
                                        <li><Link to='/' className="twitter">twitter</Link></li>
                                        <li><Link to='/' className="likedin">likedin</Link></li>
                                    </ul>
                                </div>
                                <div className="footerMenu">
                                    <ul>
                                        <li><Link to='/'>Home</Link></li>
                                        <li><Link to='/about'>About</Link></li>
                                        <li><Link to='/contact'>Contact</Link></li>
                                    </ul>
                                </div>

                                <hr />
                            </div>
                            <div className="bottomFooter">
                                <hr />
                                <p className="copyright">Copyright © 2018 TBD, All Rights Reserved. Powered by BIT</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}

export default FooterView
