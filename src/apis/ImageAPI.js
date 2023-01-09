import axios from "axios";

const BASE_URL = "http://localhost:8080";

const config = {
  headers: {},
};

if (localStorage.getItem("JWT")) {
  config.headers.Authorization = `Bearer ${localStorage.getItem("JWT")}`;
}

const ImageAPI = {
    getImage: async (name) => {
      try {
        const response = await axios.get(`${BASE_URL}/fighters/${name}/profilePic`, 
          {...config,
        responseType:'text'}
        )
        .then((resp)=>{
            console.log("RESP"+JSON.stringify(resp));
            return resp;
        }
        );
        return await response;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  };
  
export default ImageAPI;
