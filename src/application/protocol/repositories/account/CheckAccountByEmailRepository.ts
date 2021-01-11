export interface CheckAccountByEmailResponsitory {
  checkByEmail(email: string): Promise<CheckAccountByEmailResponsitory.Result>;
}

export namespace CheckAccountByEmailResponsitory {
  export type Result = boolean;
}
