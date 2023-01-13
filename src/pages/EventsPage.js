import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import EventAPI from "../apis/EventAPI";
import EventList from "../components/Event/EventList";
import Notification from "../components/Notification"
function EventsPage(props){

    const [events, setEvents] = useState([]);
    let eventsExist = false;
    const fetchEvents = async () => {  
        EventAPI.getEvents()
                    .then(response =>{
                        setEvents(response.data.events);
                    })
        
    }
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
    useEffect(() => {
        fetchEvents();
    }, []);
  

    function ShowEvents(){
        return(
            <>
            <ToastContainer/>
            <EventList events={events} Notification={props.Notification}/>
            </>
        )
    }
    function NoEvents(){
        return(
            <h1>No events currently registered</h1>
        )
    }
    if(eventsExist){
        return <ShowEvents/>
    }
    else{
        return <NoEvents/>
    }

}
export default EventsPage;

