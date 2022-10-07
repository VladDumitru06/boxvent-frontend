import React, { useState, useEffect } from "react";
import axios from 'axios';
import FighterList from '../components/FighterList';
function FighterPage(){

    const [fighters, setFighters] = useState();
    let fightersExist = false;
    const fetchFighters = async () => {  
        const fighters = await axios(
            'http://localhost:8080/fighters',
          );
          const nameObject = fighters.data.fighters;
         setFighters(nameObject);
        
    }
    if(fighters)
    {
        if(!(Object.keys(fighters).length === 0))
        {
            fightersExist = true;
        }
    }
    else
    {
           fightersExist = false;
    }
    useEffect(() => {
        fetchFighters();
    }, []);
  

    function ShowFighters(){
        return(
            <FighterList fighters={fighters}/>
        )
    }
    function NoFighters(){
        return(
            <h1>No fighters currently registered</h1>
        )
    }
    if(fightersExist){
        return <ShowFighters/>
    }
    else{
        return <NoFighters/>
    }

}
export default FighterPage;

