import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
    const navigate = useNavigate();
    const logout = () => {
        if (localStorage.getItem("JWT") != null) {
            localStorage.removeItem("JWT");
        }
    }
    useEffect(()=>{
        logout();
        navigate("/");
    },[navigate])

}

export default Logout;