const express = require("express")
const app = express();
const dotenv = require("dotenv");
const multer = require("multer")
dotenv.config();

const authRoute = require("./routes/auth")
const usersRoute = require("./routes/users")
const postRoute = require("./routes/posts")
const catRoute = require("./routes/categories")
app.use(express.json());

const mongoose = require("mongoose");
const { json } = require("express");
mongoose.set('strictQuery', true);

// console.log(process.env.Mongo_url);

mongoose.connect(`${process.env.Mongo_url}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true
}).then(console.log("Connected to MongoDB")).catch(err => console.log(err))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images")
    }, filename: (req, file, cb) => {
        cb(null, "hello.jpeg");
    }
})

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded")
})

app.use("/api/auth", authRoute)
app.use("/api/users", usersRoute)
app.use("/api/posts", postRoute)
app.use("/api/categories", catRoute)
// console.log(process.env["MONGO_URL"]);

dotenv.config();

app.get("/home", (req, res) => {
    console.log("hey this is home url");
})

app.listen("6900", () => {
    console.log("server is listening or backend is running")
})