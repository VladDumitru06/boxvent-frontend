import React, { useState, useEffect } from "react";
import FighterList from '../components/Fighter/FighterList';
import FighterAPI from "../apis/FighterAPI";
import { ToastContainer } from "react-bootstrap";
import Notification from "../components/Notification";

function FighterPage() {
  const [fighters, setFighters] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFighters = async () => {
    try {
      const response = await FighterAPI.getFighters();
      setFighters(response.data.fighters);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFighters();
  }, []);

  if (loading) {
    return (
      <div>
        <img
          src={`${process.env.PUBLIC_URL}/assets/loadingpage.gif`}
          alt="Loading"
        />
      </div>
    );
  }

  if (fighters.length === 0) {
    return <h1>No fighters currently registered</h1>;
  }

  return (
    <div>
      <ToastContainer />
      <FighterList
        fighters={fighters}
        setFighters={(fighters) => setFighters(fighters)}
        Notification={Notification}
      />
    </div>
  );
}

export default FighterPage;
