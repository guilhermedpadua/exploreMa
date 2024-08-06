const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;
const routes = require('./routes');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API funcionando!');
});

app.use('/api', routes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
