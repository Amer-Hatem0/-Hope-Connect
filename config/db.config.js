const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',            
  password: '23102002',    
  database: 'hopeconnect'      
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected successfully to MySQL database.');
});

module.exports = connection;
