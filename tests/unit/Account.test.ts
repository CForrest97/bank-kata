import Account from '../../src/Account';
import { TransactionRepository } from '../../src/TransactionRepository';
import { StatementPrinter } from '../../src/StatementPrinter';
import Transaction from '../../src/Transaction';

describe('Account unit test', () => {
  const mockAddDeposit = jest.fn();
  const mockAddWithdrawal = jest.fn();
  const mockAllTransactions = jest.fn();
  const mockPrint = jest.fn();

  const transactionRepository: TransactionRepository = {
    addDeposit: mockAddDeposit,
    addWithdrawal: mockAddWithdrawal,
    allTransactions: mockAllTransactions,
  };

  const statementPrinter: StatementPrinter = { print: mockPrint };

  let account: Account;

  beforeEach(() => {
    jest.clearAllMocks();
    account = new Account(transactionRepository, statementPrinter);
  });

  it('should store a deposit transaction', () => {
    account.deposit(100);

    expect(mockAddDeposit).toBeCalledWith(100);
  });
  it('should store a withdraw transaction', () => {
    account.withdraw(100);

    expect(mockAddWithdrawal).toBeCalledWith(100);
  });
  it('should print a statement', () => {
    const transactions: Transaction[] = [
      { amount: 100, date: '10/11/2012' },
    ];
    mockAllTransactions.mockReturnValue(transactions);

    account.printStatement();

    expect(mockPrint).toBeCalledWith(transactions);
  });
});
