// import Router from "vanilla-router";
// import Router from "../node_modules/vanilla-router/dist/vanilla-router.min.js";
import socket from "./socket.js";

const router = new Router({
  mode: "hash",
  page404: (path) => {
    const app = document.getElementById("app");
    app.innerHTML = `<h1>404 - Not Found</h1><p>The page you are looking for does not exist.</p>`;
  },
});

async function loadScript(src) {
  const script = document.createElement("script");
  script.src = src;
  script.type = "module";
  document.body.appendChild(script);
}

function clearScripts() {
  const scripts = document.querySelectorAll('script[type="module"]');
  scripts.forEach((script) => script.remove());
}

router.add("/", async () => {
  clearScripts();
  await loadScript("./screens/home.js");
});

router.add("/about", async () => {
  clearScripts();
  await loadScript("./screens/about.js");
});

router.add("/contact", async () => {
  clearScripts();
  await loadScript("./screens/contact.js");
});

router.check().addUriListener();

export { router, socket };
