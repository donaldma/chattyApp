import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
import Navbar from './Navbar.jsx';

class App extends Component {
  render() {
    return (
      <div>
        <ChatBar />
        <Message />
        <MessageList />
        <Navbar />
      </div>
    );
  }
}
export default App;
