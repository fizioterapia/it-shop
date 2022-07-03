const CONFIG = require("./config/config.json");
const { exit } = require("process");

const express = require("express");
const cors = require('cors');
const fileUpload = require('express-fileupload');

const categories = require('./src/routes/categories');
const items = require('./src/routes/items');
const user = require('./src/routes/user');

const DB = require("./src/classes/Database");
let dbInstance;

try {
    dbInstance = new DB(CONFIG.mysql.host, CONFIG.mysql.user, CONFIG.mysql.password, CONFIG.mysql.database);
} catch(e) {
    console.error(e);
    exit(1);
}

const User = require("./src/classes/User");
const userInstance = new User(dbInstance, CONFIG.app.token_secret);

const response = require("./src/helpers/createResponse");

const app = express();

// Middleware
app.use(cors());
app.use(fileUpload());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/public', express.static('public'));

app.use(async (req, res, next) => {
    req.helpers = {
        db: dbInstance,
        user: userInstance,
        response: response
    }

    next();
})

app.use('/categories', categories);
app.use('/items', items);
app.use('/user', user);

// Wildcard
app.all("*", (req, res) => {
    res.status(401).json(
        response("error", "Unauthorized")
    );
})

app.listen(CONFIG.app.port, () => {
    console.log(`API is listening on port: ${CONFIG.app.port}`);
});