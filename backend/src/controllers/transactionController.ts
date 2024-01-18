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
      console.log('Transaction details:', { description, amount, type });
  
      // Certifique-se de que o valor de 'type' é válido ('income' ou 'expense')
      if (type !== 'income' && type !== 'expense') {
        console.log('Invalid transaction type:', type);
        return res.status(400).json({ error: 'Invalid transaction type' });
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
        // Se for um erro de validação do Mongoose
        res.status(400).json({ error: 'Validation Error', details: error.errors });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  }
  async filterTransactions(req: Request, res: Response) {
    try {
      // Obtenha parâmetros de consulta da requisição
      const { type, amount, startDate, endDate } = req.query as {
        type?: string | ParsedQs | string[] | ParsedQs[];
        amount?: string | ParsedQs | string[] | ParsedQs[];
        startDate?: string | ParsedQs | string[] | ParsedQs[];
        endDate?: string | ParsedQs | string[] | ParsedQs[];
      };

      // Construa um objeto de filtro com base nos parâmetros
      const filter: any = {};

      if (type) {
        filter.type = type as string;
      }

      if (amount) {
        filter.amount = { $gte: amount as unknown as number }; // Certifique-se de converter para number
      }

      if (startDate && endDate) {
        filter.createdAt = { $gte: new Date(startDate as string), $lte: new Date(endDate as string) };
      }

      // Execute a consulta com base nos filtros
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

      // Certifique-se de que o valor de 'type' é válido ('income' ou 'expense')
      if (type !== 'income' && type !== 'expense') {
        return res.status(400).json({ error: 'Invalid transaction type' });
      }

      // Encontre a transação pelo ID e atualize-a com os novos dados
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

      // Encontre a transação pelo ID e exclua-a
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
      const startOfMonth = new Date(`${year}-${month}-01T00:00:00.000Z`);
      const endOfMonth = new Date(`${year}-${month + 1}-01T00:00:00.000Z`);
  
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
}

export default new TransactionController();
