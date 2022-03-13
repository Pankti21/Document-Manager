const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

app.get('/', (req, res) => {
    res.send("Hello World");
});

// docker image rm -f cloud-crowd-backend
// docker build -t cloud-crowd-backend .
// docker rm -f f1abfa430df7
// docker run -d -p 8080:3001 --name cloud-crowd-backend cloud-crowd-backend

// installations

// eb cli
