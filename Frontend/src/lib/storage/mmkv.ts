let storage: any;

try {
  // Intenta usar MMKV nativo
  const { MMKV } = require('react-native-mmkv');
  storage = new MMKV();
} catch (e) {
  // Fallback en memoria para que no te bloquee en Expo Go
  console.log('MMKV no nativo, usando memoria temporal');
  const memory = new Map<string, string>();
  storage = {
    set: (key: string, value: string) => memory.set(key, value),
    getString: (key: string) => memory.get(key) ?? null,
    delete: (key: string) => memory.delete(key),
  };
}
