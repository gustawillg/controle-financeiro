import { mock, instance, when } from 'ts-mockito';
import { Request, Response } from 'express';
import TransactionController from '../transactionController';
import TransactionModel from '../../models/TransactionModel';
import '@types/jest';
import { MockProxy } from 'jest-mock-extended';

jest.mock('../../models/TransactionModel');

describe('TransactionController', () => {
  // ... (outros testes)

  describe('deleteTransaction', () => {
    it('should delete a transaction by ID and return success message', async () => {
      const transactionId = '65a97424d311a00b8ab617da';

      // Mockando parâmetros da requisição
      const mockRequest: MockProxy<any> = mock(Request);
      when(mockRequest.params).thenReturn({ id: transactionId });

      const mockResponse = {
        json: jest.fn(),
      } as unknown as Response;

      // Mockando a função de exclusão do modelo
      (TransactionModel.findByIdAndDelete as jest.Mock).mockResolvedValueOnce({
        _id: transactionId,
        description: 'Expense Transaction',
        amount: 90,
        type: 'expense',
      });

      await TransactionController.deleteTransaction(instance(mockRequest), mockResponse);

      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Transaction deleted successfully' });
    });

    it('should handle transaction not found and return 404 status', async () => {
      const nonExistentTransactionId = 'non-existent-id';

      // Mockando parâmetros da requisição
      const mockRequest: MockProxy<any> = mock(Request);
      when(mockRequest.params).thenReturn({ id: nonExistentTransactionId });

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      // Mockando a função de exclusão do modelo
      (TransactionModel.findByIdAndDelete as jest.Mock).mockResolvedValueOnce(null);

      await TransactionController.deleteTransaction(instance(mockRequest), mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Transaction not found' });
    });

    it('should handle errors and return 500 status', async () => {
      const transactionId = '65a97424d311a00b8ab617da';

      // Mockando parâmetros da requisição
      const mockRequest: MockProxy<any> = mock(Request);
      when(mockRequest.params).thenReturn({ id: transactionId });

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      // Simulando um erro ao excluir a transação
      (TransactionModel.findByIdAndDelete as jest.Mock).mockRejectedValue(new Error('Database error'));

      await TransactionController.deleteTransaction(instance(mockRequest), mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });
  });

  // ... (outros testes)
});
