import axios from "axios";
import { BASE_URL } from "./config";

const config = {
    headers: {}
};

if (localStorage.getItem("JWT")) {
    config.headers.Authorization = `Bearer ${localStorage.getItem("JWT")}`;
}

const CityAPI = {
    getCities: () => axios.get(`${BASE_URL}/locations/cities`, config)
        .catch(err => {
            console.log(err);
        })

};

export default CityAPI;