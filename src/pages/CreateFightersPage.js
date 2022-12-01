import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import InputFighter from '../components/InputFighter';
function CreateFighters(){
    return (
        <Container>
        <Row className="justify-content-md-center">
            
            <Col xs={12} sm={12} md={6} lg={5} xl={4} xxl={4} >
            <h1>Create Fighter</h1>
                <InputFighter/>
            </Col>
        </Row>
    </Container>
    )
}

export default CreateFighters;