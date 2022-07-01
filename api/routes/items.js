const express = require('express')
const router = express.Router()

router.get('/:itemID', async (req, res) => {
    try {
        if (Number.isNaN(req.params.itemID)) throw "Invalid number";

        let rows = await req.db.query("SELECT * from products where `id` = ?", req.params.itemID);
        res.json(rows);
    } catch (e) {
        res.json({error: "Not a number!"});
    }
})

module.exports = router;
