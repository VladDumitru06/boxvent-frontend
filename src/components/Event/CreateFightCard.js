import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import FighterAPI from '../../apis/FighterAPI';

function CreateFightCard(props) {
    const [fighters, setFighters] = useState([]);
    const [challenger, setChallenger] = useState();
    const [challenged, setChallenged] = useState();
    const [rounds, setRounds] = useState();
    const [fightCard, setFightCard] = useState({});
    const fetchFighters = async () => {
        FighterAPI.getFighters()
            .then(response => {
                if (response)
                    setFighters(response.data.fighters);
            })

    }
    useEffect(() => {
        fetchFighters();
        return () => {
            if(fightCard)
            {
                props.removeFight(props.order);
            }
        }
    }, []);

    useEffect(() => {
        if (challenger && challenged && rounds) {
            setFightCard({
                fighter1: challenger,
                fighter2: challenged,
                rounds: rounds
            });
            props.setFights({ challengedId: challenger, challengerId: challenged , orderNumber: props.order+1, rounds: rounds});
        }
    }, [challenger, challenged, rounds]);

    return (
        <div>
            <Form.Control
                required
                as="select"
                name="fighter1"
                value={challenger}
                onChange={(e) => setChallenger(e.target.value)}>
                <option value="">Select Fighter</option>
                {fighters.map((fighter) => {
                    return (
                        <option key={fighter.id} value={fighter.id}>{fighter.name}</option>
                    )
                })}
            </Form.Control>
            <h2>VS</h2>

            <Form.Control
                required
                as="select"
                name="fighter2"
                value={challenged}
                onChange={(e) => setChallenged(e.target.value)}>
                <option value="">Select Fighter</option>
                {fighters.map((fighter) => {
                    return (
                        <option key={fighter.id} value={fighter.id}>{fighter.name}</option>
                    )
                })}
            </Form.Control>
            <Form.Label>Rounds</Form.Label>
            <Form.Control
                required
                name="rounds"
                onChange={event => setRounds(event.target.value)}
                type="number"
                step="1"
                min="1"
                max="12"
                placeholder="Enter rounds" />
        </div>
    )
}

export default CreateFightCard;