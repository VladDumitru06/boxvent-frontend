import axios from "axios";
const BASE_URL = "https://boxvent-backend.herokuapp.com";

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