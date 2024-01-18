import { Request, Response } from 'express';
import TransactionModel from '../models/TransactionModel';

class TransactionController {
  async getAllTransactions(req: Request, res: Response) {
    try {
      const transactions = await TransactionModel.find();
      res.json(transactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async createTransaction(req: Request, res: Response) {
    try {
      const { description, amount, type } = req.body;
      // Certifique-se de que o valor de 'type' é válido ('income' ou 'expense')
      if (type !== 'income' && type !== 'expense') {
        return res.status(400).json({ error: 'Invalid transaction type' });
      }

      const newTransaction = await TransactionModel.create({
        description,
        amount,
        type,
      });

      res.status(201).json(newTransaction);
    } catch (error) {
      console.error('Error creating transaction:', error);

      if (error.name === 'ValidationError') {
        // Se for um erro de validação do Mongoose
        res.status(400).json({ error: 'Validation Error', details: error.errors });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  }
}

export default new TransactionController();
