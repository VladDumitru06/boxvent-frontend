import axios from "axios";

const BASE_URL = "http://localhost:8080";

const FighterAPI = {
    getFighters: () => axios.get(`${BASE_URL}/fighters`),
    createFighter: newFighter => axios.post(`${BASE_URL}/fighters`, newFighter)
};

export default FighterAPI;