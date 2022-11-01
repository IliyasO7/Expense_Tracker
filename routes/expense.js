const path = require('path');
const expenseController = require('../controllers/expense');



const express = require('express');
const userAuthentication = require('../middleware/auth');

const router = express.Router();


router.get('/expense/getExpenses',userAuthentication.authentication ,expenseController.getExpenses);

router.post('/expense/addExpense',userAuthentication.authentication,expenseController.addExpenses);

router.delete('/expense/deleteExpense/:userId',userAuthentication.authentication,expenseController.deleteExpenses);




module.exports = router;