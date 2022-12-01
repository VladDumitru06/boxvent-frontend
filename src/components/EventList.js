import React from "react"
import EventCard from './EventCard'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
function EventList(props){
    return (
      <Container >
      <Row xs={1}sm={2} md={2} lg={3} xl={3}xxl={4} className="justify-content-md-center">
            
      {props.events?.map(event => (
            <Col key={event.id} className="pt-5"><EventCard  event={event}/></Col>
          ))}
    </Row>
    </Container>
        
      )
}

export default EventList;