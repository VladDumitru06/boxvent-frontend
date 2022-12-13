import React, { useEffect, useState } from 'react';
import EventAPI from '../../apis/EventAPI';
import CityAPI from '../../apis/CityAPI';
import { Form, InputGroup, InputGroupAppend, InputGroupText } from 'react-bootstrap';
import Notification from '../../components/Notification';
import { Button } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
function CreateEvent() {
    const [eventData, setEventData] = useState({});
    const [cities, setCities] = useState([]);
    const [name, setName] = useState("");
    const [dateTime, setDateTime] = useState("");
    const [city, setCity] = useState("");
    const [ticketPrice, setTicketPrice] = useState("");
    const [totalTickets, setTotalTickets] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEventData((prevEventData) => ({
            ...prevEventData,
            [name]: value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(eventData);
            const response = await EventAPI.createEvent(eventData)
            .catch(error => {
                console.log(error+"EOROROROR");
                Notification.Error(error);
            });
            if(response === null || response === undefined || response === ""){
                
                Notification.Error(response);
            }
            else
            Notification.Success("Event created");
        } catch (error) {
            Notification.Error(error);
        }
    };
    const GetCities = async () => {
        try {
            const response = await CityAPI.getCities();
            setCities(response.data.cities);
        } catch (error) {
            console.log(error);
            Notification.Error(error);
        }
    };

    useEffect(() => {
        GetCities();
    }, []);

    /*
        private LocalDateTime eventDate;
        private Double ticketPrice;
    */
    return (
        <>

            <Form onSubmit={handleSubmit}>
                
        <ToastContainer />
                <Form.Group controlId="formBasicText">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        required
                        name="eventName"
                        onChange={handleChange}
                        type="text"
                        placeholder="Event Name" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Select a city:</Form.Label>
                    <Form.Control
                        required
                        as="select"
                        name="cityName"
                        value={city}
                        onChange={event => { setCity(event.target.value); handleChange(event); }}
                    ><option value="">Select city</option>
                        {cities.map(city => (
                            <option key={city.id} value={city.city_name}>
                                {city.city_name}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Select a date and time:</Form.Label>
                    <Form.Control
                        required
                        type="datetime-local"
                        name="eventDate"
                        value={dateTime}
                        onChange={event => { setDateTime(event.target.value); handleChange(event); }}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicNumber">
                    <Form.Label>Available Tickets</Form.Label>
                    <Form.Control
                        required
                        name="availableTickets"
                        onChange={handleChange}
                        type="number"
                        step="1"
                        placeholder="Enter amount" />
                </Form.Group>
                <Form.Group controlId="formBasicCurrency">
                    <Form.Label>Price</Form.Label>
                    <InputGroup>
                        <InputGroup.Text>€</InputGroup.Text>
                        <Form.Control
                            required
                            name="ticketPrice"
                            onChange={handleChange}
                            type="number"
                            step="0.01"
                            placeholder="Enter price" />
                    </InputGroup>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Create
                </Button>
            </Form>
        </>
    );
}

export default CreateEvent;