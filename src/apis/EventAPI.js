import axios from "axios";
const BASE_URL = "http://localhost:8080";

const config = {
    headers: {}
};

if (localStorage.getItem("JWT")) {
    config.headers.Authorization = `Bearer ${localStorage.getItem("JWT")}`;
}


const EventAPI = {
    getEvents: () => axios.get(`${BASE_URL}/events`, config)
        .catch(err => {
            console.log(err);
        }),
        
    getEvent: id => axios.get(`${BASE_URL}/events/${id}`, config)
    .catch(err => {
        console.log(err);
    }),
    createEvent: newEvent => axios.post(`${BASE_URL}/events`, newEvent, config)
        .catch(err => {
            console.log(err.response.data);
            throw err.response.data;
        }),
    updateEvent: (id, updatedEvent) => axios.put(`${BASE_URL}/events/${id}`, updatedEvent, config)
        .catch(err => {
            console.log(err);
        }),
    deleteEvent: id => axios.delete(`${BASE_URL}/events/${id}`, config)
        .catch(err => {
            console.log(err);
        })
};

export default EventAPI;