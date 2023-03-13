import axios from "axios";
import { BASE_URL } from "./config";

const config = {
    headers: {}
};

if (localStorage.getItem("JWT")) {
    config.headers.Authorization = `Bearer ${localStorage.getItem("JWT")}`;
}

const TicketsAPI = {
    buyTicket: newTicket => axios.post(`${BASE_URL}/tickets`, newTicket, config)
        .catch(err => {
            console.log(err.response.data);
            throw err.response.data;
        }),
        getTickets: userId => axios.get(`${BASE_URL}/tickets?id=${userId}`, config)
        .catch(err => {
            console.log(err);
        }),

};

export default TicketsAPI;