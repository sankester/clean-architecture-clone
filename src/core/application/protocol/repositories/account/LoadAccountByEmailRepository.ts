export interface LoadAcountByEmailRepository {
  loadByEmail(email: string): Promise<LoadAcountByEmailRepository.Result>;
}

export namespace LoadAcountByEmailRepository {
  export type Result = {
    id: string;
    name: string;
    password: string;
  } | null;
}
