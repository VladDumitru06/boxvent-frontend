import { useState , useEffect } from "react";
import UserAPI from "../apis/UserAPI";
function LoginForm (){
    
    const[userData, setUserData] = useState();

    const handleUsernameChange = event =>{
        setUserData(userData => ({
            ...userData,
            username: event.target.value
        }));
    }    

    const handlePasswordChange = event =>{
        setUserData(userData => ({
            ...userData,
            password: event.target.value
        }));
    }  


    const handleSubmit = e =>{
       e.preventDefault();
        UserAPI.loginUser(userData);

    } 

    
    return (
        <form onSubmit={handleSubmit}>
        <input
            type="text"
            placeholder="Username"
            onChange={handleUsernameChange}
        />
                    <input
            type="password"
            placeholder="Password"
            onChange={handlePasswordChange}
        />
        <input type="submit" value="Login" />
    </form>
    )
}
export default LoginForm;