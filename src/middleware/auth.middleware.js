const jwtUtils = require('../utils/jwt.utils.js');

exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ error: 'No token provided' });

    jwtUtils.verifyToken(token)
        .then((decoded) => {
            req.user = decoded;
            next();
        })
        .catch((err) => res.status(401).json({ error: 'Unauthorized' }));
};