const express = require('express');
const { getUsers, createUser } = require('../controllers/userController');
const router = express.Router();

// Get users and Create user routes
router.get('/', getUsers);
router.post('/', createUser);

module.exports = router;
