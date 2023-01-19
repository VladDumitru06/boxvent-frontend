import { Card, Col, Container, Row } from "react-bootstrap";
import ChatHandler from "../Chat/ChatHandler";
import ChatWindow from "../Chat/ChatWindow";
function Event(props) {
    return (

            <Container>
                <Row>
                    <Col xl={6}>
                        <Card style={{ width: '100%' }} className="text-center" >
                            <Card.Body>
                                <Card.Title>{props.event.name}</Card.Title>
                                <Card.Text>
                                    {props.event.description}
                                    <h4>Fight Cards</h4>
                                    {props.fightCards.map((fightCard) => (
                                        <div key={fightCard.id}>
                                            <b>{fightCard.fight.challengerFighter.name}</b> VS <b>{fightCard.fight.challengedFighter.name}</b>
                                        </div>
                                    ))}
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <p>{`${props.event.city.city_name}, ${props.event.city.country_code}`}</p>
                                <p>{`Available tickets: ${props.event.available_tickets}`}</p>
                                <p>{props.event.date.split('T')[0]}</p>
                            </Card.Footer>
                        </Card>
                    </Col>

                    <Col xl={6}>
                        <ChatHandler event={props.event}/>
                    </Col>
                </Row>
            </Container>
    )
}

export default Event;