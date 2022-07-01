const { log } = require('console');
const express = require('express');
const { send } = require('process');
const router = express.Router()

router.get('/:itemID', async (req, res) => {
    try {
        if (Number.isNaN(req.params.itemID)) throw "Invalid number";

        let rows = await req.db.query("SELECT products.*, categories.name as categoryName from products INNER JOIN categories ON products.categoryId = categories.id WHERE products.id = ?", req.params.itemID)
        res.json(rows);
    } catch (e) {
        res.json({error: "Not a number!"});
    }
});

router.post('/add', async (req, res) => {
    if (!req.body.token || !req.user.validate(req.body.token)) {
        res.json({error: 'Invalid token.'});
    } else if (!req.body.name || !req.body.price) {
        res.json({error: 'Not all fields were filled'});
    } else {
        let imagePath = null;
        if (req.files) {
            let photo = req.files.photo;
            imagePath = `./public/assets/images/${photo.name}`

            photo.mv(imagePath);
        }

        await req.db.query("INSERT INTO products (name, price, description, image, categoryId) VALUES(?,?,?,?,?)",
        req.body.name,
        req.body.price,
        req.body.desc,
        imagePath,
        req.body.category);

        res.json({success: `Product ${req.body.name} added!`}); 
    }
});

module.exports = router;
