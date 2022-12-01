import { useState } from 'react';
import styles from './FighterCard.module.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import fightcard from "../Images/fightcard.jpg"
function EventCard(props) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={fightcard} />
      <Card.Body>
        <Card.Title>{props.event.name}</Card.Title>
        <Card.Text>
          Available Tickets: {props.event.available_tickets}
        </Card.Text>
        <Card.Text>
          Date: {props.event.date}
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default EventCard;