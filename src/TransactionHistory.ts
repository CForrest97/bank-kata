import { TransactionRecorder, Transaction } from './AccountService';
import { Store } from './Store';

export default class TransactionHistory implements TransactionRecorder {
  store: Store;

  constructor(store: Store) {
    this.store = store;
  }

  pullTransactions(): Transaction[] {
    return this.store.pullEntries();
  }

  pushTransaction(transaction: Transaction): void {
    this.store.putEntry(transaction);
  }
}
