const express = require('express');
const router = express.Router();

const UserController = require('../controllers/users');

router.post('/signup', UserController.signupUsers);

router.post('/login', UserController.loginUsers);

router.get('/getAllusers', UserController.decodeToken, UserController.getAllusers);

module.exports = router;