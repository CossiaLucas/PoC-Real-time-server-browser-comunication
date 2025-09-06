const timeElement = document.getElementById('hora');

const timeEventSource = new EventSource('http://localhost:3000/CurrentTime');


timeEventSource.onmessage = (event) => {
    console.log(event);
    timeElement.innerText = event.data;
};


//timeEventSource.addEventListener("message", (event) => {
//    timeElement.innerText = event.data;
//});
//
//timeEventSource.addEventListener("color", (event) => {
//    timeElement.style.color = event.data;
//});