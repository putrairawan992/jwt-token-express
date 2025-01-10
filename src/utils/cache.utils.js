const redisClient = require('../config/redis.config');

exports.getCache = async (key) => {
    return redisClient.get(key);
};

exports.setCache = async (key, value, expiry = 60) => {
    await redisClient.set(key, value, { EX: expiry });
};

exports.clearCache = async (key) => {
    await redisClient.del(key);
};