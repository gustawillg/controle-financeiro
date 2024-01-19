import { mock, instance, when } from 'ts-mockito';
import { Request, Response } from 'express';
import TransactionController from '../transactionController';
import TransactionModel from '../../models/TransactionModel';
import '@types/jest';
import { MockProxy } from 'jest-mock-extended';

jest.mock('../../models/TransactionModel');

describe('TransactionController', () => {
  // ... (outros testes)

  describe('filterTransactions', () => {
    it('should filter transactions based on query parameters and return the filtered transactions', async () => {
      // Mockando parâmetros de consulta
      const mockRequest: MockProxy<any> = mock(Request);
      when(mockRequest.query).thenReturn({
        type: 'income',
        amount: '50',
        startDate: '2024-01-01',
        endDate: '2024-01-31',
      });

      const mockResponse = {
        json: jest.fn(),
      } as unknown as Response;

      // Mockando a função de consulta do modelo
      (TransactionModel.find as jest.Mock).mockResolvedValue([
        { description: 'Income Transaction', amount: 50, type: 'income' },
      ]);

      await TransactionController.filterTransactions(instance(mockRequest), mockResponse);

      expect(mockResponse.json).toHaveBeenCalledWith(expect.arrayContaining([
        { description: 'Income Transaction', amount: 50, type: 'income' },
      ]));
    });

    it('should handle errors and return 500 status', async () => {
      // Mockando parâmetros de consulta
      const mockRequest: MockProxy<any> = mock(Request);
      when(mockRequest.query).thenReturn({
        // Parâmetros inválidos ou ausentes
      });

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      // Simulando um erro ao filtrar as transações
      (TransactionModel.find as jest.Mock).mockRejectedValue(new Error('Database error'));

      await TransactionController.filterTransactions(instance(mockRequest), mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });
  });

  // ... (outros testes)
});
