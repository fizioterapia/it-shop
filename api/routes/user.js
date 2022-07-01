const express = require('express')
const router = express.Router()

router.get("/test",  (req, res) => {
    res.send(`
        <form method="POST" action="login">
            <input name="login" type="text" />
            <input name="password" type="password" />
            <input type="submit" />
        </form>
    `)
});

router.post("/login", async (req, res) => {
    res.json(await req.user.login(req.body.login, req.body.password));
});

module.exports = router;
