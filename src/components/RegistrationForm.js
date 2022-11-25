import { useState , useEffect } from "react";
import UserAPI from "../apis/UserAPI";
function RegistrationForm (){
    
    const[userData, setUserData] = useState();
    const[passwordChecker, setPasswordChecker] = useState("");
    const [reTypedPassword, setReTypedPassword] = useState("");
    
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
        checkSimilarPassword(event.target.value,reTypedPassword);
    }  

    const handleReTypePasswordChange = event =>{
        checkSimilarPassword(userData.password,event.target.value);
        setReTypedPassword(event.target.value);
    } 

    const handleSubmit = e =>{
       e.preventDefault();
       if(checkInput(userData).length === 0){
        UserAPI.registerUser(userData);
       }
       else{
        alert(checkInput(userData));
       }
    } 

    function checkSimilarPassword(mainPassword, secondPassword)
    {
        if(mainPassword === secondPassword)
            setPasswordChecker("");
        else
            setPasswordChecker("Passwords don't match!");
    }
    function checkInput(dataToCheck)
    {
        const errors = [];
        var  usernameRegex = /^[a-zA-Z0-9]+$/ , passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{6,12}$/g;

        if (typeof dataToCheck === 'undefined' || !dataToCheck.hasOwnProperty('username'))
            errors.push("Username is empty");
        else
        {
            if(!dataToCheck.username.match(usernameRegex))
                errors.push("Username should only contain letters and numbers");
            if(dataToCheck.username.length > 20)
                errors.push("Username must be less than 20 characters long");
            if(dataToCheck.username.length < 2)
                errors.push("Username must be atleast 2 characters long");
        }

        if(typeof dataToCheck === 'undefined' || !dataToCheck.hasOwnProperty('password'))
            errors.push("Password is empty");
        else
        {
            if(!dataToCheck.password.match(passwordRegex))
                errors.push("Password has to contain a lower case letter, an upper case letter, a number and a symbol");
            if(dataToCheck.password.length > 12)
                errors.push("Password must be less than 12 characters long");
            if(dataToCheck.password.length < 6)
                errors.push("Password must be atleast 6 characters long");
            if(passwordChecker === "Passwords don't match!")
                errors.push("Passwords don't match");
        }

        return errors;
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
                    <input
            type="password"
            placeholder="Re-type Password"
            onChange={handleReTypePasswordChange}
        />
        <p>{passwordChecker}</p>
        <input type="submit" value="Register" />
    </form>
    )
}
export default RegistrationForm;