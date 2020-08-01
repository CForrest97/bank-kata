import Account from '../../../src/Bank/Account';
import TransactionRepository from '../../../src/Bank/doc/TransactionRepository';
import IStatementPrinter from '../../../src/Bank/doc/IStatementPrinter';
import Transaction from '../../../src/Bank/doc/Transaction';

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

  const statementPrinter: IStatementPrinter = { print: mockPrint };

  let account: Account;

  beforeEach(() => {
    jest.clearAllMocks();
    account = new Account(transactionRepository, statementPrinter);
  });

  it('should store a deposit transaction', () => {
    account.deposit(100);

    expect(mockAddDeposit).toBeCalledWith(100);
  });
  it('should store a withdrawal transaction', () => {
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
