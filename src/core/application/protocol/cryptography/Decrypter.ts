export interface Decrypter {
  descypt(encryptText: string): Promise<string>;
}
