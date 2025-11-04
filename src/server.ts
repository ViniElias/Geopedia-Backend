import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { test_db_connection } from './db.js';

import continenteRoutes from './routes/continenteRoutes.js';
import paisRoutes from './routes/paisRoutes.js';
import cidadeRoutes from './routes/cidadeRoutes.js';

// Configuração do App
const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rota de Teste
app.get('/', (req, res) => {
  res.send('Geopedia está funcionando!');
});

// Iniciar o Servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
  test_db_connection();
});

app.use('/continentes', continenteRoutes);
app.use('/paises', paisRoutes);
app.use('/cidades', cidadeRoutes);