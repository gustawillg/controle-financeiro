import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import transactionRoutes from '../src/routes/transactionRoutes';

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/controle-financeiro');

app.use(cors());
app.use(express.json());
app.use('/transactions', transactionRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});