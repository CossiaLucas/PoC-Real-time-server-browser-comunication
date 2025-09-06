const timeElement = document.getElementById("hora");

const timeEventSource = new EventSource("http://localhost:3000/currentTime");

timeEventSource.addEventListener("message", (event) => {
  timeElement.innerText = event.data;
});

