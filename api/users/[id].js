const sqlite3 = require('sqlite3').verbose();

// Initialize database
const dbPath = '/tmp/database.db';
const db = new sqlite3.Database(dbPath);

// Initialize database table
db.serialize(() => {
  const sql = `CREATE TABLE IF NOT EXISTS users (
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
  db.run(sql);
});

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { method, query: { id } } = req;

  try {
    switch (method) {
      case 'GET':
        // Get single user
        return new Promise((resolve, reject) => {
          db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
            if (err) {
              res.status(500).json({ error: err.message });
              reject(err);
            } else if (!row) {
              res.status(404).json({ error: 'User not found' });
              resolve();
            } else {
              res.status(200).json({ data: row });
              resolve();
            }
          });
        });

      case 'PUT':
        // Update user
        const { name, email, phone, company, street, city, zipcode, lat, lng } = req.body;

        if (!name || !email) {
          return res.status(400).json({ error: 'Name and email are required' });
        }

        return new Promise((resolve, reject) => {
          const stmt = db.prepare(`
            UPDATE users
            SET name = ?, email = ?, phone = ?, company = ?, street = ?, city = ?, zipcode = ?, lat = ?, lng = ?
            WHERE id = ?
          `);

          stmt.run([name, email, phone, company, street, city, zipcode, lat, lng, id], function(err) {
            if (err) {
              if (err.message.includes('UNIQUE constraint failed')) {
                res.status(400).json({ error: 'Email already exists' });
              } else {
                res.status(500).json({ error: err.message });
              }
              reject(err);
            } else if (this.changes === 0) {
              res.status(404).json({ error: 'User not found' });
              resolve();
            } else {
              res.status(200).json({
                message: 'User updated successfully',
                data: { id: parseInt(id), name, email, phone, company, street, city, zipcode, lat, lng }
              });
              resolve();
            }
          });
          stmt.finalize();
        });

      case 'DELETE':
        // Delete user
        return new Promise((resolve, reject) => {
          db.run('DELETE FROM users WHERE id = ?', [id], function(err) {
            if (err) {
              res.status(500).json({ error: err.message });
              reject(err);
            } else if (this.changes === 0) {
              res.status(404).json({ error: 'User not found' });
              resolve();
            } else {
              res.status(200).json({ message: 'User deleted successfully' });
              resolve();
            }
          });
        });

      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE', 'OPTIONS']);
        res.status(405).json({ error: `Method ${method} Not Allowed` });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};