import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import ReactDOM from "react-dom/client";
import CardForm from "../CardForm";
import TicketsAPI from "../../apis/TicketsAPI";
import isUserLoggedIn from "../IsUserLoggedIn";
import jwtDecode from "jwt-decode";
function Tickets(props) {
    const [totalPrice, setTotalPrice] = useState(0);
    const [nrOfTickets, setNrOfTickets] = useState(0);
    const buyTickets = async (ticketData) => { const response= await TicketsAPI.buyTicket(ticketData).catch(
        (err) => {
            props.Notification.Error(err);
        }
    );
    if(response.status === 200)
       {
         props.Notification.Success("Payment successful");
         props.setAvailableTickets(props.availableTickets - nrOfTickets);
         
     }};
    const handleClick = () => {
        const newWindow = window.open("", "", "width=370,height=420");
        ReactDOM.createRoot(newWindow.document.body).render(<CardForm closeWindow={() => newWindow.close()} />);
        newWindow.onunload = () => {
            if (totalPrice > 0) {
                let jwt = "";
                if (isUserLoggedIn) {
                    jwt = jwtDecode(localStorage.getItem("JWT"));
                    const ticketData = {
                        eventId: props.event.id,
                        userId: jwt.id,
                        numberOfTickets: nrOfTickets,
                    };
                    buyTickets(ticketData);
                }
            }
            else {
                props.Notification.Error("Payment failed");
            }
            newWindow.close();
        };
    };
    
    const ticketsChanged = (event) => {
        let inputValue = event.target.value;
        if (inputValue < 0) {
            event.target.value = 0;
            inputValue = 0;
        } else if (inputValue > props.event.available_tickets) {
            event.target.value = props.event.available_tickets;
            inputValue = props.event.available_tickets;
        }
        setNrOfTickets(inputValue);
        setTotalPrice(inputValue * props.event.ticketPrice);
    }

    return (
        <div style={{ backgroundColor: "white", borderRadius: "25px" }} className="p-3">
            <h1>Tickets</h1>
            <h2>Available Tickets: {props.availableTickets}</h2>
            <h2>Price: {props.event.ticketPrice}</h2>
            <Form >
                <label>{"Total Price: " + totalPrice + "€"}</label>
                <Form.Group controlId="formInputTickets">
                    <Form.Label>Number of tickets</Form.Label>
                    <Form.Control type="number" placeholder="Enter number of tickets" required min={0} max={props.event.available_tickets - props.event.sold_tickets} onChange={e =>ticketsChanged(e)} />
                </Form.Group>
            </Form>
            <div className="pt-3 d-flex justify-content-center">
                <Button variant="primary" type="submit" className="mx-auto" onClick={handleClick}>
                    Submit
                </Button>
            </div>
        </div>
    )
}
export default Tickets;