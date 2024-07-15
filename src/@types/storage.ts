import { StorageKey } from '@/constants/storage';
import { type ValueOf } from '@/@types/utils';
interface StorageApi {
  clear(): void;
  drop(key: ValueOf<typeof StorageKey>): void;
  get<R = string>(key: ValueOf<typeof StorageKey>): R | null;
  has(key: ValueOf<typeof StorageKey>): boolean;
  set(key: ValueOf<typeof StorageKey>, value: string): void;
}

export { type StorageApi }
