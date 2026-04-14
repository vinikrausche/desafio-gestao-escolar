import type { SchoolSummary } from '../school.types';
import {
  defaultSchoolStatusFilter,
  filterSchools,
} from './school-list-filter.model';

const schoolsFixture: SchoolSummary[] = [
  {
    address: 'Rua das Flores, 10',
    classrooms: [
      {
        id: 'classroom-1',
        name: '6º Ano A',
        schoolYear: '2026',
        shift: 'morning',
      },
    ],
    id: 'school-1',
    name: 'Escola João da Silva',
  },
  {
    address: 'Avenida Brasil, 200',
    classrooms: [],
    id: 'school-2',
    name: 'Escola Maria de Souza',
  },
];

describe('school-list-filter.model', () => {
  it('filtra escolas pelo texto considerando acentos e maiusculas', () => {
    const filteredSchools = filterSchools({
      schools: schoolsFixture,
      searchTerm: 'joao',
      statusFilter: defaultSchoolStatusFilter,
    });

    expect(filteredSchools).toEqual([schoolsFixture[0]]);
  });

  it('permite localizar a escola pelo nome da turma', () => {
    const filteredSchools = filterSchools({
      schools: schoolsFixture,
      searchTerm: '6 ano',
      statusFilter: defaultSchoolStatusFilter,
    });

    expect(filteredSchools).toEqual([schoolsFixture[0]]);
  });

  it('aplica o filtro de escolas com turmas', () => {
    const filteredSchools = filterSchools({
      schools: schoolsFixture,
      searchTerm: '',
      statusFilter: 'with-classrooms',
    });

    expect(filteredSchools).toEqual([schoolsFixture[0]]);
  });

  it('aplica o filtro de escolas sem turmas', () => {
    const filteredSchools = filterSchools({
      schools: schoolsFixture,
      searchTerm: '',
      statusFilter: 'without-classrooms',
    });

    expect(filteredSchools).toEqual([schoolsFixture[1]]);
  });
});
