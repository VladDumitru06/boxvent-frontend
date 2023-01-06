import React, { useEffect, useState } from 'react';
import EventAPI from '../../apis/EventAPI';
import CityAPI from '../../apis/CityAPI';
import { Form, InputGroup, InputGroupAppend, InputGroupText } from 'react-bootstrap';
import Notification from '../../components/Notification';
import { Button } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import CreateFightCard from './CreateFightCard';
function CreateEvent() {
    const [eventData, setEventData] = useState({});
    const [cities, setCities] = useState([]);
    const [nrOfFightCards, setnrOfFightCards] = useState(0);
    const [dateTime, setDateTime] = useState("");
    const [city, setCity] = useState("");
    const [ticketPrice, setTicketPrice] = useState("");
    const [totalTickets, setTotalTickets] = useState("");
    const [fightCards, setFightCards] = useState([]);

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
            setEventData((prevEventData) => ({
                ...prevEventData,
                fightCards: fightCards
            }));
            console.log(eventData);
            const response = await EventAPI.createEvent(eventData)
                .catch(error => {
                    Notification.Error(error);
                });
            if (response === null || response === undefined || response === "") {

                Notification.Error("Something went wrong");
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
        handleChange({ target: { name: "fightCards", value: fightCards } });
    }, [fightCards]);


    useEffect(() => {

        console.log(JSON.stringify(eventData));
    }, [eventData]);
    useEffect(() => {
        GetCities();
    }, []);
    const addFightCard = (newFightCard) => {
        let isDuplicate = false;
        fightCards.map((OriginalfightCard) => {
            if (OriginalfightCard.challengedId === newFightCard.challengedId && OriginalfightCard.challengerId === newFightCard.challengerId) {
                isDuplicate = true;
                if (OriginalfightCard.rounds !== newFightCard.rounds) {
                    const updatedFightCards = fightCards.filter(fightCard => fightCard !== OriginalfightCard);
                    setFightCards(updatedFightCards);
                    setFightCards((prevFightCards) => ([...prevFightCards, newFightCard]));
                    return;
                }
            }
        });
        if (!isDuplicate) {
        setFightCards((prevFightCards) => ([...prevFightCards, newFightCard]));
        }
    }
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
                <Form.Label>Fights <b>{nrOfFightCards > 0 && nrOfFightCards}</b></Form.Label>
                <br/>
                <Button style={{ marginRight: '10px' }}  variant="primary" onClick={() => setnrOfFightCards(nrOfFightCards + 1)}>
                    +
                </Button>
                {nrOfFightCards <= 0 && <br />}

                {nrOfFightCards > 0 && <Button variant="primary" onClick={() => setnrOfFightCards(nrOfFightCards - 1)}>
                    -
                </Button>}
                <br />
                <br />
                {Array(nrOfFightCards).fill().map((_, index) => (
                    <><div     style={{ 
                        backgroundColor: 'rgba(128, 128, 128, 0.25)',
                        borderRadius: '5px'
                      }} className="p-1"><CreateFightCard  key={index} name="fightCard" setFights={addFightCard} order={index}/>
                    </div>
                    <br /></>

                ))}
                <Button variant="primary" type="submit">
                    Create
                </Button>
            </Form>

        </>
    );
}

export default CreateEvent;