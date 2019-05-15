import React, { Component } from 'react';
import { Row, Col, Card } from 'react-bootstrap';

export default class Food_card extends Component {

  render() {
    return (
      <Card className="food-card">
        <div className="card-image">
          <Card.Img variant="top" src={'https://recipes.timesofindia.com/photo/52397749.cms'} />
        </div>
        
        <Card.Body className="food-card-body">
          <Card.Title className="example-title">Egg biriyani</Card.Title>
          <Card.Text className="example-text">
            Some quick example text to build on the card title and make up the bulk of
            the card's content.
            </Card.Text>

        </Card.Body>
      </Card>
    );
  }
}
