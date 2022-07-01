const CONFIG = require("./config/config.json");
const express = require("express");

const Database = require("./classes/Database.js");
const categories = require("./routes/categories.js");
const items = require("./routes/items.js");

const db = new Database(CONFIG.mysql);
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(async (req, res, next) => {
    req.db = db;
    next();
})

// Routes
app.use("/categories", categories);
app.use("/items", items);

// Wildcard
app.all("*", (req, res) => {
    res.status(401).send("Unauthorized");
})

// Listening
app.listen(CONFIG.app.port, async () => {
    await db.install();
    console.log(`App is listening on port: ${CONFIG.app.port}`);
})