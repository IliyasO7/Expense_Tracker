const Sequelize = require('sequelize');


const sequelize = new Sequelize('expense-node-complete','root','Iliyastechs@ngli10', {
    dialect: 'mysql',
    host: 'localhost'
    });



    //connecting sequelize to db create connection pool

   
module.exports = sequelize;