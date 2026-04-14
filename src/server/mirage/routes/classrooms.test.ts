import type { Server } from 'miragejs';

import { classroomModel } from '../models/mock-school.model';
import { registerClassroomRoutes } from './classrooms';

jest.mock('../models/mock-school.model', () => ({
  classroomModel: {
    createClass: jest.fn(),
    createClassroom: jest.fn(),
    deleteClass: jest.fn(),
    deleteClassroom: jest.fn(),
    getClass: jest.fn(),
    listClasses: jest.fn(),
    listClassrooms: jest.fn(),
    updateClass: jest.fn(),
    updateClassroom: jest.fn(),
  },
  schoolModel: {
    get: jest.fn(),
  },
}));

type RouteRegistrar = Pick<Server, 'delete' | 'get' | 'post' | 'put'>;
type RouteHandler = (schema: never, request: never) => unknown;

function createServerStub(): jest.Mocked<RouteRegistrar> {
  return {
    delete: jest.fn(),
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
  };
}

function registerRoutes(server: jest.Mocked<RouteRegistrar>) {
  registerClassroomRoutes(server as unknown as Server);
}

describe('registerClassroomRoutes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('registra o recurso literal /classes', () => {
    const server = createServerStub();

    registerRoutes(server);

    expect(server.get).toHaveBeenCalledWith('/classes', expect.any(Function));
    expect(server.get).toHaveBeenCalledWith(
      '/classes/:classroomId',
      expect.any(Function),
    );
    expect(server.post).toHaveBeenCalledWith('/classes', expect.any(Function));
    expect(server.put).toHaveBeenCalledWith(
      '/classes/:classroomId',
      expect.any(Function),
    );
    expect(server.delete).toHaveBeenCalledWith(
      '/classes/:classroomId',
      expect.any(Function),
    );
  });

  it('mantem o recurso aninhado por escola para o app atual', () => {
    const server = createServerStub();

    registerRoutes(server);

    expect(server.get).toHaveBeenCalledWith(
      '/schools/:schoolId/classrooms',
      expect.any(Function),
    );
    expect(server.post).toHaveBeenCalledWith(
      '/schools/:schoolId/classrooms',
      expect.any(Function),
    );
    expect(server.put).toHaveBeenCalledWith(
      '/schools/:schoolId/classrooms/:classroomId',
      expect.any(Function),
    );
    expect(server.delete).toHaveBeenCalledWith(
      '/schools/:schoolId/classrooms/:classroomId',
      expect.any(Function),
    );
  });

  it('delega a listagem plana ao modelo compartilhado', () => {
    const server = createServerStub();
    registerRoutes(server);

    const flatClassesHandler = server.get.mock.calls.find(
      ([path]) => path === '/classes',
    )?.[1] as RouteHandler | undefined;

    flatClassesHandler?.(
      undefined as never,
      {
        params: {},
        queryParams: {
          schoolId: 'school-seed-1',
        },
        requestBody: '',
      } as never,
    );

    expect(classroomModel.listClasses).toHaveBeenCalledWith('school-seed-1');
  });
});
