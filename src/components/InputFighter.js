import React, { useState } from "react";
import FighterAPI from "../apis/FighterAPI";

function InputFighter(){


    const [fighterData, setFighter] = useState();

    const handleNameChange = event => {
        setFighter(fighterData => ({
            ...fighterData,
            name: event.target.value
         }));
      }

      const handleWinsChange = event => {
          setFighter(fighterData => ({
              ...fighterData,
              wins: event.target.value
           }));
        }

        const handleDrawsChange = event => {
            setFighter(fighterData => ({
                ...fighterData,
                draws: event.target.value
             }));
          }

          const handleLosesChange = event => {
              setFighter(fighterData => ({
                  ...fighterData,
                  loses: event.target.value
               }));
            }
    const handleSubmit = e => {

        e.preventDefault();
        FighterAPI.createFighter(fighterData)
        .then(response =>{
            console.log(response);
            console.log(response.data);
        })
    }
    return (
        <form 
            onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Fighter Name"
                onChange={handleNameChange}
            />
                        <input
                type="text"
                placeholder="Wins"
                onChange={handleWinsChange}
            />
                        <input
                type="text"
                placeholder="Draws"
                onChange={handleDrawsChange}
            />
                        <input
                type="text"
                placeholder="Loses"
                onChange={handleLosesChange}
            />
            <button className="input-submit">Submit</button>
        </form>
    )
}
export default InputFighter;