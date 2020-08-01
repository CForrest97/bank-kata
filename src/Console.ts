import { StatementPrinter } from './StatementPrinter';
import Transaction from './Transaction';

type Logger = (message: string) => void;

export default class Console implements StatementPrinter {
  private log: Logger;

  constructor(log: Logger) {
    this.log = log;
  }

  print(transactions: Transaction[]): void {
    this.log('Date || Amount || Balance');

    let runningBalance = 0;

    transactions
      .map(({ date, amount }) => {
        runningBalance += amount;
        return `${date} || ${amount} || ${runningBalance}`;
      })
      .reverse()
      .forEach((message) => this.log(message));
  }
}
