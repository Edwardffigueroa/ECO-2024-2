const db = require("../db");
const { event1Handler, event2Handler} = require("../events-handlers/eventsExampleHandlers");

const exampleEvent = (socket, io) => {
  socket.on("event1", event1Handler(socket, db, io));
  socket.on("event2", event2Handler(socket, db, io));
};

module.exports = { exampleEvent };
