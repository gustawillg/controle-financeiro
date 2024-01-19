import { mock, instance, when } from 'ts-mockito';
import { Request, Response } from 'express';
import TransactionController from '../transactionController';
import TransactionModel from '../../models/TransactionModel';
import { MockProxy } from 'jest-mock-extended';
//import '@types/jest';



jest.mock('../../models/TransactionModel');

describe('TransactionController', () => {
  // ... (outros testes)

  describe('updateTransaction', () => {
    it('should update a transaction by ID and return the updated transaction', async () => {
      const transactionId = '65a97424d311a00b8ab617da';

      // Mockando parâmetros da requisição
      const mockRequest: MockProxy<any> = mock(Request);
      when(mockRequest.params).thenReturn({ id: transactionId });
      when(mockRequest.body).thenReturn({
        description: 'Updated Transaction',
        amount: 100,
        type: 'income',
      });

      const mockResponse = {
        json: jest.fn(),
      } as unknown as Response;

      // Mockando a função de atualização do modelo
      (TransactionModel.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce({
        _id: transactionId,
        description: 'Updated Transaction',
        amount: 100,
        type: 'income',
      });

      await TransactionController.updateTransaction(instance(mockRequest), mockResponse);

      expect(mockResponse.json).toHaveBeenCalledWith({
        _id: transactionId,
        description: 'Updated Transaction',
        amount: 100,
        type: 'income',
      });
    });

    it('should handle transaction not found and return 404 status', async () => {
      const nonExistentTransactionId = 'non-existent-id';

      // Mockando parâmetros da requisição
      const mockRequest: MockProxy<any> = mock(Request);
      when(mockRequest.params).thenReturn({ id: nonExistentTransactionId });
      when(mockRequest.body).thenReturn({
        description: 'Updated Transaction',
        amount: 100,
        type: 'income',
      });

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      // Mockando a função de atualização do modelo
      (TransactionModel.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce(null);

      await TransactionController.updateTransaction(instance(mockRequest), mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Transaction not found' });
    });

    it('should handle invalid transaction type and return 400 status', async () => {
      const transactionId = '65a97424d311a00b8ab617da';

      // Mockando parâmetros da requisição
      const mockRequest: MockProxy<any> = mock(Request);
      when(mockRequest.params).thenReturn({ id: transactionId });
      when(mockRequest.body).thenReturn({
        description: 'Updated Transaction',
        amount: 100,
        type: 'invalid-type',
      });

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await TransactionController.updateTransaction(instance(mockRequest), mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Invalid transaction type' });
    });

    it('should handle errors and return 500 status', async () => {
      const transactionId = '65a97424d311a00b8ab617da';

      // Mockando parâmetros da requisição
      const mockRequest: MockProxy<any> = mock(Request);
      when(mockRequest.params).thenReturn({ id: transactionId });
      when(mockRequest.body).thenReturn({
        description: 'Updated Transaction',
        amount: 100,
        type: 'income',
      });

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      // Simulando um erro ao atualizar a transação
      (TransactionModel.findByIdAndUpdate as jest.Mock).mockRejectedValue(new Error('Database error'));

      await TransactionController.updateTransaction(instance(mockRequest), mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });
  });

  // ... (outros testes)
});
