const express = require("express")
const cors = require("cors")
const { createServer } = require("http")
const { Server } = require("socket.io")

const app = express() // Creates HTTP server
app.use(express.json()) // utility to process JSON in requests
app.use(cors()) // utility to allow clients to make requests from other hosts or ips

const httpServer = createServer(app) // Explicity creates an HTTP server from the Express app

const io = new Server(httpServer, {
  path: "/real-time",
  cors: {
    origin: "*", // Allow requests from any origin
  },
}) // Creates a WebSocket server, using the same HTTP server as the Express app and listening on the /real-time path

const db = {
  players: [],
}

function assignRoles(players) {
  let shuffled = players.sort(() => 0.5 - Math.random())
  shuffled[0].role = "marco"
  shuffled[1].role = "polo-especial"
  for (let i = 2; i < shuffled.length; i++) {
    shuffled[i].role = "polo"
  }
  return shuffled
}

io.on("connection", (socket) => {
  // "joinGame" listerner
  socket.on("joinGame", (user) => {
    db.players.push({ id: socket.id, ...user })
    console.log(db.players)
    io.emit("userJoined", db) // Example: Broadcasts the message to all connected clients including the sender
  })

  // implement "startGame" listener
  socket.on("startGame", () => {
    db.players = assignRoles(db.players)

    db.players.forEach((element) => {
      io.to(element.id).emit("startGame", element.role)
    })
  })

  // implement "notifyMarco" listener
  socket.on("notifyMarco", () => {
    const rolesToNotify = db.players.filter(
      (user) => user.role === "polo" || user.role === "polo-especial"
    )

    rolesToNotify.forEach((element) => {
      io.to(element.id).emit("notification", {
        message: "Marco!!!",
        userId: socket.id,
      })
    })
  })

  // implement "notifyPolo" listener
  socket.on("notifyPolo", () => {
    const rolesToNotify = db.players.filter((user) => user.role === "marco")

    rolesToNotify.forEach((element) => {
      io.to(element.id).emit("notification", {
        message: "Polo!!",
        userId: socket.id,
      })
    })
  })

  // implement "onSelectPolo" listener
  socket.on("onSelectPolo", (userID) => {
    const myUser = db.players.find((user) => user.id === socket.id)
    const poloSelected = db.players.find((user) => user.id === userID)

    if (poloSelected.role === "polo-especial") {
      // Notify all players that the game is over
      db.players.forEach((element) => {
        io.to(element.id).emit("notifyGameOver", {
          message: `El marco ${myUser.nickname} ha ganado, ${poloSelected.nickname} ha sido capturado`,
        })
      })
    } else {
      db.players.forEach((element) => {
        io.to(element.id).emit("notifyGameOver", {
          message: `El marco ${myUser.nickname} ha perdido`,
        })
      })
    }
  })
})

httpServer.listen(5050, () => {
  // Starts the server on port 5050, same as before but now we are using the httpServer object
  console.log(`Server is running on http://localhost:${5050}`)
})
