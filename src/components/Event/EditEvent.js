import { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CityAPI from "../../apis/CityAPI";
import EventAPI from "../../apis/EventAPI";
import ImageAPI from "../../apis/ImageAPI";

function EditEvent(props){
    const [imgUrl, setImgUrl] = useState(null);
    const [cities, setCities] = useState([]);
    const [imageData, setImageData] = useState();
    const [eventData, setEventData] = useState({});
    const fetchCities = async () => {
        try {
            const response = await CityAPI.getCities();
            setCities(response.data.cities);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        setEventData(() => ({
            eventId: props.event.id,
            eventName: null,
            description: null,
            cityName: null,
            dateTime: null,
            availableTickets: null,
            ticketPrice: null,
            image: null,
            }));
    }, []);
    useEffect(() => {
        fetchCities();
    }, []);
    useEffect(() => {
        async function fetchImage() {
          const response = await ImageAPI.getEventImage(props);
          if (response.ok) {
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            setImgUrl(url);
          } else {
            console.error('Failed to fetch image');
          }
        }
        fetchImage();
      }, []);

      const handleFileChange = (e) => {
        const file = e.target.files[0];
    
        const reader = new FileReader();
        reader.onload = () => {
          setImageData(reader.result);
          setImgUrl(reader.result);
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
        console.log(name + " " + value);
        setEventData((prevEventData) => ({
            ...prevEventData,
            [name]: value,
        }));
    };
      const handleSubmit = async (event) => {   
        event.preventDefault();
        const eventId = props.event.id;
        setEventData((prevEventData) => ({
            ...prevEventData,
            eventId: eventId,
        }));
        const response = await EventAPI.updateEvent(eventId, eventData);
        if(response.status === 200){
            console.log(" eventData " + JSON.stringify(eventData));
            props.modifyEvent(eventData);
            props.Notification.Success("Event updated successfully");
            props.setIsEdit(false);
           // window.location.reload();
        }
    }

    return(
        <Form className="text-light bg-dark p-3 rounded" onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    
                    name="eventName"
                    type="text"
                    onChange={handleChange}
                    placeholder={props.event.name} />
            </Form.Group>
            <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    
                    name="description"
                    type="text"
                    onChange={handleChange}
                    placeholder={props.event.description} />
            </Form.Group>
            <Form.Group controlId="formCity">

                <Form.Label>Select a city:</Form.Label>
                <br/>
                <Form.Label>Current city: {props.event.city.city_name}</Form.Label>
                <Form.Control
                    
                    as="select"
                    name="cityName"
                    onChange={handleChange}
                ><option value=""></option>
                    { cities.map(city => (
                        <option key={city.id} value={city.city_name}>
                            {city.city_name}
                        </option>
                    )) }
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="formDate">
                <Form.Label>Select a date and time:</Form.Label>
                <br/>
                <Form.Label>Current date: {props.event.date.slice(0,10)} {props.event.date.slice(11,16)}</Form.Label>
                <Form.Control
                    
                    type="datetime-local"
                    name="dateTime"
                    onChange={handleChange}
                    placeholder={props.event.date}
                />
            </Form.Group>
            <Form.Group controlId="formTickets">
                <Form.Label>Available Tickets</Form.Label>
                <Form.Control
                    
                    name="availableTickets"
                    type="number"
                    step="1"
                    onChange={handleChange}
                    placeholder={props.event.available_tickets}  />
            </Form.Group>
            <Form.Group controlId="formPrice">
                <Form.Label>Price</Form.Label>
                <InputGroup>
                    <InputGroup.Text>€</InputGroup.Text>
                    <Form.Control
                        
                        name="ticketPrice"
                        type="number"
                        step="0.01"
                        onChange={handleChange}
                        placeholder={props.event.ticketPrice}  />
                </InputGroup>
            </Form.Group>
            <input  type="file" accept="image/jpeg,image/png" onChange={(e) => handleFileChange(e)} />
            <Form.Label className="pt-2 d-flex justify-content-center" >Image Preview</Form.Label>
            <Form.Group className="pb-2 d-flex justify-content-center" controlId="formImagePreview">
                <img  width={200} src={imgUrl} alt="Event" />
            </Form.Group>
            <div className="d-flex justify-content-center">
            <Button className="text-center" variant="primary" type="submit">
                Submit
            </Button>
            </div>
        </Form>
    )
}

export default EditEvent;