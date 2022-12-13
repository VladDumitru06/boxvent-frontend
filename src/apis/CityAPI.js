import axios from "axios";
const BASE_URL = "http://localhost:8080";

const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("JWT")}` }
};

const CityAPI = {
    getCities: () => axios.get(`${BASE_URL}/locations/cities`, config)
        .catch(err => {
            console.log(err);
        })

};

export default CityAPI;