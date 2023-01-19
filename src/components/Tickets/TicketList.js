import { useEffect, useState } from "react";
import TicketsAPI from "../../apis/TicketsAPI";
import jwtDecode from "jwt-decode";
import TicketCard from "./TicketCard.js";
import EventAPI from "../../apis/EventAPI";
import { Col, Container, Row } from "react-bootstrap";
function TicketList() {

    const [tickets, setTickets] = useState([]);
    const [uniqueEvents, setUniqueEvents] = useState([]);
    const [events, setEvents] = useState([]);

    let ticketsExist = false;

    const fetchTickets = async () => {
        if (localStorage.getItem("JWT") !== null)
            TicketsAPI.getTickets(jwtDecode(localStorage.getItem("JWT")).id)
                .then(response => {
                    setTickets(response.data.tickets);
                })
    }

    const fetchEvent = async (eventId) => {
        const response = await EventAPI.getEvent(eventId);
        const newEvent = response.data.event;
    
        // Check if the event already exists in the list
        if (!events.some(event => event.id === newEvent.id)) {
            setEvents((events) => [...events, newEvent]);
        }
    }

    if (tickets) {
        if (!(Object.keys(tickets).length === 0)) {
            ticketsExist = true;
        }
    }
    else {
        ticketsExist = false;
    }

    useEffect(() => {
        let eventIds = new Set();
        tickets.map(ticket => {
            eventIds.add(ticket.eventId);
        });
        eventIds = [...eventIds];
        for (let i = 0; i < eventIds.length; i++) {
            fetchEvent(eventIds[i]);
        }

    }, [tickets]);
    //Events sometimes would have duplicates, so this useEffect removes them
    useEffect(() => {
        let uniqueEvents = [];
        events.map(event => {
            if (!uniqueEvents.some(uniqueEvent => uniqueEvent.id === event.id)) {
                uniqueEvents.push(event);
            }
        });
        setUniqueEvents(uniqueEvents);
    }, [events]);

    useEffect(() => {
        fetchTickets();
    }, []);

    function ShowTickets() {
        return (
            <Container>
                <div>
                    {uniqueEvents.map(event => {
                        return (
                            
                            <div key={event.id}>
                                <h1>{event.name}</h1>
                                <h2>Owned tickets</h2>
                                <Row className="justify-content-around">
                                {tickets.map(ticket => {
                                    if (ticket.eventId === event.id) {
                                        return (
                                            <Col key={ticket.id} xs={12} sm={6} md={4} lg={3} xl={2}>
                                            <TicketCard  ticket={ticket} event={event}/>
                                            </Col>
                                        )
                                    }
                                })}
                                </Row>
                            </div>
                            
                        )
                    })
                    }
                </div>
            </Container>
        )
    }
    function NoTickets() {
        return (
            <h1>No tickets currently registered</h1>
        )
    }
    if (ticketsExist) {
        return <ShowTickets />
    }
    else {
        return <NoTickets />
    }

}
export default TicketList;