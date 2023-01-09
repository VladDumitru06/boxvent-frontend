import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import FighterAPI from "../../apis/FighterAPI";
import Notification from "../Notification";
function CreateFighter() {
  const [fighterData, setFighterData] = useState({});
  const [imagePreview, setImagePreview] = useState();
  const [image, setImage] = useState();
  const [imageData, setImageData] = useState();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.onload = () => {
      setImageData(reader.result);

    }
    reader.readAsDataURL(file);
  }
  useEffect(() => {
    setFighterData((prevFighterData) => ({
      ...prevFighterData,
      image: imageData,
    }));
  }, [imageData]);

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
      Notification.Success("Fighter created!");
  
    } catch (error) {
      Notification.Error(error);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <ToastContainer />
        <input required type="file" accept="image/jpeg,image/png" onChange={(e) => handleFileChange(e)} />
        <img src={imagePreview} />

        <Form.Group controlId="formBasicText">
          <Form.Label>Name</Form.Label>
          <Form.Control
          required
            name="name"
            onChange={handleChange}
            type="text"
            placeholder="Fighter Name"
          />
        </Form.Group>
        <Form.Group controlId="formBasicText">
          <Form.Label>Wins</Form.Label>
          <Form.Control
          required
            name="wins"
            onChange={handleChange}
            type="number"
            placeholder="Wins"
          />
        </Form.Group>
        <Form.Group controlId="formBasicText">
          <Form.Label>Draws</Form.Label>
          <Form.Control
          required
            name="draws"
            onChange={handleChange}
            type="number"
            placeholder="Draws"
          />
        </Form.Group>
        <Form.Group controlId="formBasicText">
          <Form.Label>Loses</Form.Label>
          <Form.Control
          required
            name="loses"
            onChange={handleChange}
            type="number"
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