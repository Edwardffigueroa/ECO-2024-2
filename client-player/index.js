document.getElementById("fetch-button").addEventListener("click", createUser);

async function createUser() {
  renderLoadingState();
  try {
    const player = {
      name: "Jonh Doe",
      profilePicture: "https://avatar.iran.liara.run/public/13", // if you want to generate random images for user profile go to this link: https://avatar-placeholder.iran.liara.run/
    };
    const response = await fetch("http://localhost:5050/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Specify the content type as JSON
      },
      body: JSON.stringify(player), // Convert the data to a JSON string
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    renderData();
  } catch (error) {
    renderErrorState();
  }
}

function renderErrorState() {
  const container = document.getElementById("data-container");
  container.innerHTML = ""; // Clear previous data
  container.innerHTML = "<p>Failed to load data</p>";
  console.log("Failed to load data");
}

function renderLoadingState() {
  const container = document.getElementById("data-container");
  container.innerHTML = ""; // Clear previous data
  container.innerHTML = "<p>Loading...</p>";
  console.log("Loading...");
}

function renderData(data) {
  const container = document.getElementById("data-container");
  container.innerHTML = ""; // Clear previous data
  const div = document.createElement("div");
  div.className = "item";
  div.innerHTML = "Player created";
  container.appendChild(div);
}
