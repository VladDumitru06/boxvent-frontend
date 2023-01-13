import { useEffect, useState } from 'react';
import ImageAPI from '../../apis/ImageAPI';
import styles from './FighterCard.module.css'
function FighterCard(props){
  const [imgUrl, setImgUrl] = useState(null);
  

  useEffect(() => {
    async function fetchImage() {
      const response = await ImageAPI(props);
      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setImgUrl(url);
      } else {
        console.error('Failed to fetch image');
      }
    }
    fetchImage();
  }, []);
return (
<div className={styles.flipcard}>
    <div className={styles.flipcardinner}>
    <div className={styles.flipcardfront}>
      <img className={styles.cardavatar} src={imgUrl}
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