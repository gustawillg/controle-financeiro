import express, { Router } from 'express';
import transactionController from '../controllers/transactionController';

const router: Router = express.Router();

router.get('/', transactionController.getAllTransactions);
router.post('/', transactionController.createTransaction);
router.get('/transactions/filter', transactionController.filterTransactions);
router.put('/transactions/:id', transactionController.updateTransaction);
router.delete('/transactions/:id', transactionController.deleteTransaction);
router.get('/reports/monthly/:year/:month', transactionController.generateMonthlyReport);

export default router;