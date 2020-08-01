import Transaction from './Transaction';

export interface TransactionRepository {
  addDeposit(amount: number): void;
  addWithdrawal(amount: number): void;
  allTransactions(): Transaction[];
}
