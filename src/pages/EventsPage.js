import React, { useState, useEffect } from "react";
import { Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import EventAPI from "../apis/EventAPI";
import EventList from "../components/Event/EventList";
import Notification from "../components/Notification"
function EventsPage(props) {

    const [events, setEvents] = useState([]);
    const [tempEvents, setTempEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [shouldFocus, setShouldFocus] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    let eventsExist = false;

    const fetchEvents = async () => {
        EventAPI.getEvents()
            .then(response => {
                setEvents(response.data.events);
                setIsLoading(false);
            }).catch(error => {
                console.log(error);
                setIsLoading(false);
            }).finally(() => {
                setIsLoading(false);
            })
            const events = [
                {
                  id: 1,
                  name: "Concert",
                  city: "New York",
                  sold_tickets: 1000,
                  available_tickets: 500,
                  ticketPrice: 50.0,
                  date: new Date(2023, 3, 14, 20, 0),
                  description: "A great concert in the heart of New York City"
                },
                {
                  id: 2,
                  name: "Comedy Show",
                  city: "Los Angeles",
                  sold_tickets: 500,
                  available_tickets: 1000,
                  ticketPrice: 25.0,
                  date: new Date(2023, 3, 21, 19, 30),
                  description: "A hilarious night of stand-up comedy in Los Angeles"
                },
                {
                  id: 3,
                  name: "Theater Production",
                  city: "Chicago",
                  sold_tickets: 750,
                  available_tickets: 250,
                  ticketPrice: 75.0,
                  date: new Date(2023, 4, 1, 14, 0),
                  description: "An award-winning theater production in the Windy City"
                }
              ];
              
              // Convert dates to string
              events.forEach(event => {
                event.date = event.date.toLocaleString();
              });
            setEvents(events);
    }
    const filteredEvents = events.filter(event =>
        event.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        fetchEvents();
    }, [tempEvents]);
    if (events) {
        if (!(Object.keys(events).length === 0)) {
            eventsExist = true;
        }
    }
    else {
        eventsExist = false;
    }
    function ShowEvents() {
        return (
            <>
                <ToastContainer />
                <Form>
                    <Container>
                        <Row className="justify-content-md-center">

                            <Col md="auto"> <Form.Group controlId="formSearch">
                                <Form.Control
                                    autoFocus={shouldFocus}
                                    type="text"
                                    placeholder="Search for events"
                                    value={searchTerm}
                                    onChange={e => {
                                        setSearchTerm(e.target.value);
                                        setShouldFocus(true);
                                        if (e.target.value === '') {
                                            setShouldFocus(false);
                                        }
                                    }} />
                            </Form.Group></Col>

                        </Row>

                    </Container>


                    <EventList events={filteredEvents} setEvents={(events) => setTempEvents(events)} Notification={props.Notification} />
                </Form>
            </>
        )
    }
    function NoEvents() {
        return (
            <div>
                {isLoading ? (
                    <img style={{ maxWidth: '100px' }} src={`${process.env.PUBLIC_URL}/assets/LoadingPage.gif`} />
                ) : (
                    <h1>No events registered</h1>
                )}
            </div>
        )
    }
    if (events.length > 0) {
        return <ShowEvents />
    }
    else {
        return <NoEvents />
    }

}
export default EventsPage;