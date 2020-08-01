import { StatementPrinter, Transaction } from './AccountService';

const convertTransactionsToStrings = (transactions: Transaction[]) => {
  let subTotal = 0;
  return transactions.map(({ date, amount }) => {
    subTotal += amount;
    return `${date} || ${amount}  || ${subTotal}`;
  });
};

export default class TransactionPrinter implements StatementPrinter {
  private printer: (input: string) => void;

  constructor(printer: (input: string) => void) {
    this.printer = printer;
  }

  print(transactions: Transaction[]): void {
    const transactionStrings = convertTransactionsToStrings(transactions);
    this.printer(`Date       || Amount || Balance
${transactionStrings.reverse().join('\n')}`);
  }
}
