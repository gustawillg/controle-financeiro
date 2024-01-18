import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan'; // Importe o morgan
import transactionRoutes from '../src/routes/transactionRoutes';

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/controle-financeiro');

// Use o morgan para registrar logs de requisição
app.use(morgan('dev'));

app.use(cors());
app.use(express.json());
app.use('/transactions', transactionRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
