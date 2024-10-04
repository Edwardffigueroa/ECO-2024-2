const express = require("express");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express(); // Creates HTTP server
app.use(express.json()); // utility to process JSON in requests
app.use(cors()); // utility to allow clients to make requests from other hosts or ips

const httpServer = createServer(app); // Explicity creates an HTTP server from the Express app

const io = new Server(httpServer, {
  path: "/real-time",
  cors: {
    origin: "*", // Allow requests from any origin
  },
}); // Creates a WebSocket server, using the same HTTP server as the Express app and listening on the /real-time path

const db = {
  players: [],
};

app.get("/hola", (request, response) => {
  response.send(db);
});

app.post("/potenciometro", (request, response) => {
  const { body } = request;
  console.log("potValue", body);
  response.status(201).send(body); // We return the same object received and also I send a code 201 which means an object was created
  //io.emit("potValue", body.value); // I can emit events to all connected clients from a single endpoint
});

app.post("/button", (request, response) => {
  const { body } = request;
  console.log("button", body);
  response.status(201).send(body); // We return the same object received and also I send a code 201 which means an object was created
});

io.on("connection", (socket) => {
  console.log("a user connected"); // This will be printed every time a client connects to the
  socket.on("message", (message) => {
    console.log(message);
    io.emit("chat-messages", message); // Broadcasts the message to all connected clients including the sender
    // socket.broadcast.emit("chat-messages", message); // Broadcasts the message to all connected clients except the sender
  });
});

httpServer.listen(5050, () => {
  // Starts the server on port 5050, same as before but now we are using the httpServer object
  console.log(`Server is running on http://localhost:${5050}`);
});
