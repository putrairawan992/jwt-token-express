const UserModel = require('../models/user.model.js');
const cacheUtils = require('../utils/cache.utils.js');

exports.getUsers = async (req, res) => {
    try {
        const cachedUsers = await cacheUtils.getCache('users');
        if (cachedUsers) return res.status(200).json(JSON.parse(cachedUsers));

        const users = await UserModel.getAll();
        await cacheUtils.setCache('users', JSON.stringify(users));
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await UserModel.create(username, password);
        await cacheUtils.clearCache('users');
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await UserModel.remove(id);
        await cacheUtils.clearCache('users');
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};