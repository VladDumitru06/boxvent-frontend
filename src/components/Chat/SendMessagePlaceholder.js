import { useState } from "react";
import { Button } from "react-bootstrap";

const SendMessagePlaceholder = (props) => {
  const [message, setMessage] = useState('');
  if (!props.username) {
    return <></>;
  }

  const onMessageSend = () => {
    if (!message) {
      alert('Please type a message!');
    }
    else {
      props.onMessageSend({ 'text': message });
      setMessage('');
    }
  }

  const onSubmit = (event) => {
    event.preventDefault();
    onMessageSend();
  }

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor='message' style={{ marginRight :"10px", marginTop:"5px"}}>Message:</label>
      <input  id='message' type='text' onChange={(event) => setMessage(event.target.value)} value={message}></input>
      <Button style={{ marginLeft :"10px" ,marginBottom : "3px"}} size="sm" variant="secondary"onClick={onMessageSend}>Send</Button>
    </form>
  );
}

export default SendMessagePlaceholder;