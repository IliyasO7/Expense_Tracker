const path = require('path');
const User = require('../models/user');

const userController = require('../controllers/users');

const express = require('express');
const router = express.Router();

router.post('/signup', userController.signup)

router.post('/login',userController.login)
//router.get('/user/signup',userController.signedUsers);

router.get('/user/getUser',userController.getUsers);

router.post('/user/addUser',userController.postAddUser);

router.delete('/user/deleteUser/:userId',userController.deleteUser);

module.exports = router;









