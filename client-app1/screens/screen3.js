import { router, socket } from "../routes.js";

export default function renderScreen3() {
  const app = document.getElementById("app");
  app.innerHTML = `
        <h1>Screen 3</h1>
        <p>This is the Screen 3</p>
        <button id="goToScreen1">Go to screen 1</button>
    `;

  document.getElementById("goToScreen1").addEventListener("click", () => {
    router.navigateTo("/");
    socket.emit("event2");
  });
}
