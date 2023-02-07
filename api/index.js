const express = require("express")
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const authRoute = require("./routes/auth")
const usersRoute = require("./routes/users")
const postRoute = require("./routes/posts")
app.use(express.json());

const mongoose = require("mongoose");
mongoose.set('strictQuery', true);

// console.log(process.env.Mongo_url);

mongoose.connect(`${process.env.Mongo_url}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true
}).then(console.log("Connected to MongoDB")).catch(err => console.log(err))

app.use("/api/auth", authRoute)
app.use("/api/users", usersRoute)
app.use("/api/posts", postRoute)
// console.log(process.env["MONGO_URL"]);

dotenv.config();

app.get("/home", (req, res) => {
    console.log("hey this is home url");
})

app.listen("6900", () => {
    console.log("server is listening or backend is running")
})