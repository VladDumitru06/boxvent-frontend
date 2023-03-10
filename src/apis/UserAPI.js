import axios from "axios";
import Notification from "../components/Notification";

const BASE_URL = "https://boxvent-backend.herokuapp.com";

const UserAPI = {
    loginUser:  User =>  axios.post(`${BASE_URL}/login`, User)
        .then(response =>{
          console.log(response.status);
          console.log(response.data);
          localStorage.removeItem("JWT");
          localStorage.setItem("JWT",response.data.accessToken);
            return  response.data.accessToken;
          })
          .catch(err =>{
            Notification.Error(""+err);
            console.log(err);
          }),
    registerUser:  newUser =>  axios.post(`${BASE_URL}/register`, newUser)
    .then(response =>{
        console.log(response.status);
        console.log(response.data);
      })
      .catch(err =>{
        console.log(err);
      })
};

export default UserAPI;