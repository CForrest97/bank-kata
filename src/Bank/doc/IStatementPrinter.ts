import Transaction from './Transaction';

export default interface IStatementPrinter {
  print(transactions: Transaction[]): void;
}
