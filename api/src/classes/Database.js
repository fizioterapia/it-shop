const mysql2 = require("mysql2/promise");
const response = require("../helpers/createResponse");

class Database {
    constructor(host, username, password, database) {
        if(!host || !username || !password || !database) {
            throw "You didn't specified required parameters."
        }

        this.config = {
            host: host,
            username: username,
            password: password,
            database: database
        }
    }

    async query(SQL, ...args) {
        try {
            if(!this.db) {
                console.log("[INFO] Initializing MySQL connection.");
                this.db = await mysql2.createConnection(this.config);
            }
            const [rows, fields] = await this.db.execute(SQL, args);
    
            return {
                rows: rows,
                fields: fields
            }
        } catch(e) {
            console.error(e);
            return {isError: true, error: e};
        }
    }

    async installer() {
        try {
            let query, results;
            query = await this.query("SELECT count(*) AS count FROM information_schema.TABLES WHERE TABLE_NAME = 'categories' AND TABLE_SCHEMA in (SELECT DATABASE());");
            results = query.rows[0];

            // Categogries
            if (results.count == 0) {
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

            // Products
            query = await this.query("SELECT count(*) AS count FROM information_schema.TABLES WHERE TABLE_NAME = 'products' AND TABLE_SCHEMA in (SELECT DATABASE());");
            results = query.rows[0];

            if (results = query.rows[0] == 0) {
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

            // Users
            query = await this.query("SELECT count(*) AS count FROM information_schema.TABLES WHERE TABLE_NAME = 'users' AND TABLE_SCHEMA in (SELECT DATABASE());");
            results = query.rows[0];

            if (results = query.rows[0] == 0) {
                await this.query(`CREATE TABLE users (
                    id int(11) auto_increment NOT NULL,
                    username varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
                    password varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
                    salt varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL NULL,
                    email varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL NULL,
                    firstName varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL NULL,
                    lastName varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL NULL,
                    phoneNumber varchar(24) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL NULL,
                    city varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL NULL,
                    street varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL NULL,
                    building varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL NULL,
                    admin tinyint(1) DEFAULT 0 NOT NULL,
                    CONSTRAINT \`PRIMARY\` PRIMARY KEY (id)
                )
                ENGINE=InnoDB
                DEFAULT CHARSET=utf8mb4
                COLLATE=utf8mb4_unicode_ci
                COMMENT='';
                `);
            }

            // Orders
            query = await this.query("SELECT count(*) AS count FROM information_schema.TABLES WHERE TABLE_NAME = 'orders' AND TABLE_SCHEMA in (SELECT DATABASE());");
            results = query.rows[0];

            if (results = query.rows[0] == 0) {
                await this.query(`CREATE TABLE orders (
                    id int auto_increment NULL,
                    \`order\` varchar(1024) NOT NULL,
                    orderedAt varchar(100) DEFAULT UNIX_TIMESTAMP() NULL,
                    orderedBy int NOT NULL,
                    CONSTRAINT orders_PK PRIMARY KEY (id)
                )
                ENGINE=InnoDB
                DEFAULT CHARSET=utf8mb4
                COLLATE=utf8mb4_unicode_ci;
                `)
            }
        } catch(e) {
            console.error(e);
            return {isError: true, error: e};
        }
    }
}

module.exports = Database;