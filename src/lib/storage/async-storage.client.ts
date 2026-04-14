import AsyncStorage from '@react-native-async-storage/async-storage';

import type { KeyValueStorage } from './key-value-storage';

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
