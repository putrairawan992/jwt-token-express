const express = require('express');
const userController = require('../controllers/user.controller.js');
const authMiddleware = require('../middleware/auth.middleware.js');

const router = express.Router();

router.get('/', authMiddleware.verifyToken, userController.getUsers);
router.post('/', userController.createUser);
router.delete('/:id', authMiddleware.verifyToken, userController.deleteUser);

module.exports = router;