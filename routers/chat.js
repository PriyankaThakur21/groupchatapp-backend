const express = require('express');
const router = express.Router();

const ChatController = require('../controllers/chat');
const UserController = require('../controllers/users')

router.post('/postmsg/:groupid', UserController.decodeToken, ChatController.postmsg);

router.get('/getmsg/:groupid',UserController.decodeToken, ChatController.getmsg);

router.post('/uploadfile/:groupid', UserController.decodeToken, ChatController.uploadfile);

module.exports = router;