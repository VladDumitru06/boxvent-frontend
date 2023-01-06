import jwt_decode from "jwt-decode";

const GetRole = function () {


     var currentTime = new Date().getTime() / 1000;
     var decoded;
     if(localStorage.getItem("JWT") !== null)
     if (jwt_decode(localStorage.getItem("JWT")) !== null)
          {decoded = jwt_decode(localStorage.getItem("JWT"));}
     if (jwt_decode(localStorage.getItem("JWT")) === null || decoded.exp < currentTime) {
          var guest = {
               sub: "guest",
               roles: ["GUEST"]
          }
          return guest;
     }

     return decoded;
}

export default GetRole;