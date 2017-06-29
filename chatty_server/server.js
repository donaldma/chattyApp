const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();

const server = http.createServer(app);
const wss = new WebSocket.Server({server});

const uuidv1 = require('uuid/v1');

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
      client.send(data);
      console.log('socket open');
  })
}

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    const incomingMessage = JSON.parse(message);
    const newMessage = {
      id: uuidv1(),
      username: incomingMessage.username,
      content: incomingMessage.content
    };
    wss.broadcast(JSON.stringify(newMessage))
  })
  ws.on('close', () => console.log('Client disconnected'));
});

server.listen(3001, function listening() {
  console.log('Listening on %d', server.address().port);
});