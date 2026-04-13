import type { Server } from 'miragejs';
import { registerV1Routes } from './v1';

export function handlers(server: Server) {
  registerV1Routes(server);
}
