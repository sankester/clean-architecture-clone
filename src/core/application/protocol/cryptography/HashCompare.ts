export interface HashCompare {
  compare(plainText: string, digesh: string): Promise<boolean>;
}
