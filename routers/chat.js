const express = require('express');
const router = express.Router();

const ChatController = require('../controllers/chat');
const UserController = require('../controllers/users')

router.post('/postmsg/:groupid', UserController.decodeToken, ChatController.postmsg);

router.get('/getmsg/:groupid',UserController.decodeToken, ChatController.getmsg);

module.exports = router;