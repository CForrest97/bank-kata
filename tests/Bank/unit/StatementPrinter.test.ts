import StatementPrinter from '../../../src/Bank/StatementPrinter';
import Transaction from '../../../src/Bank/doc/Transaction';

describe('Console', () => {
  const mockPrint = jest.fn();
  let console: StatementPrinter;

  beforeEach(() => {
    jest.clearAllMocks();
    console = new StatementPrinter(mockPrint);
  });

  it('should print an empty statement', () => {
    const transactions: Transaction[] = [];

    console.print(transactions);

    expect(mockPrint).nthCalledWith(1, 'Date || Amount || Balance');
  });
  it('should print a statement with a transaction', () => {
    const transactions: Transaction[] = [
      { amount: 100, date: '10/11/2020' },
    ];

    console.print(transactions);

    expect(mockPrint).nthCalledWith(1, 'Date || Amount || Balance');
    expect(mockPrint).nthCalledWith(2, '10/11/2020 || 100 || 100');
  });
  it('should print a statement with multiple transactions in reverse order', () => {
    const transactions: Transaction[] = [
      { amount: 100, date: '10/11/2020' },
      { amount: -100, date: '11/12/2020' },
    ];

    console.print(transactions);

    expect(mockPrint).nthCalledWith(1, 'Date || Amount || Balance');
    expect(mockPrint).nthCalledWith(2, '11/12/2020 || -100 || 0');
    expect(mockPrint).nthCalledWith(3, '10/11/2020 || 100 || 100');
  });
});
