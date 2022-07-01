const jwt = require('jsonwebtoken');

class User {
    constructor(db, token_secret) {
        this.db = db;
        this.secret = token_secret;
    }

    createToken(data) {
        return jwt.sign(data, this.secret, { expiresIn: '1800s' });
    }

    async login(username, password) {
        try {
            if (!username || !password || typeof username != "string" || typeof password != "string") throw "Not valid parameters";

            const res = await this.db.query("SELECT count(*) FROM users WHERE `username` = ? AND `password` = ?", username, password);
            if (res[0][Object.keys(res[0])[0]] > 0) {
                return {token: this.createToken({username: username})};
            } else {
                throw "Incorrect username or password";
            }
        } catch (e) {
            console.log(e);
            return {error: e};
        }
    }

    async register(username, password) {
        try {
            console.log(username, password);
            if (!username || !password || typeof username != "string" || typeof password != "string") throw "Not valid parameters";

            const res = await this.db.query("SELECT COUNT(*) FROM users WHERE `username` = ?", username);
            console.log(res[0][Object.keys(res[0])[0]]);
            if (res[0][Object.keys(res[0])[0]] == 0) {
                await this.db.query("INSERT INTO `users` (username, password) VALUES(?,?)", username, password);
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
        return Promise((resolve, reject) => {
            jwt.verify(token, CONFIG.token_secret, (err, user) => {       
                if (err) return reject(false);
            
                resolve(true);
            })
        });
    }
}

module.exports = User;