const express = require('express');
const router = express.Router();
const connection = require('./db'); 

router.get('/destinos', (req, res) => {
  connection.query('SELECT * FROM destinos', (err, results) => {
    if (err) {
      return res.status(500).send('Erro ao buscar destinos');
    }
    res.json(results);
  });
});

router.get('/destinos/:id', (req, res) => {
  const destinoId = req.params.id;
  connection.query('SELECT * FROM destinos WHERE id = ?', [destinoId], (err, results) => {
    if (err) {
      return res.status(500).send('Erro ao buscar destino');
    }
    res.json(results[0]);
  });
});

router.post('/destinos', (req, res) => {
  const { nome, descricao, localizacao } = req.body;
  connection.query('INSERT INTO destinos (nome, descricao, localizacao) VALUES (?, ?, ?)', 
  [nome, descricao, localizacao], (err, results) => {
    if (err) {
      return res.status(500).send('Erro ao adicionar destino');
    }
    res.status(201).send(`Destino adicionado com ID: ${results.insertId}`);
  });
});


router.put('/destinos/:id', (req, res) => {
  const destinoId = req.params.id;
  const { nome, descricao, localizacao } = req.body;
  connection.query('UPDATE destinos SET nome = ?, descricao = ?, localizacao = ? WHERE id = ?', 
  [nome, descricao, localizacao, destinoId], (err) => {
    if (err) {
      return res.status(500).send('Erro ao atualizar destino');
    }
    res.send('Destino atualizado com sucesso');
  });
});


router.delete('/destinos/:id', (req, res) => {
  const destinoId = req.params.id;
  connection.query('DELETE FROM destinos WHERE id = ?', [destinoId], (err) => {
    if (err) {
      return res.status(500).send('Erro ao deletar destino');
    }
    res.send('Destino deletado com sucesso');
  });
});

router.get('/destinos/search', (req, res) => {
  const { nome, regioes } = req.query;
  let query = 'SELECT * FROM destinos WHERE 1=1';
  const params = [];

  if (nome) {
    query += ' AND nome LIKE ?';
    params.push(`%${nome}%`);
  }

  if (regioes) {
    query += ' AND localizacao LIKE ?';
    params.push(`%${regioes}%`);
  }

  connection.query(query, params, (err, results) => {
    if (err) {
      return res.status(500).send('Erro ao buscar destinos');
    }
    res.json(results);
  });
});

router.get('/destinos/:id/atrativos', (req, res) => {
  const destinoId = req.params.id;
  connection.query('SELECT * FROM atrativos WHERE destino_id = ?', [destinoId], (err, results) => {
    if (err) {
      return res.status(500).send('Erro ao buscar atrativos');
    }
    res.json(results);
  });
});


module.exports = router;


