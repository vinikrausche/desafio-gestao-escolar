jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

// ! O setup centraliza defaults do runner para manter os testes previsiveis.
afterEach(() => {
  jest.restoreAllMocks();
});
