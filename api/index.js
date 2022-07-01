const CONFIG = require("./config/config.json");
const express = require("express");
const cors = require('cors');

const categories = require("./routes/categories.js");
const items = require("./routes/items.js");
const user = require("./routes/user.js");

const Database = require("./classes/Database");
const User = require("./classes/User");

const DB = new Database(CONFIG.mysql);
const USER = new User(DB, CONFIG.app.token_secret);

const app = express();

// Middleware
app.use(cors());
app.use('/public', express.static('public'))
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(async (req, res, next) => {
    req.db = DB;
    req.user = USER;

    next();
})

// Routes
app.use("/categories", categories);
app.use("/items", items);
app.use("/user", user);

// Wildcard
app.all("*", (req, res) => {
    res.status(401).send("Unauthorized");
})

// Listening
app.listen(CONFIG.app.port, async () => {
    await DB.install();
    console.log(`App is listening on port: ${CONFIG.app.port}`);
})