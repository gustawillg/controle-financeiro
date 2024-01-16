import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar ao MongoDB (substitua 'sua_URL_do_MongoDB' pela URL real)
mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão ao MongoDB:'));
db.once('open', () => {
  console.log('Conectado ao MongoDB');
});

app.use(cors());
app.use(bodyParser.json());

// Rotas aqui...

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});