const mysql2 = require("mysql2/promise");

class Database {
    constructor(config) {
        if (!config || typeof config != "object") {
            throw "Config is invalid!"
        }
        this.config = config;
    }

    async query(sql) {
        this.db = await mysql2.createConnection(this.config);
        const [rows, fields] = await this.db.execute(sql);
        await this.db.end();

        return rows;
    }

    async install() {
        let res;
        res = await this.query("SELECT count(*) FROM information_schema.TABLES WHERE TABLE_NAME = 'categories' AND TABLE_SCHEMA in (SELECT DATABASE());");

        // Result[index][keyName = count(*)] == 0 (which means that doesn't exist);
        if (res[0][Object.keys(res[0])[0]] == 0) {
            await this.query(`CREATE TABLE categories (
                id int(11) auto_increment NOT NULL,
                name varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
                creation_date varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'unix_timestamp()' NOT NULL,
                CONSTRAINT \`PRIMARY\` PRIMARY KEY (id)
            )
            ENGINE=InnoDB
            DEFAULT CHARSET=utf8mb4
            COLLATE=utf8mb4_unicode_ci
            COMMENT='';`);
        }

        res = await this.query("SELECT count(*) FROM information_schema.TABLES WHERE TABLE_NAME = 'products' AND TABLE_SCHEMA in (SELECT DATABASE());");

        // Result[index][keyName = count(*)] == 0 (which means that doesn't exist);
        if (res[0][Object.keys(res[0])[0]] == 0) {
            await this.query(`CREATE TABLE products (
                id int(11) auto_increment NOT NULL,
                name varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
                price float NOT NULL,
                description varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL NULL,
                image varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL NULL,
                categoryId int(11) NOT NULL,
                CONSTRAINT \`PRIMARY\` PRIMARY KEY (id)
            )
            ENGINE=InnoDB
            DEFAULT CHARSET=utf8mb4
            COLLATE=utf8mb4_unicode_ci
            COMMENT='';
            `);
        }
    }
}

module.exports = Database;