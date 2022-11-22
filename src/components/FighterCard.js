import { useState } from 'react';
import styles from './FighterCard.module.css'
function FighterCard(props){

  const [isShown, setIsShown] = useState(false);
  const fadeScore = () =>{

  }

return (
/*
<div class="flip-card">
  <div class="flip-card-inner">
    <div class="flip-card-front">
      <img src="img_avatar.png" alt="Avatar" style="width:300px;height:300px;">
    </div>
    <div class="flip-card-back">
      <h1>John Doe</h1> 
      <p>Architect & Engineer</p> 
      <p>We love that guy</p>
    </div>
  </div>
</div>
*/
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
   /* <div className={styles.flip-card}>
      <img src="img_avatar.png" alt="Avatar" />
      <div className={styles.card.container}>
        <h4><b>{props.fighter.name}</b></h4> 
        <p>{props.fighter.boxingRecord.wins} - {props.fighter.boxingRecord.draws} - {props.fighter.boxingRecord.loses}</p> 
      </div>

        </div>*/
)
}

export default FighterCard;