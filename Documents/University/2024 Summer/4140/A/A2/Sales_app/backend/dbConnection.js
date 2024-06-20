const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'CSCI4140_A2_NEW',
  port: 3306
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL connected...');
});

module.exports = db;