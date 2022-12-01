import jwt_decode from "jwt-decode";
 
var decoded = jwt_decode(localStorage.getItem("JWT"));
const GetRole = function(){
     return decoded;
}

export default GetRole;