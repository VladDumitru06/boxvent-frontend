import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import FighterAPI from "../../apis/FighterAPI";
import Notification from "../Notification";

function CreateFighter() {
  const [fighterData, setFighterData] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFighterData((prevFighterData) => ({
      ...prevFighterData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await FighterAPI.createFighter(fighterData);
      console.log(response);
      console.log(response.data);
      Notification.Success("Fighter created");
    } catch (error) {
      // Handle error
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <ToastContainer />
        <Form.Group controlId="formBasicText">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            onChange={handleChange}
            type="text"
            placeholder="Fighter Name"
          />
        </Form.Group>
        <Form.Group controlId="formBasicText">
          <Form.Label>Wins</Form.Label>
          <Form.Control
            name="wins"
            onChange={handleChange}
            type="text"
            placeholder="Wins"
          />
        </Form.Group>
        <Form.Group controlId="formBasicText">
          <Form.Label>Draws</Form.Label>
          <Form.Control
            name="draws"
            onChange={handleChange}
            type="text"
            placeholder="Draws"
          />
        </Form.Group>
        <Form.Group controlId="formBasicText">
          <Form.Label>Loses</Form.Label>
          <Form.Control
            name="loses"
            onChange={handleChange}
            type="text"
            placeholder="Loses"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create
        </Button>
      </Form>
    </>
  );
}

export default CreateFighter;