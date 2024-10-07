const socket = io("http://localhost:5050", { path: "/real-time" });

// ------------- SOCKET LISTENERS ----------------

socket.on("event1", (data) => {
  console.log(data);
});

socket.on("event2", (data) => {});

socket.on("event3", (data) => {});

socket.on("event4", (data) => {});
