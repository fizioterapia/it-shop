const express = require('express');
const router = express.Router();

router.use(async (req, res, next) => {
    // Validate JWT

    next();
});

router.post("/login", async (req, res) => {
    res.json(req.helpers.response("error", "Not implemented"));
});

router.post("/register", async (req, res) => {
    res.json(req.helpers.response("error", "Not implemented"));
});

router.get("/getData", async (req, res) => {
    res.json(req.helpers.response("error", "Not implemented"));
});

router.post("/updateData", async (req, res) => {
    res.json(req.helpers.response("error", "Not implemented"));
});

router.get("/getOrders", async (req, res) => {
    res.json(req.helpers.response("error", "Not implemented"));
});

router.get("/getOrder/:orderId", async (req, res) => {
    res.json(req.helpers.response("error", "Not implemented"));
});

router.post("/checkout", async (req, res) => {
    res.json(req.helpers.response("error", "Not implemented"));
});

module.exports = router;