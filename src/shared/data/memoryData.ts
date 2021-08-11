import cuid from 'cuid'
import { injectable } from 'inversify';

class Collection {
  private data: Record<string, unknown> = {}

  async findAll<T extends { id: string }>(): Promise<T[]> {
    const arr: T[] = [];
    for(const key in this.data) {
      const value = this.data[key] as T
      arr.push({id: key, ...(value as Record<string, unknown>)} as T);
    }

    return arr;
  }

  async getById<T>(id: string): Promise<T> {
    return this.data[id] as T
  }

  async insert<T extends { id?: string }>(value: T): Promise<T> {
    this.data[value.id || cuid()] = value
    return value
  }

  async update<T>(id: string, value: T): Promise<T> {
    this.data[id] = value
    return this.data[id] as T
  }
}

@injectable()
export class MemoryData {
  public items = new Collection()
  public cart = new Collection()
}
