const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'roundhouse.proxy.rlwy.net',
  user: 'root',
  password: 'NERUIiJvOaTxTYEqFRBBJgULoCgeizBs',
  database: 'railway',
  port: 14323,
});

connection.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.stack);
    return;
  }
  console.log('Conectado ao banco de dados MySQL.');
});

module.exports = connection;
