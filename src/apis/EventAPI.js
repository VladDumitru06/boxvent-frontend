import axios from "axios";
const BASE_URL = "http://localhost:8080";

const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("JWT")}` }
};

const EventAPI = {
    getEvents: () => axios.get(`${BASE_URL}/events`, config)
        .catch(err => {
            console.log(err);
        }),
    createEvent: newEvent => axios.post(`${BASE_URL}/events`, newEvent, config)
        .catch(err => {
            console.log(err);
        })

};

export default EventAPI;