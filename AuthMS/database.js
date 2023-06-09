const sqlite3 = require("sqlite3");
const bcrypt = require("bcrypt");

let db = new sqlite3.Database("./dbStore.db");

db.serialize(function () {
    db.run(
        `CREATE TABLE IF NOT EXISTS users 
        (id INTEGER PRIMARY KEY, 
        username TEXT UNIQUE,
        hashed_password BLOB)`
    );

    //create starter users
    const saltRounds = 10;
    let username = "test-user";
    let clearPass = "qwerty";
    let passHash;

    bcrypt.hash(clearPass, saltRounds, function (err, hash) {
        passHash = hash;
        db.run(
            `INSERT OR IGNORE INTO users (username, hashed_password) VALUES ('${username}', '${passHash}')`
        );
    });
});

module.exports = db;
