const db = require('../config/db.config.js');
const bcrypt = require('bcrypt');

exports.getAll = async () => {
    const result = await db.query('SELECT id, username FROM users');
    return result.rows;
};

exports.create = async (username, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [username, hashedPassword]);
    return result.rows[0];
};

exports.remove = async (id) => {
    await db.query('DELETE FROM users WHERE id = $1', [id]);
};
