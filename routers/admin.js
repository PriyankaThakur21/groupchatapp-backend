const express = require('express');
const router = express.Router();

const AdminController = require('../controllers/admin');
const UserController = require('../controllers/users');

router.post('/addmember/:groupid', UserController.decodeToken, AdminController.addmember);

router.delete('/removeMember/:groupid/:userid', UserController.decodeToken, AdminController.deleteMember);

router.get('/makeadmin/:groupid/:userid', UserController.decodeToken, AdminController.makeadmin)

module.exports = router;