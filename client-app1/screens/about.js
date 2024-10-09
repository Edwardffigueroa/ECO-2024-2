import { router, socket } from "../routes.js";

export default function renderAbout() {
  const app = document.getElementById("app");
  app.innerHTML = `
        <h1>About Page</h1>
        <p>This is the About page.</p>
        <button id="emitButton">Emit Event</button>
        <button id="goToContact">Go to Contact</button>
    `;

  document.getElementById("emitButton").addEventListener("click", () => {
    console.log("emited");
    socket.emit("joinGame", { message: "Hello from About page" });
  });

  document.getElementById("goToContact").addEventListener("click", () => {
    router.navigateTo("/contact");
  });

  socket.on("aboutResponse", (data) => {
    console.log("Received from server:", data);
  });

  //   fetch("/api/aboutData")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("About data:", data);
  //     });
}

renderAbout();
