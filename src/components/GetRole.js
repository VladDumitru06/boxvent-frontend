import jwt_decode from "jwt-decode";

const GetRole = function () {

     if (localStorage.getItem("JWT") === null) {
          var guest = {
               sub: "guest",
               roles: ["GUEST"]
          }
          return guest;
     }
     var decoded = jwt_decode(localStorage.getItem("JWT"));
     return decoded;
}

export default GetRole;