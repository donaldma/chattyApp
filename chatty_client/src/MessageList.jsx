import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx'

class MessageList extends Component {
  render() {
    return (
    <main className="messages">
        {
          this.props.messages.map((message, i) => {
            if (message.type === 'incomingMessage'){
              return <Message key={i} username={message.username} content={message.content}/>
            }
            if (message.type === 'incomingNotification') {
              return <Notification key={i} newUser={message.newUser} oldUser={message.oldUser}/>
            }
          })
        }
    </main>
   );
  }
}
export default MessageList;