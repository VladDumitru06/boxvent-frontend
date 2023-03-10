

const config = {
  headers: {},
};

if (localStorage.getItem("JWT")) {
  config.headers.Authorization = `Bearer ${localStorage.getItem("JWT")}`;
}

const ImageAPI ={  getFighterImage:async (props) => await  fetch(`https://boxvent-backend.herokuapp.com/fighters/${props.fighter.id}/profilePic`, {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem("JWT")}`
  }
}),
getEventImage:async (props) => await  fetch(`https://boxvent-backend.herokuapp.com/events/${props.event.id}/eventPic`, {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem("JWT")}`
  }
})}
  
export default ImageAPI;
