const express = require('express')
const router = express.Router()

router.get('/:itemID', async (req, res) => {
    try {
        if (Number.isNaN(req.params.itemID)) throw "Invalid number";

        let rows = await req.db.query("SELECT products.*, categories.name as categoryName from products INNER JOIN categories ON products.categoryId = categories.id WHERE categories.id = ?", req.params.itemID)
        res.json(rows);
    } catch (e) {
        console.log(e);
        res.json({error: "Not a number!"});
    }
})

module.exports = router;
