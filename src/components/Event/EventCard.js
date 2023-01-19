
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import FightCardAPI from '../../apis/FightCardAPI';
import { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import Event from './Event';
import Tickets from './Tickets';
import { Col, Container, Row, ToastContainer } from 'react-bootstrap';
import isUserLoggedIn from '../IsUserLoggedIn';
import ImageAPI from '../../apis/ImageAPI';
import Notification from '../Notification';
import jwtDecode from 'jwt-decode';
import GetRole from '../GetRole';
import EditEvent from './EditEvent';
import EventAPI from '../../apis/EventAPI';
import ReactConfirmAlert from 'react-confirm-alert';
function EventCard(props) {

  const [fightCards, setFightCards] = useState([]);
  const [isOpenMoreInfo, setIsOpenMoreInfo] = useState(false);
  const [isOpenTickets, setIsOpenTickets] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [imgUrl, setImgUrl] = useState(null);
  const [availableTickets, setAvailableTickets] = useState(props.event.available_tickets - props.event.sold_tickets);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const fetchFightCards = async (eventId) => {
    try {
      const response = await FightCardAPI.getFightCardsByEvent(eventId);
      setFightCards(response.data.fightCards);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteEvent = async (eventId) => {
    try {
      const response = await EventAPI.deleteEvent(eventId);
      if (response.status === 200) {
        Notification.Success("Event deleted successfully");
      }
    } catch (error) {
      Notification.Error("Failed to delete event");
    }
  }
  useEffect(() => {
    async function fetchImage() {
      const response = await ImageAPI.getEventImage(props);
      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setImgUrl(url);
      } else {
        console.error('Failed to fetch image');
      }
    }
    fetchImage();
  }, [props.event.image]);

  useEffect(() => {
    fetchFightCards(props.event.id);
    console.log();
  }, []);

  return (
    <div>
    <Card style={{ width: '18rem' }}>
      <ToastContainer />
      <Card.Img variant="top" src={imgUrl} />
      <Card.Body >
        <Card.Title>{props.event.name}</Card.Title>
        <Card.Text>
          Available Tickets: {availableTickets}
        </Card.Text>
        <Card.Text>
          Date: {props.event.date.slice(0, 10)}
          <br />
          Time: {props.event.date.slice(11, 16)}
        </Card.Text>
        <Container>
          <Row>
            <Col>
              <Button variant="primary" onClick={() => setIsOpenMoreInfo(!isOpenMoreInfo)}>More Info</Button>
            </Col>
            <Col>
              <Button variant="primary"
                onClick={() => {
                  if (isUserLoggedIn())
                    setIsOpenTickets(!isOpenTickets)
                  else
                    Notification.Error("Account required to purchase tickets")
                }}>
                Tickets</Button>

            </Col>
          </Row>
          <Row xl={2} className="pt-2 justify-content-center">
            {
              GetRole().roles.includes("ADMIN") ? <Button variant="secondary" onClick={() => setIsEdit(!isEdit)}>Edit</Button> : null
            }
            {
              GetRole().roles.includes("ADMIN") ? <Button variant="danger" onClick={() =>   setIsConfirmed(!isConfirmed)}>Delete</Button> : null
            }
          </Row>
          <Row>
          {isConfirmed ?<ReactConfirmAlert
    message="Are you sure you want to delete this event?"
    buttons={[
      {
        label: 'Yes',
        onClick: async () => {
          try {
            const response = await EventAPI.deleteEvent(props.event.id);
            if (response.status === 200) {
              props.removeEvent(props.event.id);

            }
          } catch (error) {
            Notification.Error("Failed to delete event");
          }
        }
      },
      {
        label: 'No',
        onClick: () => setIsConfirmed(false)
      }
    ]}
  /> : null}
          </Row>
        </Container>
        <div style={isEdit ? { width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'fixed', top: 0, left: 0, zIndex: 1 } : {}}>
          <Popup
            open={isEdit}
            onOpen={() => setIsEdit(true)}
            onClose={() => setIsEdit(false)}
            modal
            closeOnDocumentClick
          >
            <span><EditEvent setIsEdit={(e) => setIsEdit(e)} event={props.event} Notification={Notification} modifyEvent={(e) => props.modifyEvent(e)} fightCards={fightCards} />  </span>
          </Popup>
        </div>

        <div style={isOpenMoreInfo ? { width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'fixed', top: 0, left: 0, zIndex: 1 } : {}}>
          <Popup
            open={isOpenMoreInfo}
            onOpen={() => setIsOpenMoreInfo(true)}
            onClose={() => setIsOpenMoreInfo(false)}
            modal
            closeOnDocumentClick
          >
            <span><Event event={props.event} fightCards={fightCards} />  </span>
          </Popup>
        </div>
        <div>

          <div style={isOpenTickets ? { width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'fixed', top: 0, left: 0, zIndex: 1 } : {}}>
            <Popup
              open={isOpenTickets}
              onOpen={() => setIsOpenTickets(true)}
              onClose={() => setIsOpenTickets(false)}
              modal
              closeOnDocumentClick
            >
              <span>{isUserLoggedIn() && <Tickets event={props.event} Notification={Notification} setAvailableTickets={(e) => setAvailableTickets(e)} availableTickets={availableTickets} />}  </span>
            </Popup>
          </div>
        </div>

      </Card.Body>
    </Card>
    </div>
  );
}

export default EventCard;