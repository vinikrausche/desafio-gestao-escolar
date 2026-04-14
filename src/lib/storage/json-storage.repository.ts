import type { ZodType } from 'zod';

import type { KeyValueStorage } from './key-value-storage';

type CreateJsonStorageRepositoryParams<TValue> = {
  key: string;
  schema: ZodType<TValue>;
  storage: KeyValueStorage;
};

export function createJsonStorageRepository<TValue>({
  key,
  schema,
  storage,
}: CreateJsonStorageRepositoryParams<TValue>) {
  return {
    async clear() {
      await storage.removeItem(key);
    },

    async read() {
      const rawValue = await storage.getItem(key);

      if (!rawValue) {
        return null;
      }

      try {
        return schema.parse(JSON.parse(rawValue)) as TValue;
      } catch {
        await storage.removeItem(key);
        return null;
      }
    },

    async write(value: TValue) {
      await storage.setItem(key, JSON.stringify(value));
    },
  };
}
