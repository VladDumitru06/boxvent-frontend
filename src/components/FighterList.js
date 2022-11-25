import React from "react"
import FighterCard from './FighterCard'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
function FighterList(props){
    return (
   /*   <Container className="pt-5">
      <Row xs={2} md={4} lg={6}>
      {props.fighters?.map(fighter => (
            <Col><FighterCard key={fighter.id} fighter={fighter} /></Col>
          ))}
    </Row>
    </Container>*/
      <Container >
      <Row xs={2}sm={1} md={3} lg={4} xl={3}xxl={4} >
      {props.fighters?.map(fighter => (
            <Col key={fighter.id} className="pt-5"><FighterCard  fighter={fighter}/></Col>
          ))}
    </Row>
    </Container>
        
      )
}

export default FighterList;