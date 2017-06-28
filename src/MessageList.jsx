import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  ComponentDidMount(){
    console.log(this.props.messages);
  } 
  render() {
    return (
    <main className="messages">
        {
          this.props.messages.map((message, i) => {
          return <Message key={message.id} username={message.username} content={message.content}/>
          })
        }
      <div className="message system">
      </div>
    </main>
   );
  }
}
export default MessageList;