import express, { Router } from 'express';
import transactionController from '../controllers/transactionController';

const router: Router = express.Router();

router.get('/transactions', transactionController.getAllTransactions);
router.post('/transactions', transactionController.createTransaction);
router.get('/transactions/filter', transactionController.filterTransactions);
router.put('/transactions/:id', transactionController.updateTransaction);
router.delete('/transactions/:id', transactionController.deleteTransaction);

export default router;
