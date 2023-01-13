import jwtDecode from "jwt-decode";
function isUserLoggedIn() {
  const jwt = localStorage.getItem("JWT");
    if (jwt) {
        if(jwtDecode(jwt).exp < Date.now() / 1000) {
            return false;
        }
        if(jwtDecode(jwt).roles.includes(!"ROLE_GUEST")) {
            return false;
        }
        return true;
    }
    return false;
}

export default isUserLoggedIn;