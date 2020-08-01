import Console from '../../src/Console';
import Transaction from '../../src/Transaction';

describe('Console', () => {
  it('should print an empty statement', () => {
    const transactions: Transaction[] = [];
    const mockPrint = jest.fn();
    const console = new Console(mockPrint);

    console.print(transactions);

    expect(mockPrint).nthCalledWith(1, 'Date || Amount || Balance');
  });
  it('should print a statement with a transaction', () => {
    const transactions: Transaction[] = [
      { amount: 100, date: '10/11/2020' },
    ];
    const mockPrint = jest.fn();
    const console = new Console(mockPrint);

    console.print(transactions);

    expect(mockPrint).nthCalledWith(1, 'Date || Amount || Balance');
    expect(mockPrint).nthCalledWith(2, '10/11/2020 || 100 || 100');
  });
  it('should print a statement with multiple transactions in reverse order', () => {
    const transactions: Transaction[] = [
      { amount: 100, date: '10/11/2020' },
      { amount: -100, date: '11/12/2020' },
    ];
    const mockPrint = jest.fn();
    const console = new Console(mockPrint);

    console.print(transactions);

    expect(mockPrint).nthCalledWith(1, 'Date || Amount || Balance');
    expect(mockPrint).nthCalledWith(2, '11/12/2020 || -100 || 0');
    expect(mockPrint).nthCalledWith(3, '10/11/2020 || 100 || 100');
  });
});
