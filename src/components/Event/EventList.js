import React from "react"
import EventCard from './EventCard'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
function EventList(props){
  function modifyEvent(event, newEvent){

    const index = props.events.findIndex(e => e.id === event.id);
    console.log("NEW EVENT " + JSON.stringify(newEvent));
    if (newEvent.eventName !== null){
      props.events[index].name = newEvent.eventName;
    }
    if (newEvent.description !== null){
      props.events[index].description = newEvent.description;
    }
    if (newEvent.cityName !== null){
      props.events[index].cityName = newEvent.cityName;
    }
    if (newEvent.dateTime !== null){
      props.events[index].dateTime = newEvent.dateTime;
    }
    if (newEvent.availableTickets !== null){
      props.events[index].availableTickets = newEvent.availableTickets;
    }
    if (newEvent.ticketPrice !== null){
      props.events[index].ticketPrice = newEvent.ticketPrice;
    }
    if (newEvent.image !== null){
      props.events[index].image = newEvent.image;
    }
  };
  const removeEvent = async (eventId) => {
    try {
      const index = props.events.findIndex(e => e.id === eventId);
      props.events.splice(index, 1);
      props.Notification.Success("Event deleted successfully");
      props.setEvents(props.events);
    } catch (error) {
      console.log(error);
      props.Notification.Error("Something went wrong");
    }
  }

    return (
      <Container >
      <Row xs={1}sm={2} md={2} lg={3} xl={3}xxl={4} className="justify-content-md-center">
            
      {props.events?.map(event => (
            <Col key={event.id} className="pt-5"><EventCard removeEvent={(eventId) =>removeEvent(eventId)}  event={event} modifyEvent={(e) => modifyEvent(event,e)} Notification={props.Notification}/></Col>
          ))}
    </Row>
    </Container>
        
      )
}
export default EventList;
