import React, { useEffect, useState } from 'react';
import EventAPI from '../../apis/EventAPI';
import CityAPI from '../../apis/CityAPI';
import { Form, InputGroup } from 'react-bootstrap';
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
    const [fightCards, setFightCards] = useState([]);
    const [imagePreview, setImagePreview] = useState();
    const [image, setImage] = useState();
    const [imageData, setImageData] = useState();
  
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      setImage(file);
  
      const reader = new FileReader();
      reader.onload = () => {
        setImageData(reader.result);
        setImagePreview(reader.result);
      }
      reader.readAsDataURL(file);
    }
    useEffect(() => {
        setEventData((prevEventData) => ({
            ...prevEventData,
          image: imageData,
        }));
      }, [imageData]);
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
            if(fightCards.length === 0)
            {
                Notification.Error("You need to add at least one fight card");
                return;
            }
            setEventData((prevEventData) => ({
                ...prevEventData,
                fightCards: fightCards
            }));
            console.log(eventData);
            const response = await EventAPI.createEvent(eventData)
                .catch(error => {
                    Notification.Error(error);
                    return;
                });
            if (response === null || response === undefined || response === "") {

                Notification.Error("No response from server");
            }
            else
              {  
                Notification.Success("Event created");
                const form = document.getElementById("formId");
                form.reset();
                setImagePreview();
                setnrOfFightCards(0);
            }
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
    const removeFightCard = (fightCard) => {
        const updatedFightCards = fightCards.filter(f => f !== fightCard);
        setFightCards(updatedFightCards);
    }
    return (
        <>
            <Form id="formId" onSubmit={handleSubmit}>
        <Form.Label>Image</Form.Label>
        <br></br>
            <input required type="file" accept="image/png" onChange={(e) => handleFileChange(e)} />
            {imagePreview && <img src={imagePreview} alt="event thumbnail" width="200"/>}
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
                <Form.Group controlId="formBasicText">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        required
                        name="description"
                        onChange={handleChange}
                        type="text"
                        placeholder="Event Description" />
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
                    <div key={index}><div     style={{ 
                        backgroundColor: 'rgba(128, 128, 128, 0.25)',
                        borderRadius: '5px'
                      }} className="p-1"><CreateFightCard name="fightCard" removeFight={removeFightCard} setFights={addFightCard} order={index}/>
                    </div>
                    <br /></div>

                ))}
                <Button variant="primary" type="submit">
                    Create
                </Button>
            </Form>

        </>
    );
}

export default CreateEvent;