import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const colors = ["red", "green", "blue", "yellow", "pink", "purple"];

app.get("/currentTime", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); 
  res.setHeader("Content-Type", "text/event-stream"); // Esto le indica a la pagina que es un flujo de eventos del servidor
  res.setHeader("Cache-Control", "no-cache"); // Esto evita que se almacene caché
  res.setHeader("Connection", "keep-alive"); // Esto mantiene la conexión abierta
  res.flushHeaders();

  const intervalId = setInterval(() => {
    res.write(`data: ${new Date().toLocaleTimeString()}\n\n`);
  }, 1000);

  res.on("close", () => {
    clearInterval(intervalId);
    res.end();
  });
});

app.listen(3000, () => {
  console.log("server is running on port http://localhost:3000");
});