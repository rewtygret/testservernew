const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const hostname ='0.0.0.0';
const PORT = process.env.PORT || 2000;

// Serve a simple HTML page to test WebSocket connection
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// WebSocket server logic
wss.on('connection', (ws) => {
  console.log('Client connected');

  // Handle messages from clients
  ws.on('message', (message) => {
    console.log(`Received: ${message}`);

    // Broadcast the message to all connected clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  // Handle the WebSocket connection closing
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});


server.listen(PORT,hostname, () => {
  console.log(`Server is listening at http://${hostname}:${PORT}/`);
});
