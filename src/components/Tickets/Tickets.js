import { useEffect, useState } from "react";
import TicketsAPI from "../../apis/TicketsAPI";
import jwtDecode from "jwt-decode";
function Tickets()
{

    const [tickets, setTickets] = useState([]);
    let ticketsExist = false;
    const fetchTickets = async () => {
        if(localStorage.getItem("JWT") !== null)
        TicketsAPI.getTickets(jwtDecode(localStorage.getItem("JWT")).id)
            .then(response => {
                setTickets(response.data.tickets);
            })
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
        fetchTickets();
    }, []);

    function ShowTickets() {
        return (
            <div>
                {tickets.map(ticket => {
                    return (
                        <div>
                            <h1>{ticket.userId} {ticket.eventId}</h1>
                            <h1></h1>
                        </div>
                    )
                })
                }
                </div>
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
export default Tickets;