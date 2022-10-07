import React, { useState } from "react";
import axios from "axios";

function InputFighter(){

    const dummyFighter = {
        name: "Vlad the Boxer",
        record: " 10-40-0"
    };

    const [fighterData, setFighter] = useState(dummyFighter);

    const handleNameChange = event => {
        setFighter(fighterData => ({
            ...fighterData,
            name: event.target.value
         }));
      }

    const handleRecordChange = event => {
        setFighter(fighterData => ({
            ...fighterData,
            record: event.target.value
         }));
      }
    const handleSubmit = e => {

        e.preventDefault();

        axios.post(`http://localhost:8080/fighters`, fighterData )
            .then(res => {
                console.log(res);
                console.log(res.data);
      })
    }
    return (
        <form className="form-container"
            onSubmit={handleSubmit}>
            <input
                type="text"
                className="input-text"
                placeholder="Add item"
                onChange={handleNameChange}
            />
                        <input
                type="text"
                className="input-text"
                placeholder="Add Record"
                onChange={handleRecordChange}
            />
            <button className="input-submit">Submit</button>
        </form>
    )
}
export default InputFighter;