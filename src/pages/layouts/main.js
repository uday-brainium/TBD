import React, {Component} from "react";
import { Route, Link } from "react-router-dom";

import HeaderView from '../views/header'
import FooterView from '../views/footer'

class MainLayout extends React.Component {
    constructor(props) {
        super(props)

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    componentDidMount() {
        // console.log(this.props)
    }

    render() {
        return (
            <div className="mainLayout">
                <HeaderView />
                {/*React.createElement(this.props.component)*/}
                <Route path={this.props.path} component={this.props.component} />
                <FooterView />
            </div>
        )
    }
}

export default MainLayout
