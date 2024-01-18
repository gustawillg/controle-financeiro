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

  async filterTransactions(req: Request, res: Response) {
    try {
      // Implemente a lógica para filtrar as transações com base nos critérios desejados
      // Pode ser por tipo, valor, período de tempo, etc.
      // Exemplo: const filteredTransactions = await TransactionModel.find({ type: 'income' });
      // Ajuste conforme necessário.

      // Placeholder para resposta enquanto implementa a lógica de filtro
      res.json({ message: 'Implementar lógica de filtro aqui' });
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
}

export default new TransactionController();
