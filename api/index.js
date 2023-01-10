const express = require("express")
const app = express();
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const authRoute = require("./routes/auth")

app.use(express.json());

dotenv.config();
mongoose.set('strictQuery', true);
mongoose.connect(process.env["Mongo_url"], {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
})
    .then(console.log("connected to database"))
    .catch((err) => console.log(err))
console.log(process.env["Mongo_url"]);

// app.get
// console.log("fuck");

app.use("/api/auth", authRoute)

app.use("/home", (req, res) => {
    console.log("backend is running in home");
})

app.listen("5000", () => {
    console.log("Backend is running")
})