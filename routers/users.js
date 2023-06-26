const express = require('express');
const router = express.Router();

const UserController = require('../controllers/users');

router.post('/signup', UserController.signupUsers);

router.post('/login', UserController.loginUsers);

router.get('/getAllusers/:groupid', UserController.decodeToken, UserController.getAllusers);

router.get('/getuser/:userid', UserController.getUser);

module.exports = router;