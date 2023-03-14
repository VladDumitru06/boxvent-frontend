import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { v4 as uuidv4 } from 'uuid';
import GetRole from '../GetRole';
import ChatMessagesPlaceholder from './ChatMessagesPlaceHolder';
import SendMessagePlaceholder from './SendMessagePlaceholder';
import "./ChatHandler.module.css";
const ENDPOINT = "https://boxvent-backend.herokuapp.com/ws";

function ChatHandler(props) {

    const [stompClient, setStompClient] = useState();
    const [username, setUsername] = useState(GetRole().sub);
    const [messagesReceived, setMessagesReceived] = useState([]);


    useEffect(() => {
        const payload = { 'id': 1, 'from': "System", 'text': "Connection is being established, you will soon be able to chat with anyone checking out the event..." };
        setMessagesReceived(messagesReceived => [payload, ...messagesReceived]);
        // use SockJS as the websocket client
        const socket = SockJS(ENDPOINT);
        // Set stomp to use websockets
        const stompClient = Stomp.over(socket);
        // connect to the backend
        stompClient.connect({}, () => {
            // subscribe to the backend
        const payload = { 'id': 1, 'from': "System", 'text': "Connection has been established, you can now chat live with everyone. Anyone checking out the event will be able too see your messages, say hi!" };
        setMessagesReceived(messagesReceived => [payload, ...messagesReceived]);
            stompClient.subscribe(`/topic/event/${props.event.id}`, (data) => {
                console.log(data);
                onMessageReceived(data);
            });
        });
        // maintain the client for sending and receiving
        setStompClient(stompClient);
    }, []);

    // send the data using Stomp
    const sendMessage = (newMessage) => {
        const payload = { 'id': uuidv4(), 'from': username, 'to': newMessage.to, 'text': newMessage.text };
        stompClient.send(`/topic/event/${props.event.id}`, {}, JSON.stringify(payload));
        console.log("payload" + JSON.stringify(payload));
        setMessagesReceived(messagesReceived => [payload, ...messagesReceived]);

    };

    // display the received data
    const onMessageReceived = (data) => {
        const message = JSON.parse(data.body);
        const messageExists = messagesReceived.find(receivedMessage => receivedMessage.id === message.id);
        console.log("message" + JSON.stringify(message));
        if (messageExists) {
            console.log("Message already exists");
        } else {
            setMessagesReceived(messagesReceived => [message, ...messagesReceived]);
        }
    };



    return (
        <div style={{ position: "relative", backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white', overflow: "hidden", overflowWrap: "break-word", width: "100%", height: "300px" }}>
          <div style={{ overflow: "auto", height: "80%", padding: "10px", paddingBottom : "0px", display: "flex", flexDirection: "column-reverse", position: "relative", zIndex: "1" }}>
            <ChatMessagesPlaceholder username={username} messagesReceived={messagesReceived} />
          </div>
          <div style={{ position: "absolute", height: "15%", bottom: "0px", width: "100%", zIndex: "2" }}>
            <SendMessagePlaceholder username={username} onMessageSend={sendMessage} />
          </div>
        
        </div>
      );
      
}

export default ChatHandler;