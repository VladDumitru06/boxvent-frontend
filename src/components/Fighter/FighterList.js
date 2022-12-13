import React from "react"
import FighterCard from './FighterCard'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
function FighterList(props){
    return (
      <Container >
      <Row xs={1}sm={2} md={2} lg={3} xl={3}xxl={4} className="justify-content-md-center">
            
      {props.fighters?.map(fighter => (
            <Col key={fighter.id} className="pt-5"><FighterCard  fighter={fighter}/></Col>
          ))}
    </Row>
    </Container>
        
      )
}

export default FighterList;