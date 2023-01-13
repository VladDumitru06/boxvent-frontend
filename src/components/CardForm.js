import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
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
      <head>
        <title>Bootstrap Example</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" />
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
      </head>
      <body>
        <div class="container">
          <h2>Input Credit Card</h2>
          <form action="/action_page.php">
            <div class="form-group">
              <label for="card-number">Card Number:</label>
              <input type="text" class="form-control" id="card-number" placeholder="Enter card number" name="card-number"  value="123-456-789-123-4567"maxlength="16" required onChange={(e)=>formatCardNumber(e)} />
            </div>
            <div class="form-group">
              <label for="card-holder-name">Card Holder Name:</label>
              <input type="text" class="form-control" id="card-holder-name" placeholder="Enter card holder name" name="card-holder-name" value="Vlad Dumitru" required/>
</div>
<div class="form-group">
<label for="expiry-date">Expiration Date:</label>
<input type="text" class="form-control" id="expiry-date" placeholder="Enter expiration date (MM/YY)" name="expiry-date" pattern="[0-9]{2}/[0-9]{2}" maxlength="5" value="03/24"required/>
</div>
<div class="form-group">
<label for="cvc">CVC:</label>
<input type="text" class="form-control" id="cvc" placeholder="Enter CVC" name="cvc" pattern="[0-9]{3}" maxlength="3" value="365" required/>
</div>
<Button type="submit" class="btn btn-default" onClick={()=>handleSubmit}>Submit</Button>
</form>
</div>
</body>
</>
);
}

export default CardForm;
