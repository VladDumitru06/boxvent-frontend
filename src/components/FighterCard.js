import { useState } from 'react';
import styles from './FighterCard.module.css'
function FighterCard(props){
return (
<div className={styles.flipcard}>
    <div className={styles.flipcardinner}>
    <div className={styles.flipcardfront}>
      <img className={styles.cardavatar} src="https://talksport.com/wp-content/uploads/sites/5/2022/08/RTRMADP_BOXING-KSI-WASSABI-PREVIEW_1053569507_UP1EI881AO0LS_2022-08-08T164802Zjpg-JS752386935.jpg?strip=all&quality=100&w=1920&h=1080&crop=1"
       alt="Avatar"/>
    </div>
    <div className={styles.flipcardback}>
      <h1>{props.fighter.name}</h1> 
      <h2>Record</h2>
      <p><b>Wins: </b>{props.fighter.boxingRecord.wins}</p> 
      <p><b>Draws: </b>{props.fighter.boxingRecord.draws}</p> 
      <p><b>Loses: </b>{props.fighter.boxingRecord.loses}</p> 
    </div>
  </div>
</div>
)
}

export default FighterCard;