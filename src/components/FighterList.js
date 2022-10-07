import React from "react"
import FighterCard from './FighterCard'
function FighterList(props){
    return (
        <ul>
        {props.fighters?.map(fighter => (
            <FighterCard key={fighter.id} fighter={fighter} />
          ))}
        </ul>
      )
}

export default FighterList;