import { Row , Col, Container } from "react-bootstrap";
import FightersPage from "./FightersPage";
import MainContent from "../components/ImageCarousel";
import { useRef } from "react";
import EventsPage from "./EventsPage";

import Notification from "../components/Notification";
import { ToastContainer } from "react-toastify";
function HomePage(){
    const myRef = useRef(null);

    function ScrollFighters ()  {
            myRef.current.scrollIntoView() }//<button onClick={ScrollFighters}> Click to scroll </button> 

    return(
        <div>
        <MainContent/>
        <ToastContainer/>
        <Container>
        <Row className="m-0 justify-content-md-center">
          <h1 ref={myRef}>Fighters</h1> 
            <FightersPage/>
        </Row>
        <Row className="m-0 justify-content-md-center">
          <h1 ref={myRef}>Events</h1> 
            <EventsPage Notification={Notification}/>
        </Row>
        </Container>
        </div>
    )
}
export default HomePage;