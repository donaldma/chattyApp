import React, { Component } from 'react';

class ChatBar extends Component {

//Handles the 'enter' key press for the messages 

  handleMessage = (event) => {
    const content = this.refs.content.value;
    const newUser = this.refs.username.value;
    if (event.key === 'Enter') {
      this.props.addNewMessage(newUser, content);
      this.refs.content.value = '';
    }
  }

//Handles the 'enter' key press for the users name change

  handleUser = (event) => {
    let content = this.refs.content.value;
    let newUser = this.refs.username.value;
    if (event.key === 'Enter') {
      this.props.userNotification(newUser);
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input ref="username" className="chatbar-username" placeholder={this.props.currentUser.name} defaultValue={this.props.currentUser.name} onKeyPress={this.handleUser} />
        <input ref="content" className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.handleMessage} />
      </footer>
    );
  }
}
export default ChatBar