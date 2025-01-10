const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require('../models/user.model');
const privateKey = process.env.JWT_PRIVATE_KEY;

exports.generateToken = async (username, password) => {
    const user = await UserModel.getByUsername(username);
    if (!user) throw new Error('User not found');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error('Invalid password');

    return jwt.sign({ id: user.id, username: user.username }, privateKey, { algorithm: 'RS256', expiresIn: '1h' });
};

exports.verifyToken = async (token) => {
    return jwt.verify(token, process.env.JWT_PUBLIC_KEY);
};