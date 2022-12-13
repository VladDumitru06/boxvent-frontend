import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import InputEvent from '../components/Event/CreateEvent';
function CreateEvents(){
    return (    
        <Container>
        <Row className="justify-content-md-center">

            <Col xs={12} sm={12} md={6} lg={5} xl={4} xxl={4} >
            <h1>Create Event</h1>
                <InputEvent/>
            </Col>
        </Row>
    </Container>
        
    )
}

export default CreateEvents;