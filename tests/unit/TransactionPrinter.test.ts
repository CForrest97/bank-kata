import TransactionPrinter from '../../src/TransactionPrinter';

describe('TransactionPrinter', () => {
  it('should print an empty statement', () => {
    const mockPrint = jest.fn();
    const transactionPrinter = new TransactionPrinter(mockPrint);

    transactionPrinter.print([]);

    expect(mockPrint).toHaveBeenCalledWith(`Date       || Amount || Balance
`);
  });
  it('should print a statement with a single transaction', () => {
    const mockPrint = jest.fn();
    const transactionPrinter = new TransactionPrinter(mockPrint);

    transactionPrinter.print([
      { amount: 1000, date: '12/10/20' },
    ]);

    expect(mockPrint).toHaveBeenCalledWith(`Date       || Amount || Balance
12/10/20 || 1000  || 1000`);
  });
  it('should print a statement with multiple transactions', () => {
    const mockPrint = jest.fn();
    const transactionPrinter = new TransactionPrinter(mockPrint);

    transactionPrinter.print([
      { amount: 1000, date: '12/10/20' },
      { amount: 2000, date: '13/10/20' },
    ]);

    expect(mockPrint).toHaveBeenCalledWith(`Date       || Amount || Balance
13/10/20 || 2000  || 3000
12/10/20 || 1000  || 1000`);
  });
});
