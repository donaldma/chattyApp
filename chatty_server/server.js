const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();

const server = http.createServer(app);
const wss = new WebSocket.Server({
  server
});

const uuidv1 = require('uuid/v1');

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(data);
  })
}

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    const msgObj = JSON.parse(message);
    switch (msgObj.type) {
      case "postMessage":
        msgObj.type = "incomingMessage",
        msgObj.id = uuidv1(),
        console.log(msgObj)
        wss.broadcast(JSON.stringify(msgObj))
        break;
      case "postNotification":
        msgObj.type = "incomingNotification",
        msgObj.id = uuidv1(),        
        console.log(msgObj)
        wss.broadcast(JSON.stringify(msgObj));
        break;
      default:
        throw new Error("Unknown event type " + data.type);
    }
  })
  ws.on('close', () => console.log('Client disconnected'));
});

server.listen(3001, function listening() {
  console.log('Listening on %d', server.address().port);
});