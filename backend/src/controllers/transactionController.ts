import { Request, Response } from 'express';
import TransactionModel from '../models/TransactionModel';
import { ParsedQs } from 'qs';


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
      console.log('Received request:', req.body);
  
      const { description, amount, type } = req.body;
      if (!description || !amount || !type) {
        return res.status(400).json({ error: 'Please provide description, amount, and type' });
      }
      console.log('Transaction details:', { description, amount, type });
  
      if (type !== 'income' && type !== 'expense') {
        console.log('Invalid transaction type:', type);
        return res.status(400).json({ error: 'Invalid transaction type' });
      }
      
      if (amount < 0) {
        return res.status(400).json({ error: 'Amount must be a positive value' });
      }      
  
      const newTransaction = await TransactionModel.create({
        description,
        amount,
        type,
      });
  
      console.log('Transaction created:', newTransaction);
  
      res.status(201).json(newTransaction);
    } catch (error) {
      console.error('Error creating transaction:', error);
  
      if (error.name === 'ValidationError') {
        res.status(400).json({ error: 'Validation Error', details: error.errors });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  }
  async filterTransactions(req: Request, res: Response) {
    try {
      const { type, amount, startDate, endDate } = req.query as {
        type?: string | ParsedQs | string[] | ParsedQs[];
        amount?: string | ParsedQs | string[] | ParsedQs[];
        startDate?: string | ParsedQs | string[] | ParsedQs[];
        endDate?: string | ParsedQs | string[] | ParsedQs[];
      };

      const filter: any = {};

      if (type) {
        filter.type = type as string;
      }

      if (amount) {
        filter.amount = { $gte: amount as unknown as number };
      }

      if (startDate && endDate) {
        filter.createdAt = { $gte: new Date(startDate as string), $lte: new Date(endDate as string) };
      }

      const filteredTransactions = await TransactionModel.find(filter);

      res.json(filteredTransactions);
    } catch (error) {
      console.error('Error filtering transactions:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  async updateTransaction(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { description, amount, type } = req.body;

      if (type !== 'income' && type !== 'expense') {
        return res.status(400).json({ error: 'Invalid transaction type' });
      }

      const updatedTransaction = await TransactionModel.findByIdAndUpdate(
        id,
        { description, amount, type },
        { new: true }
      );

      if (!updatedTransaction) {
        return res.status(404).json({ error: 'Transaction not found' });
      }

      res.json(updatedTransaction);
    } catch (error) {
      console.error('Error updating transaction:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  async deleteTransaction(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const deletedTransaction = await TransactionModel.findByIdAndDelete(id);

      if (!deletedTransaction) {
        return res.status(404).json({ error: 'Transaction not found' });
      }

      res.json({ message: 'Transaction deleted successfully' });
    } catch (error) {
      console.error('Error deleting transaction:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  async generateMonthlyReport(req: Request, res: Response) {
    try {
      const { year, month } = req.params;
      const startOfMonth = new Date(`${year}-${parseInt(month, 10)}-01T00:00:00.000Z`);
      const endOfMonth = new Date(`${year}-${parseInt(month, 10) + 1}-01T00:00:00.000Z`);
  
      const monthlyExpenses = await TransactionModel.aggregate([
        {
          $match: {
            type: 'expense',
            createdAt: { $gte: startOfMonth, $lt: endOfMonth },
          },
        },
        {
          $group: {
            _id: null,
            totalExpenses: { $sum: '$amount' },
          },
        },
      ]);
  
      res.json({ monthlyExpenses });
    } catch (error) {
      console.error('Error generating monthly report:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
    getAllCategories: async (req: Request, res: Response) => {
    try {
      // Query para obter todas as categorias únicas do banco de dados
      const categories = await Transaction.distinct('category');

      // Enviar as categorias como resposta
      res.json(categories);
    } catch (error) {
      console.error('Erro ao obter categorias:', error);
      res.status(500).json({ message: 'Erro ao obter categorias' });
    }
  },
};


export default new TransactionController();
