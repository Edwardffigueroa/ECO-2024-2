// eventsExampleHandlers.js

const { utilFuntion1, utilFuntion2 } = require("../utils/helpers");

// Assuming db and io are required or passed in some way to be accessible
const event1Handler = (socket, db, io) => {
  return () => {};
};

const event2Handler = (socket, db, io) => {
  return () => {};
};

module.exports = {
  event1Handler,
  event2Handler,
};
