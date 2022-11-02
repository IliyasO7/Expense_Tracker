const path = require('path');
const expenseController = require('../controllers/expense');

const middlewareAuthentication = require('../middleware/auth')

const express = require('express');
const userAuthentication = require('../middleware/auth');

const router = express.Router();

router.get('/premiums',middlewareAuthentication.authentication, expenseController.getAllUsers)


module.exports = router;