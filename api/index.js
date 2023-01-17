const express = require("express")
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
mongoose.set('strictQuery', true);

mongoose.connect('mongodb://127.0.0.1:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true
}).then(console.log("Connected to MongoDB")).catch(err => console.log(err))

// console.log(process.env["MONGO_URL"]);

dotenv.config();

app.get("/home", (req, res) => {
    console.log("hey this is home url");
})

app.listen("6900", () => {
    console.log("server is listening or backend is running")
})