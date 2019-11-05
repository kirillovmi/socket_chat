const status = document.getElementById("status");
const messages = document.getElementById("messages");
const form = document.getElementById("form");
const message = document.getElementById("message");


const ws = new WebSocket(location.origin.replace(/^http/, 'ws'));
//const ws = new WebSocket("ws://localhost:3000");

function setStatus(value) {
    status.innerHTML = value;
}

function printMessage(value) {
    const li = document.createElement("li");

    li.innerHTML = value;
    li.className = "list-group-item";

    messages.appendChild(li);
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    ws.send(message.value);
    message.value = "";
});

ws.onopen = () => setStatus("ONLINE");
ws.onclose = () => setStatus("DISCONNECTED");
ws.onmessage = (response) => printMessage(response.data);