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
            console.log(username, password);
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

    async register(data) {

    }

    validate(token) {

    }
}

module.exports = User;