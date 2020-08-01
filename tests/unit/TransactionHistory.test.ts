import TransactionHistory from '../../src/TransactionHistory';
import { Clock } from '../../src/Clock';

describe('TransactionHistory', () => {
  const clock: Clock = { todayAsString: jest.fn().mockReturnValue('01/08/2020') };

  let transactionHistory: TransactionHistory;

  beforeEach(() => {
    transactionHistory = new TransactionHistory(clock);
  });

  it('should create and store a deposit transaction', () => {
    transactionHistory.addDeposit(100);

    const transactions = transactionHistory.allTransactions();

    expect(transactions).toEqual([{ date: '01/08/2020', amount: 100 }]);
  });
  it('should create and store a withdrawal transaction', () => {
    transactionHistory.addWithdrawal(100);

    const transactions = transactionHistory.allTransactions();

    expect(transactions).toEqual([{ date: '01/08/2020', amount: -100 }]);
  });
});
