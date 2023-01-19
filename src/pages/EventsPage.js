import React, { useState, useEffect } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import EventAPI from "../apis/EventAPI";
import EventList from "../components/Event/EventList";
import Notification from "../components/Notification"
function EventsPage(props){

    const [events, setEvents] = useState([]);
    const [tempEvents, setTempEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [shouldFocus, setShouldFocus] = useState(false);
    let eventsExist = false;
 
    const fetchEvents = async () => {  
        EventAPI.getEvents()
                    .then(response =>{
                        setEvents(response.data.events);
                    })
        
    }
    const filteredEvents = events.filter(event => 
        event.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        fetchEvents();
    }, [tempEvents]);
    if(events)
    {
        if(!(Object.keys(events).length === 0))
        {
            eventsExist = true;
        }
    }
    else
    {
           eventsExist = false;
    }
    function ShowEvents(){
        return(
            <>
            <ToastContainer/>
            <Form>
            <Form.Group controlId="formSearch">
                <Form.Label>Loses</Form.Label>
                <Form.Control
                autoFocus={shouldFocus}
                                    type="text" 
                                    placeholder="Search for events" 
                                    value={searchTerm} 
                                    onChange={e => {setSearchTerm(e.target.value);
                                    setShouldFocus(true);
                                    if (e.target.value === '') {
                                        setShouldFocus(false);
                                    }
                                    } } />
            </Form.Group>

            <EventList events={filteredEvents} setEvents={(events) =>setTempEvents(events)}Notification={props.Notification}/>
            </Form>
            </>
        )
    }
    function NoEvents(){
        return(
            <h1>No events currently registered</h1>
        )
    }
    if(events.length > 0){
        return <ShowEvents/>
    }
    else{
        return <NoEvents/>
    }

}
export default EventsPage;