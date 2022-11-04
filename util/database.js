const Sequelize = require('sequelize');


require('dotenv').config()



const sequelize = new Sequelize(process.env.DATABASE_NAME,process.env.DB_USERNAME,process.env.DB_PASSWORD, {

    dialect: 'mysql',
    host: 'localhost'
    });



    //connecting sequelize to db create connection pool

   
module.exports = sequelize;