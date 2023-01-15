// console.log("Hello World")

const express = require("express")

const app = express();


app.get("/home", (req, res) => {
    console.log("hey this is home url");
})

app.listen("6900", () => {
    console.log("server is listening or backend is running")
})