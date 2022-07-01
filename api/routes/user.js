const { json } = require('body-parser');
const express = require('express')
const router = express.Router()

router.post("/getdata", async (req, res) => {
    res.json(await req.user.retrieveData(req.body.token, req.body.username));
})

router.post("/setdata", async (req, res) => {
    res.json(await req.user.updateData(req));
})

router.post("/login", async (req, res) => {
    res.json(await req.user.login(req.body.login, req.body.password));
});

router.post("/register", async (req, res) => {
    res.json(await req.user.register(req.body.login, req.body.password, req.body.email));
});

router.post("/validate", async (req, res) => {
    res.json(await req.user.validate(req.body.token));
})

module.exports = router;
