import React,{ Component } from "react";
import {
    Container,
    Col,
    Row
} from 'reactstrap';
import { Link } from "react-router-dom"

class ContactPage extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                <Container>
                    <Row>
                        <Col>
                            <h3>Contact</h3>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default ContactPage
