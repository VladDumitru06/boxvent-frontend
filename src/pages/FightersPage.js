import React, { useState, useEffect } from "react";
import FighterList from '../components/Fighter/FighterList';
import FighterAPI from "../apis/FighterAPI";
function FighterPage(){

    const [fighters, setFighters] = useState([]);
    let fightersExist = false;
    const fetchFighters = async () => {  
        FighterAPI.getFighters()
                    .then(response =>{
                        setFighters(response.data.fighters);
                    })
        
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

