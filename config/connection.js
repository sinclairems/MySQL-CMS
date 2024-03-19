const mysql = require('mysql2');

// Load environment variables
require('dotenv').config();

// Connect to database
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: process.env.MYSQL_PASSWORD,
  database: 'employees'
});

module.exports = connection;