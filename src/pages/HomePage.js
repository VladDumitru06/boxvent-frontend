import { Row , Col, Container } from "react-bootstrap";
import FightersPage from "./FightersPage";
import MainContent from "../components/MainContent";
import { useRef } from "react";
import EventsPage from "./EventsPage";

function HomePage(){
    const myRef = useRef(null);

    function ScrollFighters ()  {
            myRef.current.scrollIntoView() }//<button onClick={ScrollFighters}> Click to scroll </button> 

    return(
        <div>
        <MainContent/>
        <Container>
        <Row className="m-0 justify-content-md-center">
          <h1 ref={myRef}>Fighters</h1> 
            <FightersPage/>
        </Row>
        <Row className="m-0 justify-content-md-center">
          <h1 ref={myRef}>Events</h1> 
            <EventsPage/>
        </Row>
        </Container>
        </div>
    )
}
export default HomePage;