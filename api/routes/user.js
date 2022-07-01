const { json } = require('body-parser');
const express = require('express')
const router = express.Router()

router.post("/getdata", async (req, res) => {
    try {
        res.json(await req.user.retrieveData(req.body.token, req.body.username));
    } catch(e) {
        res.json({error: "Contact administrator!"});
        console.error(e);
    }
})

router.post("/setdata", async (req, res) => {
    try {
        res.json(await req.user.updateData(req));
    } catch(e) {
        res.json({error: "Contact administrator!"});
        console.error(e);
    }
})

router.post("/login", async (req, res) => {
    try {
        res.json(await req.user.login(req.body.login, req.body.password));
    } catch(e) {
        res.json({error: "Contact administrator!"});
        console.error(e);
    }
});

router.post("/register", async (req, res) => {
    try {
        res.json(await req.user.register(req.body.login, req.body.password, req.body.email));
    } catch(e) {
        res.json({error: "Contact administrator!"});
        console.error(e);
    }
});

router.post("/validate", async (req, res) => {
    try {
        res.json(await req.user.validate(req.body.token));
    } catch(e) {
        res.json({error: "Contact administrator!"});
        console.error(e);
    }
})

module.exports = router;
