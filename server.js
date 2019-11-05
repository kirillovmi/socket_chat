const express = require("express");
const WebSocket = require("ws");
const path = require("path");

const app = express();
const expressWs = require('express-ws')(app);

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/'));

let server = expressWs.getWss("/");

app.ws('/', function (ws, req) {
    ws.on("message", message => {
        if (message === 'exit') {
            ws.close()
        } else {
            server.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(message);
                }
            });
        }
    });
    ws.send("Welcome");
});

app.listen(port);