export interface Clock {
  getDate(): string;
}

export interface Transaction {
  amount: number;
  date: string;
}

export interface StatementPrinter {
  print(transcation: Transaction[]): void;
}

export interface TransactionRecorder {
  pushTransaction(transaction: Transaction): void;
  pullTransactions(): Transaction[];
}

export class AccountService {
  statementPrinter: StatementPrinter;

  clock: Clock;

  transactionRecorder: TransactionRecorder;

  constructor(
    statementPrinter: StatementPrinter,
    clock: Clock,
    transactionRecorder: TransactionRecorder,
  ) {
    this.statementPrinter = statementPrinter;
    this.transactionRecorder = transactionRecorder;
    this.clock = clock;
  }

  public withdraw(amount: number): void {
    this.transactionRecorder.pushTransaction({ amount: -amount, date: this.clock.getDate() });
  }

  public deposit(amount: number): void {
    this.transactionRecorder.pushTransaction({ amount, date: this.clock.getDate() });
  }

  public printStatement(): void {
    const transactions = this.transactionRecorder.pullTransactions();
    this.statementPrinter.print(transactions);
  }
}
