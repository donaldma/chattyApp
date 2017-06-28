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
      messages: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?",
          id: 0
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
          id: 1
        }
      ]
    };
    this.addNewMessage = this.addNewMessage.bind(this);
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = { id: 3, username: "Michelle", content: "Hello there!" };
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component. 
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({ messages: messages })
    }, 3000);
  }
  
  addNewMessage(username, content) {
    const newMessage = {id: Date.now(), username: username, content: content};
    console.log(newMessage)
    const messages = this.state.messages.concat(newMessage);
    this.setState({messages: messages})
  }
  render() {
    return (
      <div>
        <ChatBar currentUser={this.state.currentUser} addNewMessage={this.addNewMessage}/>
        <MessageList messages={this.state.messages} />
        <Navbar />
      </div>
    );
  }
}
export default App;
