import { TransactionRepository } from './TransactionRepository';
import { StatementPrinter } from './StatementPrinter';

export default class Account {
  private transactionRepository: TransactionRepository;

  private statementPrinter: StatementPrinter;

  constructor(transactionRepository: TransactionRepository, statementPrinter: StatementPrinter) {
    this.transactionRepository = transactionRepository;
    this.statementPrinter = statementPrinter;
  }

  public deposit(amount: number): void {
    this.transactionRepository.addDeposit(amount);
  }

  public withdraw(amount: number): void {
    this.transactionRepository.addWithdrawal(amount);
  }

  public printStatement(): void {
    this.statementPrinter.print(this.transactionRepository.allTransactions());
  }
}
