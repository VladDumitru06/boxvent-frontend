import LoginForm from "../components/LoginForm.js"
import RegistrationForm from "../components/RegistrationForm.js";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import EventsPage from "./EventsPage.js";
function LoginPage(){
    return(
        <Container>
            <Row className="justify-content-md-center">
                
                <Col xs={6} sm={6} md={6} lg={5} xl={4} xxl={4} >
                <h1>Login</h1>
                    <LoginForm/>
                </Col>
            
            </Row>
        </Container>
    )
}
export default LoginPage;