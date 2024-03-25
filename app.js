const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dbConnect = require("./db");
require("dotenv").config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api/user/", require("./Routes/user"));
app.get("/", (req, res) => {
    res.send("Hello World");
});

const start = async () => {
    await dbConnect(MONGO_URI);
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
};

start();
