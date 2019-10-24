import React, { Component } from 'react';

export default class Page_head extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="rightSideHeader">
                <ul className="breadcrumbNavigation">
                    <li><i className={`${this.props.icon} breadcumb-icon`}></i></li>
                    <li className="breadcumb-text"><span className="left-space">{this.props.title}</span></li>
                </ul>
            </div>
        );
    }
}
