import { normalizeSearchText } from '../../../lib/text/normalize-search-text';
import type { SchoolSummary } from '../../../types/features/schools/school.types';
import type { SchoolStatusFilter } from '../../../types/features/schools/school-filter.types';

export const schoolStatusFilterOptions = [
  {
    label: 'Todas',
    value: 'all',
  },
  {
    label: 'Com turmas',
    value: 'with-classrooms',
  },
  {
    label: 'Sem turmas',
    value: 'without-classrooms',
  },
] as const;

export type { SchoolStatusFilter } from '../../../types/features/schools/school-filter.types';

type FilterSchoolsParams = {
  schools: SchoolSummary[];
  searchTerm: string;
  statusFilter: SchoolStatusFilter;
};

export const defaultSchoolStatusFilter: SchoolStatusFilter = 'all';

export function filterSchools({
  schools,
  searchTerm,
  statusFilter,
}: FilterSchoolsParams) {
  const normalizedSearchTerm = normalizeSearchText(searchTerm);

  return schools.filter((school) => {
    const matchesStatus = matchesSchoolStatus(school, statusFilter);
    const matchesSearch = matchesSchoolSearch(school, normalizedSearchTerm);

    return matchesStatus && matchesSearch;
  });
}

function matchesSchoolStatus(
  school: SchoolSummary,
  statusFilter: SchoolStatusFilter,
) {
  if (statusFilter === 'all') {
    return true;
  }

  if (statusFilter === 'with-classrooms') {
    return school.classrooms.length > 0;
  }

  return school.classrooms.length === 0;
}

function matchesSchoolSearch(
  school: SchoolSummary,
  normalizedSearchTerm: string,
) {
  if (!normalizedSearchTerm) {
    return true;
  }

  // Inclui os nomes das turmas para permitir localizar a escola por um termo relacionado.
  const searchableContent = [
    school.name,
    school.address,
    school.classrooms.map((classroom) => classroom.name).join(' '),
  ].join(' ');

  return normalizeSearchText(searchableContent).includes(normalizedSearchTerm);
}
