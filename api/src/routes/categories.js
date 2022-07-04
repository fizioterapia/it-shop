const express = require('express');
const router = express.Router();

router.get('/getCategories', async (req, res) => {
    res.json(await req.helpers.category.getCategories(
        req.helpers.db
    ));
})

router.get('/getCategory/:categoryId', async (req, res) => {
    res.json(await req.helpers.category.getItems(
        req.helpers.db,
        req.params.categoryId
    ));
})

router.post('/addCategory', async (req, res) => {
    res.json(await req.helpers.category.addCategory(
        req.helpers.db,
        req.body,
        req.user
    ));
})

module.exports = router;