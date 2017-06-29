import React, { Component } from 'react';

class ChatBar extends Component {
  handleKeyPress = (event) => {
    const user = this.refs.username.value;
    const content = this.refs.content.value;
    if (event.key === 'Enter') {
      this.props.addNewMessage(user, content);
      this.refs.content.value = '';
      this.refs.username.value = '';
    }
  }
  render() {
    return (
      <footer className="chatbar">
        <input ref="username" className="chatbar-username" placeholder={this.props.currentUser.name} />
        <input ref="content" className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.handleKeyPress} />
      </footer>
    );
  }
}
export default ChatBar