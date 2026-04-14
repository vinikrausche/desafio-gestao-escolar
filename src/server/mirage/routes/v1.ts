import type { Server } from 'miragejs';

import { registerClassroomRoutes } from './classrooms';
import { registerSchoolRoutes } from './schools';

export function registerV1Routes(server: Server) {
  registerSchoolRoutes(server);
  registerClassroomRoutes(server);
}
