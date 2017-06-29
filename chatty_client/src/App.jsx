import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
import Navbar from './Navbar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: 'Bob' },
      messages: []
    };
    this.addNewMessage = this.addNewMessage.bind(this);
    this.socket = new WebSocket('ws://localhost:3001/');
  }

  // broadcastMessage(username, content) {
  //   this.socket.send(username, content);
  // }
  addNewMessage(username, content) {
    const newMessage = {username: username, content: content };    
    this.socket.send(JSON.stringify(newMessage))
  }

  componentDidMount() {
    this.socket.onopen = (e) => {
      console.log('connected to server');
    };
    this.socket.onmessage = (e) => {
    const newMessage = JSON.parse(e.data);
    const messages = this.state.messages.concat(newMessage);
    this.setState({ messages: messages })
    }
  }

  render() {
    return (
      <div>
        <ChatBar currentUser={this.state.currentUser} addNewMessage={this.addNewMessage} />
        <MessageList messages={this.state.messages} />
        <Navbar />
      </div>
    );
  }
}
export default App;
