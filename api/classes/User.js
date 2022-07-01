const { log } = require('console');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class User {
    constructor(db, token_secret) {
        this.db = db;
        this.secret = token_secret;
    }

    async hashPassword(password) {
        return new Promise((resolve, reject) => {
            bcrypt.genSalt(10, (err, salt) => {
                if (err) console.err(err);
                bcrypt.hash(password, salt, function(err, hash) {
                    if (err) console.error(err);
                    resolve({hash: hash, salt: salt});
                });
            })
        });
    }

    async comparePassword(password, hash) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, hash, function(err, result) {
                if (err) console.error(err);
                if (result) {
                   resolve(true);
               }
               reject(false);
            });
        })
    }

    createToken(data) {
        return jwt.sign(data, this.secret, { expiresIn: '1800s' });
    }

    async login(username, password) {
        try {
            if (!username || !password || typeof username != "string" || typeof password != "string") throw "Not valid parameters";
            const res = await this.db.query("SELECT password, admin FROM users WHERE `username` = ?", username);

            if(res.length > 0 && res[0].password) {
                if(await this.comparePassword(password, res[0].password)) {
                    return {token: this.createToken({username: username}), admin: res[0].admin};
                } else {
                    throw "Incorrect username or password";
                }
            } else {
                throw "Incorrect username or password";
            }
        } catch (e) {
            return {error: e};
        }
    }

    async register(username, password, email) {
        try {
            if (!username || !password || typeof username != "string" || typeof password != "string") throw "Not valid parameters";

            const res = await this.db.query("SELECT COUNT(*) FROM users WHERE `username` = ?", username);
            if (res[0][Object.keys(res[0])[0]] == 0) {
                const hashedPassword = await this.hashPassword(password);

                await this.db.query("INSERT INTO `users` (username, password, salt, email) VALUES(?,?,?,?)", username, hashedPassword.hash, hashedPassword.salt, email);
                return {token: this.createToken({username: username}), admin: false};
            } else {
                throw "This username is already taken."
            }

        } catch (e) {
            return {error: e};
        }
    }

    async retrieveData(token, username) {
        try {
            if (await this.validate(token) == false) throw "Contact administrator."
            if (await !username || username == "") throw "Contact administrator."

            const res = await this.db.query("SELECT email, firstName, lastName, phoneNumber, city, street, building FROM `users` WHERE `username` = ?", username);         
            
            return res[0];   
        } catch(e) {
            return {error: e};
        }
    }

    async updateData(req) {
        try {
            if (await this.validate(req.body.token) == false) throw "Contact administrator."
            if (!req.body.username || req.body.username == "") throw "Contact administrator."

            if (req.body.password) {
                const newPassword = await this.hashPassword(req.body.password);

                const res = await this.db.query(`
                    UPDATE users
                    SET password=?,
                    salt=?,
                    email=?,
                    firstName=?,
                    lastName=?,
                    phoneNumber=?,
                    city=?,
                    street=?,
                    building=?
                    WHERE username=?;
                `, newPassword.hash,
                newPassword.salt,
                req.body.email,
                req.body.firstName,
                req.body.lastName,
                req.body.phoneNumber,
                req.body.city,
                req.body.street,
                req.body.building,
                req.body.username);   
            } else {
                const res = await this.db.query(`
                    UPDATE users
                    SET email=?,
                    firstName=?,
                    lastName=?,
                    phoneNumber=?,
                    city=?,
                    street=?,
                    building=?
                    WHERE username=?;
                `, req.body.email,
                req.body.firstName,
                req.body.lastName,
                req.body.phoneNumber,
                req.body.city,
                req.body.street,
                req.body.building,
                req.body.username);  
            }
       
            return {success: "Account updated."};   
        } catch(e) {
            return {error: e};
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

    async checkout(body) {
        try {
            if (await this.validate(body.token) == false) throw "Contact administrator."
            if (!body.username || body.username == "") throw "Contact administrator."

            const data = JSON.stringify(body.items);

            body.items.forEach(async (elem) => {
                const res = await this.db.query("SELECT sold FROM products WHERE id = ?", elem.itemId);
                let sold = res[0].sold + elem.count;
                await this.db.query("UPDATE products SET sold = ? WHERE id = ?", sold, elem.itemId)
            })

            const res = await this.db.query("SELECT id FROM users WHERE `username` = ?", body.username);
            this.db.query("INSERT INTO orders(`order`, orderedBy) VALUES(?, ?)", data, res[0].id)

            return {success: "You bought the stuff!"}
        } catch(e) {
            return {error: e}
        }
    }

    async orders(body) {
        console.log(body)
        try {
            if (await this.validate(body.token) == false) throw "Contact administrator."
            if (!body.username || body.username == "") throw "Contact administrator."

            const res = await this.db.query("SELECT id FROM users WHERE `username` = ?", body.username);
            const items = await this.db.query("SELECT `order`, orderedAt FROM `orders` WHERE `orderedBy` = ?", res[0].id);

            console.log(items);

            return items;
        } catch(e) {
            return {error: e}
        }
    }
}

module.exports = User;