import { useState , useEffect } from "react";
import UserAPI from "../apis/UserAPI";
import { Form, Button } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Notification from "./Notification";
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
    const handleEmailChange = event =>{
        setUserData(userData => ({
            ...userData,
            email: event.target.value
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
    let navigate = useNavigate();
    const handleSubmit = e =>{
       e.preventDefault();
       if(checkInput(userData).length === 0){
        UserAPI.registerUser(userData).then(() =>{Notification.Success("Succesfully registered"); navigate("/login");});
       }
       else{
        Notification.Error(checkInput(userData));
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
        <Form onSubmit={handleSubmit}>
            <ToastContainer/>
        <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
                <Form.Control onChange={handleUsernameChange} type="text" placeholder="Enter username" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
                <Form.Control onChange={handleEmailChange} type="email" placeholder="Enter email" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onChange={handlePasswordChange} type="password" placeholder="Password" required />
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formBasicReTypePassword">
            <Form.Label>ReType-Password</Form.Label>
            <Form.Control onChange={handleReTypePasswordChange} type="password" placeholder="ReType-Password" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
        </Form.Group>
        <Button variant="primary" type="submit">
            Register
        </Button>
        </Form>

    )
}
export default RegistrationForm;