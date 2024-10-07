const { exampleEvent } = require("./exampleEvents")

const handleEvents = (socket, io) => {
  exampleEvent(socket, io)
}

module.exports = { handleEvents }
