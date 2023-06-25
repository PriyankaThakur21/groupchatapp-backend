const express = require('express');
const router = express.Router();

const GroupController = require('../controllers/groups')
const UserController = require('../controllers/users')

router.post('/creategroup', UserController.decodeToken, GroupController.addGroup);

router.get('/getAllgroups', UserController.decodeToken, GroupController.getmygroups);

module.exports = router;