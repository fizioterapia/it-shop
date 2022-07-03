const express = require('express');
const router = express.Router();

router.get('/getCategories', async (req, res) => {
    res.json(req.helpers.response("error", "Not implemented"));
})

router.get('/getCategory/:categoryId', async (req, res) => {
    res.json(req.helpers.response("error", "Not implemented"));
})

router.post('/addCategory', async (req, res) => {
    res.json(req.helpers.response("error", "Not implemented"));
})

module.exports = router;