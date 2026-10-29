const express = require('express');
const pedidoRoutes = require('./routes/pedidoRoutes');

const app = express();

app.use(express.json());

app.use('/pedidos', pedidoRoutes);

app.use((err, req, res, next) => {
  if (err.status) {
    return res.status(err.status).json({ erro: err.message });
  }

  console.error(err);
  return res.status(500).json({ erro: "Erro interno no servidor." });
});

module.exports = app;