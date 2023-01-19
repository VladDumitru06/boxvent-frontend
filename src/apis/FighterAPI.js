import axios from "axios";
import Notification from "../components/Notification";
const BASE_URL = "http://localhost:8080";

const config = {
    headers: {}
};

if (localStorage.getItem("JWT")) {
    config.headers.Authorization = `Bearer ${localStorage.getItem("JWT")}`;
}

const FighterAPI = {
    getFighters: () => axios.get(`${BASE_URL}/fighters`, config)
        .catch(err => {
            console.log(err);
        }),
    createFighter: newFighter => axios.post(`${BASE_URL}/fighters`, newFighter, config)
        .catch(err => {
            Notification.Error(""+err);
            console.log(err);
        }),
    updateFighter: (id, updatedFighter) => axios.put(`${BASE_URL}/fighters/${id}`, updatedFighter, config)
        .catch(err => {
            console.log(err);
        }),
    deleteFighter: id => axios.delete(`${BASE_URL}/fighters/${id}`, config)
        .catch(err => {
            console.log(err);
        })

};

export default FighterAPI;