import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Navbar from './Navbar.jsx';

//sets intial states

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: 'Bob' },
      messages: [],
      usersCount: 0,
    };

// binds the functions addNewMessage and userNotification

    this.addNewMessage = this.addNewMessage.bind(this);
    this.userNotification = this.userNotification.bind(this);
    this.socket = new WebSocket('ws://localhost:3001/');
  }

//Add message function that sets the state and sends the message/username to the server from chat bar

  addNewMessage(username, content) {
    const newMessage = { type: "postMessage", username: username, content: content };
    if (this.state.currentUser.name !== username) {
      this.userNotification(username);
    }
    this.socket.send(JSON.stringify(newMessage))
  }

//User notification function that sets the state and sends the new user and old user to the server

  userNotification(newUser) {
    const notification = { type: "postNotification", oldUser: this.state.currentUser.name, newUser: newUser };
    this.setState({currentUser:{name: newUser}})
    this.socket.send(JSON.stringify(notification))
  }

//Handles the server -> client handshake

  componentDidMount() {
    this.socket.onopen = (e) => {
      console.log('Connected to server');
    };

//Handles the on message from the server and the different types of cases
    this.socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      switch (data.type) {
        case "incomingMessage":
          const messages = this.state.messages.concat(data);
          this.setState({ messages: messages })
          break;
        case "incomingNotification":
          const notifications = this.state.messages.concat(data);
          this.setState({ messages: notifications })
          break;
        case "userCount":
          const count = this.state.usersCount
          this.setState({count: data.count})
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
  
//includes the state to allow each component to use them 

      <div>
        <ChatBar currentUser={this.state.currentUser} addNewMessage={this.addNewMessage} userNotification={this.userNotification} />
        <MessageList messages={this.state.messages}/>
        <Navbar usersCount={this.state.usersCount} />
      </div>
    );
  }
}
export default App;
