import { AccountService, StatementPrinter } from '../../src/AccountService';
import TransactionHistory from '../../src/TransactionHistory';
import { Store } from '../../src/Store';
import TransactionPrinter from '../../src/TransactionPrinter';

describe('account service', () => {
  it('should be able to handle deposits, withdrawals and printing', () => {
    const mockPrint = jest.fn();

    const printer: StatementPrinter = new TransactionPrinter(mockPrint);
    const clock = { getDate: jest.fn() };

    const mockPutEntry = jest.fn();
    const mockPullEntries = jest.fn().mockReturnValue([
      { date: '10/01/2012', amount: 1000 },
      { date: '13/01/2012', amount: 2000 },
      { date: '14/01/2012', amount: -500 },
    ]);

    const store: Store = {
      putEntry: mockPutEntry,
      pullEntries: mockPullEntries,
    };

    const transactionHistory = new TransactionHistory(store);

    const accountService = new AccountService(printer, clock, transactionHistory);

    accountService.deposit(1000);
    accountService.deposit(2000);
    accountService.withdraw(500);

    accountService.printStatement();

    expect(mockPrint).toBeCalledWith(`Date       || Amount || Balance
14/01/2012 || -500  || 2500
13/01/2012 || 2000  || 3000
10/01/2012 || 1000  || 1000`);
  });
});
