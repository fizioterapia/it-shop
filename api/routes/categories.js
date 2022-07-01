const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    let rows = await req.db.query("SELECT id, name from categories");
    res.json(rows);
})

router.get('/items/:categoryId', async (req, res) => {
    let rows = await req.db.query(`SELECT products.* from products INNER JOIN categories ON products.categoryId = categories.id WHERE categories.id = "${req.params.categoryId}"`);
    res.json(rows);
})

module.exports = router;