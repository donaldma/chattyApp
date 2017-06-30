import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
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
    this.userNotification = this.userNotification.bind(this);
    this.socket = new WebSocket('ws://localhost:3001/');
  }


  addNewMessage(username, content) {
    const newMessage = { type: "postMessage", username: username, content: content };
    this.socket.send(JSON.stringify(newMessage))
  }

  userNotification(newUser) {
    const notification = { type: "postNotification", oldUser: this.state.currentUser.name, newUser: newUser };
    this.setState({currentUser:{name: newUser}})
    this.socket.send(JSON.stringify(notification))
  }

  componentDidMount() {
    this.socket.onopen = (e) => {
      console.log('Connected to server');
    };
    this.socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      switch (data.type) {
        case "incomingMessage":
          // console.log(data)
          const messages = this.state.messages.concat(data);
          this.setState({ messages: messages })
          break;
        case "incomingNotification":
          const notifications = this.state.messages.concat(data);
          console.log('it works')
          this.setState({ messages: notifications })
          break;
        default:
          throw new Error("Unknown event type " + data.type);
      }
    };
  };
  
  componentDidUpdate() {
    window.scrollTo(0, document.querySelector(".messages").scrollHeight);
  }

  render() {
    return (
      <div>
        <ChatBar currentUser={this.state.currentUser} addNewMessage={this.addNewMessage} userNotification={this.userNotification} />
        <MessageList messages={this.state.messages} />
        <Navbar />
      </div>
    );
  }
}
export default App;
