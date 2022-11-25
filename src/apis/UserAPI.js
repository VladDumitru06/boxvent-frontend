import axios from "axios";

const BASE_URL = "http://localhost:8080";

const UserAPI = {
    loginUser: async User => await axios.post(`${BASE_URL}/login`, User)
        .then(response =>{
          console.log(response.status);
          console.log(response.data);
          localStorage.setItem("JWT",response.data.accessToken)
            return  response.data.accessToken;
          })
          .catch(err =>{
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