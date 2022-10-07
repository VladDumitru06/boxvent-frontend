import styles from './FighterCard.module.css'
function FighterCard(props){
return (
    <div className={styles.card}>
      <img src="img_avatar.png" alt="Avatar" />
      <div className={styles.card.container}>
        <h4><b>{props.fighter.name}</b></h4> 
        <p>{props.fighter.record}</p> 
        </div>
        </div>
)
}

export default FighterCard;