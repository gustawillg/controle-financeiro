import express, { Router } from 'express';
import transactionController from '../controllers/transactionController';

const router: Router = express.Router();

router.put('/:id', transactionController.updateTransaction);
router.delete('/:id', transactionController.deleteTransaction);
router.get('/reports/monthly/:year/:month', transactionController.generateMonthlyReport);
router.get('/filter', transactionController.filterTransactions);
router.get('/', transactionController.getAllTransactions);
router.post('/', transactionController.createTransaction);

export default router;