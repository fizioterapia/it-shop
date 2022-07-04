const express = require('express');
const router = express.Router();

router.get('/getItem/:itemId', async (req, res) => {
    res.json(await req.helpers.items.getItem(
        req.helpers.db,
        req.params.itemId
    ));
});

router.get('/getFeatured', async (req, res) => {
    res.json(await req.helpers.items.getFeatured(
        req.helpers.db
    ));
});

router.post('/addItem', async (req, res) => {
    res.json(await req.helpers.items.addItem(
        req.helpers.db,
        req.body,
        req.user
    ));
})

module.exports = router;