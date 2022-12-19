import ChatMessagesPlaceholder from "./ChatMessagesPlaceHolder";
import SendMessagePlaceholder from "./SendMessagePlaceholder";
function ChatWindow(props) {
    return (
        <div >
          <SendMessagePlaceholder username={props.username} onMessageSend={props.sendMessage} />
          <br></br>
          <ChatMessagesPlaceholder username={props.username} messagesReceived={props.messagesReceived} messagesSent={props.messagesSent} />
        </div>
      );
}

export default ChatWindow;