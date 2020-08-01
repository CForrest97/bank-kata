import IStatementPrinter from './doc/IStatementPrinter';
import Transaction from './doc/Transaction';

type PrintLine = (message: string) => void;

export default class StatementPrinter implements IStatementPrinter {
  private printLine: PrintLine;

  constructor(printLine: PrintLine) {
    this.printLine = printLine;
  }

  print(transactions: Transaction[]): void {
    this.printLine('Date || Amount || Balance');
    this.printTransactions(transactions);
  }

  private printTransactions(transactions: Transaction[]): void {
    let runningBalance = 0;

    transactions
      .map(({ date, amount }) => {
        runningBalance += amount;
        return `${date} || ${amount} || ${runningBalance}`;
      })
      .reverse()
      .forEach((message) => this.printLine(message));
  }
}
