
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import fightcard from "../../Images/fightcard.jpg"
import FightCardAPI from '../../apis/FightCardAPI';
import { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import FighterCard from '../Fighter/FighterCard';
import ChatWindow from '../Chat/ChatWindow';
import LoginForm from '../LoginForm';
import useHistory from 'react-router-dom';
import Event from './Event';
function EventCard(props) {

  const [localFightCards, setLocalFightCards] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const fetchFightCards = async (eventId) => {
    try {
      const response = await FightCardAPI.getFightCardsByEvent(eventId);
      setLocalFightCards(response.data.fightCards);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFightCards(props.event.id);
  }, []);

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={fightcard} />
      <Card.Body >
        <Card.Title>{props.event.name}</Card.Title>
        <Card.Text>
          Available Tickets: {props.event.available_tickets}
        </Card.Text>
        <Card.Text>
          Date: {props.event.date}
        </Card.Text>
        <div style={isOpen ? { width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'fixed', top: 0, left: 0, zIndex: 1 } : {}}>
          <Popup
            trigger={(open) => (
              <Button variant={open ? "none" : "primary"} >{open ? '' : 'More Info'}</Button>
            )}
            onOpen={() => setIsOpen(true)}
            onClose={() => setIsOpen(false)}
            modal
            closeOnDocumentClick
          >
            <span><Event event={props.event} localFightCards={localFightCards} />  </span>
          </Popup>
        </div>
      </Card.Body>
    </Card>
  );
}

export default EventCard;