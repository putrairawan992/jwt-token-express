const UserModel = require('../models/user.model.js');
const jwtUtils = require('../utils/jwt.utils.js');

exports.register = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await UserModel.create(username, password);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const token = await jwtUtils.generateToken(username, password);
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};