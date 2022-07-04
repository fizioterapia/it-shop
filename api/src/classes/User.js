const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const response = require("../helpers/createResponse");

class User {
    constructor(dbInstance, secret) {
        this.db = dbInstance;
        this.secret = secret;
    }

    async hashPassword(password) {
        try {
            return new Promise((resolve, reject) => {
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) throw err;
                    bcrypt.hash(password, salt, function(err, hash) {
                        if (err) throw err;
                        resolve({hash: hash, salt: salt});
                    });
                })
            });
        } catch(e) {
            return response("error", e);
        }
    }

    async comparePassword(password, hash) {
        try {
            return new Promise((resolve, reject) => {
                bcrypt.compare(password, hash, function(err, result) {
                    if (err) throw err;
                    if (result) {
                    resolve(true);
                }
                reject(response("error", "Invalid password."));
                });
            })
        } catch(e) {
            return response("error", e);
        }
    }

    generateToken(data) {
        try {
            return response("success", jwt.sign(data, this.secret, { expiresIn: '1800s' }));
        } catch(e) {
            return response("error", e);
        }
    }

    async validate(token) {
        if (!token || token == "") return false;

        return new Promise((resolve, reject) => {
            jwt.verify(token, this.secret, (err, user) => {       
                if (err) return reject(false);
            
                resolve(user);
            })
        });
    }

    async login(username, password) {
        try {
            if (!username || !password || typeof username != "string" || typeof password != "string")
                throw "Not valid parameters";

            const query = await this.db.query("SELECT id, password, admin FROM users WHERE `username` = ?", username);
            let results = query.rows[0];

            if((results.length > 0 && results.password) || await !this.comparePassword(password, results.password))
                throw "Incorrect username or password";

            return response("success", {token: this.createToken({username: username, id: results.id}), admin: results.admin});

        } catch (e) {
            return response("error", e);
        }
    }

    async register(username, email, password) {
        try {
            if (!username || !password || typeof username != "string" || typeof password != "string")
                throw "Not valid parameters";

            let query = await this.db.query("SELECT COUNT(*) as count FROM users WHERE `username` = ?", username);
            let results = query.rows[0];

            if (results.count > 0)
                throw "This username is already taken."
            
            const hashedPassword = await this.hashPassword(password);

            await this.db.query("INSERT INTO `users` (username, password, salt, email) VALUES(?,?,?,?);", username, hashedPassword.hash, hashedPassword.salt, email);
            query = await this.db.query("SELECT id from `users` WHERE username = ?", username);
            results = query.rows[0];
            
            return response("success", {token: this.createToken({username: username, id: results.id}), admin: false});
            

        } catch (e) {
            return response("error", e);
        }
    }

    async retrieveData(user) {
        try {
            if (!user || !user.id)
                throw "Unauthorized"

            const query = await this.db.query("SELECT email, firstName, lastName, phoneNumber, city, street, building FROM `users` WHERE `id` = ?", id);         
            const results = query.rows[0];

            return response("success", results);
        } catch(e) {
            return response("error", e);
        }
    }

    async updateData(user, body) {
        try {
            if (!user || !user.id)
                throw "Unauthorized"

            throw "Not implemented yet..."
        } catch(e) {
            return response("error", e);
        }
    }

    async getOrder(user, id) {
        try {
            if (!user || !user.id)
                throw "Unauthorized"

            const query = await this.db.query("SELECT `order`, orderedAt FROM `orders` WHERE `orderedBy` = ? AND `id` = ?", req.user.id, id);
            const items = query.rows[0];

            return response("success", items);
        } catch(e) {
            return response("error", e);
        }
    }

    async getOrders(user) {
        try {
            if (!user || !user.id)
                throw "Unauthorized"

            const query = await this.db.query("SELECT `order`, orderedAt FROM `orders` WHERE `orderedBy` = ?", req.user.id);
            const items = query.rows;

            return response("success", items);
        } catch(e) {
            return response("error", e);
        }
    }

    async checkout(user) {
        try {
            if (!user || !user.id)
                throw "Unauthorized"

            const data = JSON.stringify(body.items);

            body.items.forEach(async (elem) => {
                const query = await this.db.query("SELECT sold FROM products WHERE id = ?", elem.itemId);
                const results = query.rows[0];

                let sold = results.sold + elem.count;
                await this.db.query("UPDATE products SET sold = ? WHERE id = ?", sold, elem.itemId)
            }) 

            this.db.query("INSERT INTO orders(`order`, orderedBy) VALUES(?, ?)", data, req.user.id)

            return {success: "You have purchased items in your cart!"}
        } catch(e) {
            return response("error", e);
        }
    }
}

module.exports = User;