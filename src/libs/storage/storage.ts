import { type ValueOf } from '@/@types/utils';
import { type StorageApi } from '@/@types/storage';
import { StorageKey } from '@/constants/storage';

type Constructor = {
  storage: globalThis.Storage;
};

class Storage implements StorageApi {
  #storage: globalThis.Storage;

  public constructor({ storage }: Constructor) {
    this.#storage = storage;
  }

  public clear(): Promise<void> {
    this.#storage.clear();

    return Promise.resolve();
  }

  public drop(key: ValueOf<typeof StorageKey>): void {
    this.#storage.removeItem(key as string);
  }

  public get<R = string>(key: ValueOf<typeof StorageKey>): R | null {
    return this.#storage.getItem(key as string) as R;
  }

  public has(key: ValueOf<typeof StorageKey>): boolean {
    const value = this.get(key);

    return Boolean(value);
  }

  public set(key: ValueOf<typeof StorageKey>, value: string): void {
    this.#storage.setItem(key as string, value);
  }
}

const storageApi = new Storage({
  storage: localStorage
});

export { storageApi };
