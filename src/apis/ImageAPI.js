import axios from "axios";

const BASE_URL = "http://localhost:8080";

const config = {
  headers: {},
};

if (localStorage.getItem("JWT")) {
  config.headers.Authorization = `Bearer ${localStorage.getItem("JWT")}`;
}

const ImageAPI = async (props) => await  fetch(`http://localhost:8080/fighters/${props.fighter.name}/profilePic`, {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem("JWT")}`
  }
});
  
export default ImageAPI;
