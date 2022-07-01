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
            const passwordSalt = await this.db.query("SELECT password FROM users WHERE `username` = ?", username);

            if(passwordSalt.length > 0 && passwordSalt[0].password) {
                if(await this.comparePassword(password, passwordSalt[0].password)) {
                    return {token: this.createToken({username: username})};
                } else {
                    throw "Incorrect username or password";
                }
            } else {
                throw "Incorrect username or password";
            }
        } catch (e) {
            console.log(e);
            return {error: e};
        }
    }

    async register(username, password, email) {
        try {
            console.log(username, password, email);
            if (!username || !password || typeof username != "string" || typeof password != "string") throw "Not valid parameters";

            const res = await this.db.query("SELECT COUNT(*) FROM users WHERE `username` = ?", username);
            console.log(res[0][Object.keys(res[0])[0]]);
            if (res[0][Object.keys(res[0])[0]] == 0) {
                const hashedPassword = await this.hashPassword(password);

                await this.db.query("INSERT INTO `users` (username, password, salt, email) VALUES(?,?,?,?)", username, hashedPassword.hash, hashedPassword.salt, email);
                return {token: this.createToken({username: username})};
            } else {
                throw "This username is already taken."
            }

        } catch (e) {
            console.log(e);
            return {error: e};
        }
    }

    async validate(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, CONFIG.token_secret, (err, user) => {       
                if (err) return reject(false);
            
                resolve(true);
            })
        });
    }
}

module.exports = User;