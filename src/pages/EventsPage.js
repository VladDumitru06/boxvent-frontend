import React, { useState, useEffect } from "react";
import EventAPI from "../apis/EventAPI";
import EventList from "../components/EventList";
import Notification from "../components/Notification"
function EventsPage(){

    const [events, setEvents] = useState([]);
    let eventsExist = false;
    const fetchEvents = async () => {  
        EventAPI.getEvents()
                    .then(response =>{
                        console.log(response.data.events);
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
            <EventList events={events}/>
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

