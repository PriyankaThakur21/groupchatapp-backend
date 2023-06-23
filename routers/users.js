const express = require('express');
const router = express.Router();

const UserController = require('../controllers/users');

router.post('/signup', UserController.signupUsers);

router.post('/login', UserController.loginUsers);

module.exports = router;