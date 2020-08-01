export interface Store {
  putEntry(data: any): void;
  pullEntries(): any[];
}
