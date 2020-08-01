import TransactionRepository from './doc/TransactionRepository';
import IStatementPrinter from './doc/IStatementPrinter';

export default class Account {
  private transactionRepository: TransactionRepository;

  private statementPrinter: IStatementPrinter;

  constructor(transactionRepository: TransactionRepository, statementPrinter: IStatementPrinter) {
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
