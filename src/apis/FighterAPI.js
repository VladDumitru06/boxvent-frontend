import axios from "axios";
import jwt_decode from "jwt-decode";
const BASE_URL = "http://localhost:8080";

const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("JWT")}` }
};

const FighterAPI = {
    getFighters: () => axios.get(`${BASE_URL}/fighters`,config),
    createFighter: newFighter =>axios.post(`${BASE_URL}/fighters`, newFighter,config)
    
};

export default FighterAPI;