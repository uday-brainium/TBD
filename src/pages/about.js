import React,{ Component } from "react";
import {
    Container,
    Col,
    Row
} from 'reactstrap';

class AboutUsPage extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                <Container>
                    <Row>
                        <Col>
                            <h3>About Page</h3>
                            <h4>Hello</h4>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default AboutUsPage
