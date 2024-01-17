import express, { Router } from 'express';
import transactionController from '../controllers/transactionController';

const router: Router = express.Router();

router.get('/', (_req, res) => {
    res.send('Hello from the root route')
});

router.post('/transactions', transactionController.createTransaction);

export default router;