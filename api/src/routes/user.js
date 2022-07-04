const express = require('express');
const router = express.Router();

router.post("/login", async (req, res) => {
    res.json(
        await req.helpers.user.login(
            req.body.username,
            req.body.password
        )
    );
});

router.post("/register", async (req, res) => {
    res.json(
        await req.helpers.user.login(
            req.body.username,
            req.body.email,
            req.body.password
        )
    );
});

router.get("/getData", async (req, res) => {
    res.json(
        await req.helpers.user.retrieveData(
            req.user
        )
    );
});

router.post("/updateData", async (req, res) => {
    res.json(
        await req.helpers.user.updateData(
            req.user,
            req.body
        )
    );
});

router.get("/getOrders", async (req, res) => {
    res.json(
        await req.helpers.user.getOrders(
            req.user
        )
    );
});

router.get("/getOrder/:orderId", async (req, res) => {
    res.json(
        await req.helpers.user.getOrder(
            req.user,
            req.params.orderId
        )
    );
});

router.post("/checkout", async (req, res) => {
    res.json(
        await req.helpers.user.checkout(
            req.user
        )
    );
});

module.exports = router;