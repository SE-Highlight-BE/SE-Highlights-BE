const express = require("express");
const app = express();
const port = 8080;

app.listen(port, () => {
    console.log("Successfully connect to server");
});

app.get("/", (request, response)=> {
    response.send("You are in 8080 port");
})