import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.static(path.join(__dirname, 'public'))); //Conectamos a FrontEnd


app.get("/events", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); 
  res.setHeader("Content-Type", "text/event-stream"); // Esto le indica a la pagina que es un flujo de eventos del servidor
  res.setHeader("Cache-Control", "no-cache"); // Esto evita que se almacene caché
  res.setHeader("Connection", "keep-alive"); // Esto mantiene la conexión abierta
  res.flushHeaders();

  const sendTime = () => {
  const now = new Date().toISOString(); //Utilizamos ISO para tenes la zona horaria UTC
  res.write(`data: ${now}\n\n`);
  };

  sendTime();
  const iv = setInterval(sendTime, 1000); //Seteamos los intervalos 


  res.on("close", () => {
    clearInterval(iv); //Cierra la Conexion                                                                                                                  
    res.end(); 
  });                           
});
// Catch-all: sirve index.html para cualquier otra ruta (SPA support)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.listen(5500, () => {
  console.log("server is running on port http://localhost:5500");
})