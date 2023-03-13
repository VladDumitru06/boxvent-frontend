import { useEffect, useState } from 'react';
import { Button, ToastContainer } from 'react-bootstrap';
import Popup from 'reactjs-popup';
import ImageAPI from '../../apis/ImageAPI';
import GetRole from '../GetRole';
import EditFighter from './EditFighter';
import styles from './FighterCard.module.css'
import Notification from '../Notification';
import ReactConfirmAlert from 'react-confirm-alert';
import FighterAPI from '../../apis/FighterAPI';
function FighterCard(props) {
  const [imgUrl, setImgUrl] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  async function fetchImage() {
    setIsLoading(true);
    const response = await ImageAPI.getFighterImage(props);
    if (response.ok) {
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setImgUrl(url);
    } else {
      console.error('Failed to fetch image');
      setImgUrl(`${process.env.PUBLIC_URL}/assets/NoImg.png`);
    }
    setIsLoading(false);
  }

  useEffect(() => {

    fetchImage();
  }, []);
  return (
    <div className={styles.flipcard}>
      <ToastContainer />
      <div className={styles.flipcardinner}>
        <div className={styles.flipcardfront}>
          <img className={styles.cardavatar} src={isLoading ? `${process.env.PUBLIC_URL}/assets/Loading.gif` : imgUrl}
            alt="Avatar" />
        </div>
        <div className={styles.flipcardback}>
          <h1>{props.fighter.name}</h1>
          <h2>Record</h2>
          <p><b>Wins: </b>{props.fighter.boxingRecord.wins}</p>
          <p><b>Draws: </b>{props.fighter.boxingRecord.draws}</p>
          <p><b>Loses: </b>{props.fighter.boxingRecord.loses}</p>
          {
            GetRole().roles.includes("ADMIN") ? <Button variant="secondary" onClick={() => setIsEdit(!isEdit)}>Edit</Button> : null
          }
          {
            GetRole().roles.includes("ADMIN") ? <Button variant="danger" onClick={() => setIsConfirmed(!isEdit)}>Delete</Button> : null
          }
          {isConfirmed ? <ReactConfirmAlert
            message="Confirm?"
            buttons={[
              {
                label: 'Yes',
                onClick: async () => {
                  try {
                    const response = await FighterAPI.deleteFighter(props.fighter.id);
                    if (response.status === 200) {
                      props.removeFighter(props.fighter.id);

                    }
                  } catch (error) {
                    console.log(error);
                    Notification.Error("Failed to delete event");
                  }
                }
              },
              {
                label: 'No',
                onClick: () => setIsConfirmed(false)
              }
            ]}
          /> : null}
          <Popup
            open={isEdit}
            onOpen={() => setIsEdit(true)}
            onClose={() => setIsEdit(false)}
            modal
            closeOnDocumentClick
          >
            <span><EditFighter Notification={Notification} setImgUrl={(e) => setImgUrl(e)} setIsEdit={(e) => setIsEdit(e)} fighter={props.fighter} modifyFighter={(e) => props.modifyFighter(e)} />  </span>
          </Popup>
        </div>
      </div>
    </div>
  )
}

export default FighterCard;