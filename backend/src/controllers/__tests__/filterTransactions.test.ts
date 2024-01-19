import { mock, instance, when } from 'ts-mockito';
import { Request, Response } from 'express';
import TransactionController from '../transactionController';
import TransactionModel from '../../models/TransactionModel';
import { MockProxy } from 'jest-mock-extended';

jest.mock('../../models/TransactionModel');

describe('TransactionController', () => {

  describe('filterTransactions', () => {
    it('should filter transactions based on query parameters and return the filtered transactions', async () => {
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

      (TransactionModel.find as jest.Mock).mockResolvedValue([
        { description: 'Income Transaction', amount: 50, type: 'income' },
      ]);

      await TransactionController.filterTransactions(instance(mockRequest), mockResponse);

      expect(mockResponse.json).toHaveBeenCalledWith(expect.arrayContaining([
        { description: 'Income Transaction', amount: 50, type: 'income' },
      ]));
    });

    it('should handle errors and return 500 status', async () => {
      const mockRequest: MockProxy<any> = mock(Request);
      when(mockRequest.query).thenReturn({
      });

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      (TransactionModel.find as jest.Mock).mockRejectedValue(new Error('Database error'));

      await TransactionController.filterTransactions(instance(mockRequest), mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
    });
  });

});
