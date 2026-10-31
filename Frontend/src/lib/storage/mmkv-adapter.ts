import { StateStorage } from 'zustand/middleware';

// Storage independiente, no importa de mmkv.ts para evitar el error en cadena
let storage: any;

try {
  const { MMKV } = require('react-native-mmkv');
  storage = new MMKV();
} catch (e) {
  const memory = new Map<string, string>();
  storage = {
    set: (key: string, value: string) => memory.set(key, value),
    getString: (key: string) => memory.get(key) ?? null,
    delete: (key: string) => memory.delete(key),
  };
}

export const zustandStorage: StateStorage = {
  setItem: (name, value) => {
    return storage.set(name, value);
  },
  getItem: (name) => {
    const value = storage.getString(name);
    return value ?? null;
  },
  removeItem: (name) => {
    return storage.delete(name);
  },
};