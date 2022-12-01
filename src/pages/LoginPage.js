import LoginForm from "../components/LoginForm.js"
import RegistrationForm from "../components/RegistrationForm.js";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
function LoginPage(){
    return(
        <Container>
            <Row className="justify-content-md-center">
                
                <Col xs={6} sm={6} md={6} lg={5} xl={4} xxl={4} >
                <h1>Login</h1>
                    <LoginForm/>
                </Col>
                <Col xs={6} sm={6} md={6} lg={5} xl={4} xxl={4} >
                <h1>Register</h1>
                    <RegistrationForm/>
                </Col>
            </Row>
        </Container>
    )
}
export default LoginPage;