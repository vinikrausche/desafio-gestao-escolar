import { ClassroomModel } from './classroom.model';
import { MockSchoolRepository } from './mock-school.repository';
import { SchoolAggregateFactory } from './school-aggregate.factory';
import { SchoolModel } from './school.model';

const repository = new MockSchoolRepository();
const aggregateFactory = new SchoolAggregateFactory();

// As turmas vivem dentro do agregado de escola, por isso os dois modelos compartilham a mesma infraestrutura.
export const schoolModel = new SchoolModel(repository, aggregateFactory);
export const classroomModel = new ClassroomModel(repository, aggregateFactory);
