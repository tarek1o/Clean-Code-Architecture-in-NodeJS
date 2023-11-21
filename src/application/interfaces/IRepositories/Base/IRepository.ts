export interface IRepository<T> {
  count(args: any): Promise<number>;
  findMany(args: any): Promise<T[]>;
  findUnique(args: any): Promise<T | null>;
  create(args: any): Promise<T>;
  update(args: any): Promise<T>;
  delete(id: number): Promise<T>;
}