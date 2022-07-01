const express = require('express')
const router = express.Router()

router.get('/:itemID', async (req, res) => {
    let rows = await req.db.query(`SELECT * from products where id = ${req.params.itemID}`);
    res.json(rows);
})

module.exports = router;
