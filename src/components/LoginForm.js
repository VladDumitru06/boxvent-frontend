import { useState , useEffect } from "react";
import UserAPI from "../apis/UserAPI";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Notification from "./Notification";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

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


    let navigate = useNavigate(); 
    const handleSubmit = e =>{
        e.preventDefault();
        UserAPI.loginUser(userData).then(response => {
            console.log(response);
            console.log(response.data);
            Notification.Success("Succesfully logged in");
              navigate("/");
              window.location.reload();
        })
    } 
    return (
                <Form onSubmit={handleSubmit}>
                    <ToastContainer/>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                        <Form.Control onChange={handleUsernameChange} type="text" placeholder="Enter username" required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={handlePasswordChange} type="password" placeholder="Password" required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button>
                </Form>
    )
}
export default LoginForm;