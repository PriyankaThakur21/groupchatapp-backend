const express = require('express');
const router = express.Router();

const ChatController = require('../controllers/chat');
const UserController = require('../controllers/users')

router.post('/postmsg', UserController.decodeToken, ChatController.postmsg);

router.get('/getmsg',UserController.decodeToken, ChatController.getmsg);

module.exports = router;