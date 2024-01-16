// src/index.ts
import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/controle-financeiro', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions);

app.use(cors());
app.use(express.json());
app.use(routes);

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});