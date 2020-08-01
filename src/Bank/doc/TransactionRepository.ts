import Transaction from './Transaction';

export default interface TransactionRepository {
  addDeposit(amount: number): void;
  addWithdrawal(amount: number): void;
  allTransactions(): Transaction[];
}
