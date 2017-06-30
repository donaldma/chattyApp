import React, {Component} from 'react';

class Navbar extends Component {
  render() {
    return (
    <nav className="navbar">
     <a href="/" className="navbar-brand">Chatty</a>
     <h2 className="count">{this.props.count} Users online</h2>
    </nav>
   );
  }
}
export default Navbar;