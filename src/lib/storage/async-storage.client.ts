import AsyncStorage from '@react-native-async-storage/async-storage';

import type { KeyValueStorage } from '../../types/storage/key-value-storage.types';

export const asyncStorageClient: KeyValueStorage = {
  getItem(key) {
    return AsyncStorage.getItem(key);
  },
  removeItem(key) {
    return AsyncStorage.removeItem(key);
  },
  setItem(key, value) {
    return AsyncStorage.setItem(key, value);
  },
};
