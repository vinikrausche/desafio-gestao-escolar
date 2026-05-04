import 'react-native-url-polyfill/auto';

import { createServer, type Server } from 'miragejs';

import { API_BASE_URL } from '../../lib/api/constants';
import { handlers } from './routes';
import { hydrateMockDb } from './seeds/in-memory-db';

declare global {
  var __mirageServer__: Server | undefined;
}

function makeServer() {
  return createServer({
    environment: 'development',
    routes() {
      this.timing = 0;
      this.urlPrefix = API_BASE_URL;

      handlers(this);

      this.passthrough('https://viacep.com.br/**');
    },
  });
}

export async function startMockServer() {
  if (!globalThis.__mirageServer__) {
    await hydrateMockDb();
    globalThis.__mirageServer__ = makeServer();
  }

  return globalThis.__mirageServer__;
}
