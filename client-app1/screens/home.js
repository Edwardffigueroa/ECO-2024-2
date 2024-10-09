import { router, socket } from "../routes.js";

export default function renderHome() {
  const app = document.getElementById("app");
  app.innerHTML = `
        <h1>Home Page</h1>
        <p>Welcome to the Home page.</p>
        <button id="emitButton">Emit Event</button>
        <button id="goToAbout">Go to About</button>
    `;

  document.getElementById("emitButton").addEventListener("click", () => {
    socket.emit("homeEvent", { message: "Hello from Home page" });
  });

  document.getElementById("goToAbout").addEventListener("click", () => {
    router.navigateTo("/about");
  });

  socket.on("homeResponse", (data) => {
    console.log("Received from server:", data);
  });

//   fetch("/api/homeData")
//     .then((response) => response.json())
//     .then((data) => {
//       console.log("Home data:", data);
//     });
}

renderHome();
