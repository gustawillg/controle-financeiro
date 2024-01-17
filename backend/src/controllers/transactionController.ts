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
      const newTransaction = await TransactionModel.create({ description, amount, type });
      res.status(201).json(newTransaction);
    } catch (error) {
      console.error('Error creating transaction:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default new TransactionController();