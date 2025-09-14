const sqlite3 = require('sqlite3').verbose();
const DBSOURCE = "users.db";

const db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    } else {
        console.log('Connected to the SQLite database.');
        const sql = `
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                phone TEXT,
                company TEXT,
                street TEXT,
                city TEXT,
                zipcode TEXT,
                lat TEXT,
                lng TEXT
            )`;
        db.run(sql, (err) => {
            if (err) {
                // Table already created
            } else {
                console.log('Users table created or already exists.');
            }
        });
    }
});

module.exports = db;