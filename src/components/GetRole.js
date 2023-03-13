import jwt_decode from "jwt-decode";
import jwtDecode from "jwt-decode";
const GetRole = function () {
     var currentTime = new Date().getTime() / 1000;
     var decoded;
     if (localStorage.getItem("JWT") !== null) {
          decoded = jwtDecode(localStorage.getItem("JWT"));
     }
     if (localStorage.hasOwnProperty("JWT") || decoded.exp < currentTime) {
          var guest = {
               sub: "guest",
               roles: ["GUEST"]
          }
          const jwt = require('jwt-encode');
          const secret = 'secret';
          const jwtToken = jwt(guest, secret);
          localStorage.setItem("JWT", jwtToken);
          return guest;
     }
     return decoded;
}

export default GetRole;