import express from 'express';
import { Router } from 'express';
import transactionController from '../controllers/transactionController';

const router = Router();

// Rota para obter todas as transações
router.get('/transactions', transactionController.getAllTransactions);

// Rota para adicionar uma nova transação
router.post('/transactions', transactionController.addTransaction);

export default router;