import Account from '../../../src/Bank/Account';
import TransactionHistory from '../../../src/Bank/TransactionHistory';
import StatementPrinter from '../../../src/Bank/StatementPrinter';
import Clock from '../../../src/Bank/doc/Clock';

describe('account service', () => {
  it('should be able to handle deposits, withdrawals and printing', () => {
    const mockPrintLine = jest.fn();
    const mockTodayAsString = jest.fn()
      .mockReturnValueOnce('10/01/2012')
      .mockReturnValueOnce('13/01/2012')
      .mockReturnValueOnce('14/01/2012');

    const clock: Clock = { todayAsString: mockTodayAsString };
    const transactionHistory: TransactionHistory = new TransactionHistory(clock);
    const console: StatementPrinter = new StatementPrinter(mockPrintLine);

    const account = new Account(transactionHistory, console);

    account.deposit(1000);
    account.deposit(2000);
    account.withdraw(500);

    account.printStatement();

    expect(mockPrintLine).nthCalledWith(1, 'Date || Amount || Balance');
    expect(mockPrintLine).nthCalledWith(2, '14/01/2012 || -500 || 2500');
    expect(mockPrintLine).nthCalledWith(3, '13/01/2012 || 2000 || 3000');
    expect(mockPrintLine).nthCalledWith(4, '10/01/2012 || 1000 || 1000');
  });
});