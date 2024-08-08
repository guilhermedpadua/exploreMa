const mysql = require('mysql2');
require('dotenv').config();

console.log('URL de Conexão:', process.env.MYSQL_URL);
const connection = mysql.createConnection(process.env.MYSQL_URL);

connection.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.stack);
    return;
  }
  console.log('Conectado ao banco de dados MySQL.');
});

module.exports = connection;
