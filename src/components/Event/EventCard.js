
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import fightcard from "../../Images/fightcard.jpg"
import FightCardAPI from '../../apis/FightCardAPI';
import { useEffect, useState } from 'react';
function EventCard(props) {
  const [localFightCards, setLocalFightCards] = useState([]);
  const fetchFightCards = async (eventId) => {
    try {
      const response = await FightCardAPI.getFightCardsByEvent(eventId);
        setLocalFightCards(response.data.fightCards);
      console.log(response.data.fightCards);
    } catch (error) {
      // Handle error
    }
  };


  return (
    <Card onMouseEnter={() => fetchFightCards(props.event.id)} onMouseLeave={() => setLocalFightCards([])} style={{ width: '18rem' }}>
      <Card.Img variant="top" src={fightcard} />
      <Card.Body >
        <Card.Title>{props.event.name}</Card.Title>
        <Card.Text>
          Available Tickets: {props.event.available_tickets}
        </Card.Text>
        <Card.Text>
          Date: {props.event.date}
        </Card.Text>
        <Button variant="primary" >Fight Cards</Button>
        {localFightCards && localFightCards.map((fightCard) => (
          <div key={fightCard.id}>
            <p>{fightCard.fight.challengerFighter.name} VS {fightCard.fight.challengedFighter.name}</p>
          </div>
        ))}
      </Card.Body>
    </Card>
  );
}

export default EventCard;