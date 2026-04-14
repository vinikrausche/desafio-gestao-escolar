import type { Classroom } from '../classroom.types';
import {
  defaultClassroomShiftFilter,
  filterClassrooms,
} from './classroom-list-filter.model';

const classroomsFixture: Classroom[] = [
  {
    id: 'classroom-1',
    name: '6º Ano A',
    schoolYear: '2026',
    shift: 'morning',
  },
  {
    id: 'classroom-2',
    name: '7º Ano B',
    schoolYear: '2027',
    shift: 'night',
  },
];

describe('classroom-list-filter.model', () => {
  it('filtra turmas pelo texto considerando nome e ano letivo', () => {
    const filteredClassrooms = filterClassrooms({
      classrooms: classroomsFixture,
      searchTerm: '2027',
      shiftFilter: defaultClassroomShiftFilter,
    });

    expect(filteredClassrooms).toEqual([classroomsFixture[1]]);
  });

  it('permite localizar a turma pelo rótulo do turno', () => {
    const filteredClassrooms = filterClassrooms({
      classrooms: classroomsFixture,
      searchTerm: 'manha',
      shiftFilter: defaultClassroomShiftFilter,
    });

    expect(filteredClassrooms).toEqual([classroomsFixture[0]]);
  });

  it('aplica o filtro por turno', () => {
    const filteredClassrooms = filterClassrooms({
      classrooms: classroomsFixture,
      searchTerm: '',
      shiftFilter: 'night',
    });

    expect(filteredClassrooms).toEqual([classroomsFixture[1]]);
  });
});
