import React from "react"
import FighterCard from './FighterCard'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
function FighterList(props){
  function modifyFighter(fighter, newFighter){

    const index = props.fighters.findIndex(e => e.id === fighter.id);
    if (newFighter.fighterName !== null && newFighter.fighterName !== "" && newFighter.fighterName !== undefined){
      props.fighters[index].name = newFighter.fighterName;
    }
    if (newFighter.wins !== null && newFighter.wins !== "" && newFighter.wins !== undefined){
      props.fighters[index].boxingRecord.wins = newFighter.wins;
    }
    if (newFighter.draws !== null && newFighter.draws !== "" && newFighter.draws !== undefined){
      props.fighters[index].boxingRecord.draws = newFighter.draws;
    }
    if (newFighter.loses !== null && newFighter.loses !== "" && newFighter.loses !== undefined){
      props.fighters[index].boxingRecord.loses = newFighter.loses;
    }
    if (newFighter.image !== null && newFighter.image !== "" && newFighter.image !== undefined){
      props.fighters[index].image = newFighter.image;
    }
  };
  const removeFighter = async (fighterId) => {
    try {
      const index = props.fighters.findIndex(e => e.id === fighterId);
      props.fighters.splice(index, 1);
      props.Notification.Success("Event deleted successfully");
      props.setFighters(props.fighters);
    } catch (error) {
      console.log(error);
      props.Notification.Error("Something went wrong");
    }
  }
    return (
      <Container >
      <Row xs={1}sm={2} md={2} lg={3} xl={3}xxl={4} className="justify-content-md-center">
            
      {props.fighters?.map(fighter => (
            <Col  key={fighter.id} className="pt-5"><FighterCard removeFighter={(fighter) => removeFighter(fighter)} modifyFighter={(e)=>modifyFighter(fighter,e)} fighter={fighter}/></Col>
          ))}
    </Row>
    </Container>
      )
}

export default FighterList;