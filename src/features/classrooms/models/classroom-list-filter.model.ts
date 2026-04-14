import { normalizeSearchText } from '../../../lib/text/normalize-search-text';
import {
  classroomShiftLabels,
  classroomShiftOptions,
} from '../classroom.constants';
import type { Classroom } from '../classroom.types';

export const classroomShiftFilterOptions = [
  {
    label: 'Todos',
    value: 'all',
  },
  ...classroomShiftOptions,
] as const;

export type ClassroomShiftFilter =
  (typeof classroomShiftFilterOptions)[number]['value'];

type FilterClassroomsParams = {
  classrooms: Classroom[];
  searchTerm: string;
  shiftFilter: ClassroomShiftFilter;
};

export const defaultClassroomShiftFilter: ClassroomShiftFilter = 'all';

export function filterClassrooms({
  classrooms,
  searchTerm,
  shiftFilter,
}: FilterClassroomsParams) {
  const normalizedSearchTerm = normalizeSearchText(searchTerm);

  return classrooms.filter((classroom) => {
    const matchesShift =
      shiftFilter === 'all' ? true : classroom.shift === shiftFilter;
    const matchesSearch = matchesClassroomSearch(
      classroom,
      normalizedSearchTerm,
    );

    return matchesShift && matchesSearch;
  });
}

function matchesClassroomSearch(
  classroom: Classroom,
  normalizedSearchTerm: string,
) {
  if (!normalizedSearchTerm) {
    return true;
  }

  // Considera o rótulo do turno para que a busca respeite o texto exibido na interface.
  const searchableContent = [
    classroom.name,
    classroom.schoolYear,
    classroomShiftLabels[classroom.shift],
  ].join(' ');

  return normalizeSearchText(searchableContent).includes(normalizedSearchTerm);
}
