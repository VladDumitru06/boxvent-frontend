import React, { useState, useEffect } from "react";
import FighterList from '../components/Fighter/FighterList';
import FighterAPI from "../apis/FighterAPI";
import { ToastContainer } from "react-bootstrap";
import Notification from "../components/Notification";
function FighterPage(){

    const [fighters, setFighters] = useState([]);
    const [tempFighters, setTempFighters] = useState([]);
    let fightersExist = false;
    const fetchFighters = async () => {  
        FighterAPI.getFighters()
                    .then(response =>{
                        if(response)
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
    }, [tempFighters]);
  

    function ShowFighters(){
        return(
            <div>
                <ToastContainer/>
            <FighterList fighters={fighters} setFighters={(fighters) =>setTempFighters(fighters)}Notification={Notification}/>
            </div>
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

