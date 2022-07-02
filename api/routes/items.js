const express = require('express');
const router = express.Router()

router.get('/featured', async (req, res) => {
    console.log('a')
    try {
        let rows = await req.db.query("SELECT products.* from `products` WHERE sold > 0 ORDER BY sold DESC LIMIT 6");

        if (rows.length <= 0) {
            rows = await reg.db.query("SELECT products.* from `products` ORDER by price DESC LIMIT 6");
        }

        res.json(rows);
    } catch(e) {
        res.json({error: e})
    }
});

router.post('/add', async (req, res) => {
    try {
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
    } catch(e) {
        res.json({error: "Contact administrator."})
        console.error(e);
    }
});

router.get('/:itemID', async (req, res) => {
    try {
        if (Number.isNaN(req.params.itemID)) throw "Invalid number";

        let rows = await req.db.query("SELECT products.*, categories.name as categoryName from products INNER JOIN categories ON products.categoryId = categories.id WHERE products.id = ?", req.params.itemID)
        res.json(rows);
    } catch (e) {
        res.json({error: e});
    }
});

module.exports = router;
