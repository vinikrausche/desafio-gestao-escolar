import type { Server } from 'miragejs';

import { registerSchoolRoutes } from './schools';

export function registerV1Routes(server: Server) {
  registerSchoolRoutes(server);
}
