import { useEffect, useState } from "react";
import EventAPI from "../apis/EventAPI";

function Statistics() {
    const [totalBoughtTickets, setTotalBoughtTickets] = useState(0);

    const fetchAllEvents = async () => {
        const response = EventAPI.getEvents()
            .then(response => {
                //for each response.data.events get sold_tickets
                let total = 0;
                for (let i = 0; i < response.data.events.length; i++) {
                    total += response.data.events[i].sold_tickets;

                }
                setTotalBoughtTickets(total);
            })

    }
    useEffect(() => {
        fetchAllEvents();
    }, []);


    return (
        <div>
            <h1>Statistics</h1>
            <h2>Total bought tickets: {totalBoughtTickets}</h2>
        </div>
    )
}
export default Statistics;