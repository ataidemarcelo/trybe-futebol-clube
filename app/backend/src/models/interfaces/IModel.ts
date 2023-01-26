export interface IModelReader<T> {
  getAll(): Promise<T[]>;
  getById(id: number): Promise<T | null>
}

export interface IModelEmail<T> {
  getByEmail(email: string): Promise<T | null>
}

export type IModel<T> = IModelReader<T>;
