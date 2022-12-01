import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import FighterAPI from "../apis/FighterAPI";
import Notification from "./Notification";
function InputFighter() {

   

    const [fighterData, setFighter] = useState();

    const handleNameChange = event => {
        setFighter(fighterData => ({
            ...fighterData,
            name: event.target.value
        }));
    }

    const handleWinsChange = event => {
        setFighter(fighterData => ({
            ...fighterData,
            wins: event.target.value
        }));
    }

    const handleDrawsChange = event => {
        setFighter(fighterData => ({
            ...fighterData,
            draws: event.target.value
        }));
    }

    const handleLosesChange = event => {
        setFighter(fighterData => ({
            ...fighterData,
            loses: event.target.value
        }));
    }
    const handleSubmit = e => {

        e.preventDefault();
        FighterAPI.createFighter(fighterData)
            .then(response => {
                console.log(response);
                console.log(response.data);
                Notification.Success("Fighter created");
            })
            .catch()
    }
    return (
        <>
        <Form onSubmit={handleSubmit}><ToastContainer />
            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Name</Form.Label>
                <Form.Control onChange={handleNameChange} type="text" placeholder="Fighter Name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Wins</Form.Label>
                <Form.Control onChange={handleWinsChange} type="text" placeholder="Wins" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Draws</Form.Label>
                <Form.Control onChange={handleDrawsChange} type="text" placeholder="Draws" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Loses</Form.Label>
                <Form.Control onChange={handleLosesChange} type="text" placeholder="Loses" />
            </Form.Group>
            <Button variant="primary" type="submit" >
                Create
            </Button>
        </Form>
        </>
    )
}
export default InputFighter;