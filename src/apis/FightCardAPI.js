import axios from "axios";
import { BASE_URL } from "./config";

const config = {
    headers: {}
};

if (localStorage.getItem("JWT")) {
    config.headers.Authorization = `Bearer ${localStorage.getItem("JWT")}`;
}

const FightCardAPI = {
    getFightCardsByEvent: (eventId) => axios.get(`${BASE_URL}/fightcards?id=${eventId}`, config)
        .catch(err => {
            console.log(err);
        })

};

export default FightCardAPI;