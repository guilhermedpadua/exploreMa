const mysql = require('mysql2');
require('dotenv').config(); // Garanta que essa linha esteja presente se você estiver usando .env
console.log('String de Conexão:', process.env.MYSQL_URL);
const connection = mysql.createConnection(process.env.MYSQL_URL);

connection.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.stack);
    return;
  }
  console.log('Conectado ao banco de dados MySQL.');
});

module.exports = connection;
