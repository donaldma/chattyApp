import React, { Component } from 'react';

class Notification extends Component {
  render() {
    return (
      <div className="message system">
        <span>{this.props.oldUser} changed their name to {this.props.newUser}</span>
      </div>
    );
  }
}
export default Notification;