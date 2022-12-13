import { Col, Container, Row } from "react-bootstrap";
import RegistrationForm from "../components/RegistrationForm.js"
function RegisterPage() {
    return (
        <Container>
            <Row className="justify-content-md-center">

                <Col xs={6} sm={6} md={6} lg={5} xl={4} xxl={4} >
                    <h1>Register</h1>
                    <RegistrationForm />
                </Col>

            </Row>
        </Container>
    )
}
export default RegisterPage;