import {
  AccountService, TransactionRecorder, Clock, StatementPrinter,
} from '../../src/AccountService';

describe('account service', () => {
  it('should deposit an ammount', () => {
    const pushTransactionMock = jest.fn();

    const transactionRecorder: TransactionRecorder = {
      pushTransaction: pushTransactionMock,
      pullTransactions: jest.fn(),
    };

    const clock = { getDate: jest.fn().mockReturnValue('10/01/20') };

    const accountService = new AccountService({ print: jest.fn() }, clock, transactionRecorder);

    accountService.deposit(1000);

    expect(pushTransactionMock).toBeCalledWith({ amount: 1000, date: '10/01/20' });
  });
  it('should withdraw an ammount', () => {
    const pushTransactionMock = jest.fn();

    const transactionRecorder: TransactionRecorder = {
      pushTransaction: pushTransactionMock,
      pullTransactions: jest.fn(),
    };

    const clock = { getDate: jest.fn().mockReturnValue('20/02/19') };

    const accountService = new AccountService({ print: jest.fn() }, clock, transactionRecorder);

    accountService.withdraw(1000);

    expect(pushTransactionMock).toBeCalledWith({ amount: -1000, date: '20/02/19' });
  });
  it('should print a statement with multiple transactions', () => {
    const printMock = jest.fn();
    const mockPullTransactions = jest.fn();
    const transactions = [{ amount: 1000, date: '10/10/20' }, { amount: 2000, date: '11/10/20' }, { amount: -500, date: '12/10/20' }];
    mockPullTransactions.mockReturnValue(transactions);

    const clock: Clock = { getDate: jest.fn() };

    const transactionRecorder: TransactionRecorder = {
      pushTransaction: jest.fn(),
      pullTransactions: mockPullTransactions,
    };

    const printer: StatementPrinter = { print: printMock };

    const accountService: AccountService = new AccountService(printer, clock, transactionRecorder);

    accountService.printStatement();

    expect(printMock).toBeCalledWith(transactions);
  });
});
