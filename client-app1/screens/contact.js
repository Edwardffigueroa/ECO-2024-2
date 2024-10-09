import { router, socket } from "../routes.js";

export default function renderContact() {
  const app = document.getElementById("app");
  app.innerHTML = `
        <h1>Contact Page</h1>
        <p>This is the Contact page.</p>
        <button id="emitButton">Emit Event</button>
        <button id="goToHome">Go to Home</button>
    `;

  document.getElementById("emitButton").addEventListener("click", () => {
    socket.emit("contactEvent", { message: "Hello from Contact page" });
  });

  document.getElementById("goToHome").addEventListener("click", () => {
    router.navigateTo("/");
  });

  socket.on("contactResponse", (data) => {
    console.log("Received from server:", data);
  });

//   fetch("/api/contactData")
//     .then((response) => response.json())
//     .then((data) => {
//       console.log("Contact data:", data);
//     });
}

renderContact();
