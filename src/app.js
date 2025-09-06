import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const colors = ["red", "green", "blue", "yellow", "pink", "purple"];


app.get("/currentTime", (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();

    const intervalId = setInterval(() => {
        res.write(`data: ${new Date().toLocaleTimeString()}\n\n`);
        res.write(`event: color\ndata: ${getRandomColor()}\n\n`);
    }, 1000);

    res.on("close", () => {
        clearInterval(intervalId);
    });
});

const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
};

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});