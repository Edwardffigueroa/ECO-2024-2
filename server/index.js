const express = require("express");
const cors = require("cors");
const { createServer } = require("http");
const { SerialPort, ReadlineParser } = require("serialport");

// --------------- INITIAL CONFIG ---------------------

const app = express(); // Creates HTTP server
app.use(express.json()); // utility to process JSON in requests
app.use(cors()); // utility to allow clients to make requests from other hosts or ips
const httpServer = createServer(app); // Explicity creates an HTTP server from the Express app

SerialPort.list().then((ports) => console.log("ports", ports)); // this is for list all available devices connected
// create a port to listen and write
const port = new SerialPort({
  path: "/dev/tty.usbmodem14101",
  baudRate: 9600,
});

// Create a parser
const parser = new ReadlineParser({ delimiter: "\r\n" }); // apply the parser to our port
port.pipe(parser);

// --------------- SERIAL LISTENERS ---------------------

parser.on("data", (data) => {
  const dataPot = JSON.parse(data);
  console.log("Data flow:", dataPot); // get data from sensor
  //io.emit("porValue", dataPot); // I can emit in realtime to my frontend part the value
});

port.on("error", (err) => {
  console.log("Error:", err.message); // this is for get all buffer data to y app
});

// --------------- API ENDPOINTS ---------------------

app.post("/on", (request, response) => {
  port.write("ON\n", (err) => { // send a message to arduino
    if (err) {
      console.log("Error on write", err.message);
    }
    return true;
  });

  response.status(200).send("ok");
});

app.post("/off", (request, response) => {
  port.write("OFF\n", (err) => { // send a message to arduino
    if (err) {
      console.log("Error on write", err.message);
    }
    return true;
  });

  response.status(200).send("ok");
});

// --------------- START SERVER ---------------------

httpServer.listen(5050, () => {
  // Starts the server on port 5050
  console.log(`Server is running on http://localhost:${5050}`);
});
