import express, { Router } from 'express';
import transactionController from '../controllers/transactionController';

const router: Router = express.Router();

router.get('/transactions', transactionController.getAllTransactions);
router.post('/transactions', transactionController.createTransaction);

export default router;