const express = require('express');
const router = express.Router();

router.get('/getItem/:itemId', (req, res) => {
    res.json(req.helpers.response("error", "Not implemented"));
});

router.get('/getFeatured', (req, res) => {
    res.json(req.helpers.response("error", "Not implemented"));
});

router.post('/addItem', (req, res) => {
    res.json(req.helpers.response("error", "Not implemented"));
})

module.exports = router;