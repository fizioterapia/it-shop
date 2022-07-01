const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    try {
        let rows = await req.db.query("SELECT id, name from categories");
        res.json(rows);
    } catch(e) {
        console.error(e);
    }
})

router.get('/items/:categoryId', async (req, res) => {
    try {
        let rows = await req.db.query("SELECT products.* from products INNER JOIN categories ON products.categoryId = categories.id WHERE categories.id = ?", req.params.categoryId);
        res.json(rows);
    } catch(e) {
        console.error(e);
    }
})

router.post('/add', async (req, res) => {
    try {
        if (!req.body.token || !req.user.validate(req.body.token)) {
            res.json({error: 'Invalid token.'});
        }
        else if (!req.body.name) {
            res.json({error: 'Not all fields were filled'});
        } else {
            await req.db.query("INSERT INTO categories (name) VALUES(?)", req.body.name);
            res.json({success: `Category ${req.body.name} added!`}); 
        }
    } catch(e) {
        console.error(e);
    }
});

module.exports = router;
