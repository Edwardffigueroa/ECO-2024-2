document.getElementById("fetch-button").addEventListener("click", fetchData);

function fetchData() {
  // write your fetch here
}

function renderData(data) {
  const container = document.getElementById("data-container");
  container.innerHTML = ""; // Clear previous data

  const div = document.createElement("div");
  div.className = "item";
  div.innerHTML = ` <img src="${data?.message}" alt="Random Dog Image">`;
  container.appendChild(div);
}
