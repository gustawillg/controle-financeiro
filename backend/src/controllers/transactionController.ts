import { Request, Response } from 'express';
import Transaction, { ITransaction } from '../models/Transaction';

export const getAllTransactions = async (req: Request, res: Response): Promise<void> => {
  try {
    const transactions: ITransaction[] = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar transações' });
  }
};

export const addTransaction = async (req: Request, res: Response): Promise<void> => {
  const { description, amount, date, type, category } = req.body;

  try {
    const newTransaction: ITransaction = new Transaction({ description, amount, date, type, category });
    await newTransaction.save();
    res.json(newTransaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao adicionar transação' });
  }
};