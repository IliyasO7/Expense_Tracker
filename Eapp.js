const path = require('path');

const bcrypt = require('bcrypt');

const dotenv = require('dotenv')
//const razorpay = require('razorpay');



const express = require('express'); //importing express module
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database'); //pool that allows use to use connection to db

const User = require('./models/user');
const Expense = require('./models/expense');
const Order = require('./models/orders');

const cors = require('cors');

const app = express();  // using func of express to handling things for us or showing a way 
dotenv.config();

app.use(cors());



const userRoutes = require('./routes/users');
const expenseRoutes = require('./routes/expense');

const purchaseRoutes = require('./routes/purchaseRoutes');



app.use(express.json())//instead of body parson json

//app.use(bodyParser.urlencoded({ extended:false })); //registers a middleware and does body parsing for us. and has a next funciton.///plugging into middlewares.

//app.use(express.static(path.join(__dirname,'public')));




app.use('/user',userRoutes);



app.use('/purchase',purchaseRoutes)


app.use('/expense',expenseRoutes)

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);


//app.use(errorController.get404);




sequelize.sync().then(result =>{
    console.log('Server started at 5000');
    app.listen(5000); 
}).catch(err=>{
    console.log(err);
});                                                            
