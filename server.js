const express = require("express");
const WebSocket = require("ws");
const path = require("path");

const serv = express()
    .use((req, res) => res.sendFile(path.join(__dirname, 'index.html')))
    .listen(process.env.PORT || 3000);

const server = new WebSocket.Server({ serv });

server.on("connection", (ws) => {
    ws.on("message", (message) => {
        server.clients.forEach(client => {
            if(client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
    ws.send("Welcome to chat");
});