import React, { useState } from 'react';
import { Form, FormControl, FormGroup, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function CardForm(props) {
  const [cardNumber, setCardNumber] = useState('');
  const [nameOfCard, setNameOfCard] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvc, setCvc] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // perform form submission here
    props.closeWindow();
  }

  const formatCardNumber = (e) => {
    console.log("A");
    let cardNumber = e.target.value;
    console.log(cardNumber);
    if(cardNumber.Length === 3  || cardNumber.Length === 8 || cardNumber.Length === 13){
      cardNumber += "-";
    }
    setCardNumber(cardNumber);

  }


  return (
      <>
          <title>Credit Card Payment</title>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" />
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
          <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
        
          <div className="container">
            <h2>Input Credit Card</h2>
            <Form>
              <FormGroup>
                <label>Card Number:</label>
                <FormControl 
                  type="text" 
                  placeholder="Enter card number" 
                  name="card-number"  
                  value="123-456-789-123-4567"
                  maxLength="16" 
                  required 
                  onChange={(e)=>formatCardNumber(e)} 
                />
              </FormGroup>
              <FormGroup>
                <label>Card Holder Name:</label>
                <FormControl 
                  type="text" 
                  placeholder="Enter card holder name" 
                  name="card-holder-name" 
                  value="Vlad Dumitru" 
                  required
                />
              </FormGroup>
              <FormGroup>
                <label>Expiration Date:</label>
                <FormControl 
                  type="text" 
                  placeholder="Enter expiration date (MM/YY)" 
                  name="expiry-date" 
                  pattern="[0-9]{2}/[0-9]{2}" 
                  maxLength="5" 
                  value="03/24"
                  required
                />
              </FormGroup>
              <FormGroup>
                <label>CVC:</label>
                <FormControl 
                  type="text" 
                  placeholder="Enter CVC" 
                  name="cvc" 
                  pattern="[0-9]{3}" 
                  maxLength="3" 
                  value="365" 
                  required
                />
              </FormGroup>
              <Button 
                type="submit" 
                onClick={()=>handleSubmit}
              >
                Submit
              </Button>
            </Form>
          </div>
        
      </>
  );
  
}

export default CardForm;
