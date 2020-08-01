import TransactionHistory from '../../src/TransactionHistory';
import { Store } from '../../src/Store';

describe('transactionHistory', () => {
  it('should store a transaction', () => {
    const putEntryMock = jest.fn();
    const store: Store = { putEntry: putEntryMock, pullEntries: jest.fn() };
    const transactionHistory = new TransactionHistory(store);
    const transaction = { amount: 1000, date: '10/10/20' };

    transactionHistory.pushTransaction(transaction);

    expect(putEntryMock).toBeCalledWith(transaction);
  });
  it('should return stored transactions', () => {
    const expectedTransactions = [{ amount: 1000, date: '10/10/20' }, { amount: -1000, date: '11/10/20' }];
    const mockPullEntries = jest.fn().mockReturnValue(expectedTransactions);
    const store: Store = { putEntry: jest.fn(), pullEntries: mockPullEntries };
    const transactionHistory = new TransactionHistory(store);

    const transactions = transactionHistory.pullTransactions();

    expect(mockPullEntries).toBeCalled();
    expect(transactions).toBe(expectedTransactions);
  });
});
