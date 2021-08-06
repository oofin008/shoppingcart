export interface useCase<T> {
  execute(...args: any[]): Promise<T>;
}