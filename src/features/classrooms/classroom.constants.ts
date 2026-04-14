import type { ClassroomShift } from './classroom.types';

export const classroomShiftLabels: Record<ClassroomShift, string> = {
  afternoon: 'Tarde',
  morning: 'Manhã',
  night: 'Noite',
};

export const classroomShiftOptions = [
  {
    label: classroomShiftLabels.morning,
    value: 'morning',
  },
  {
    label: classroomShiftLabels.afternoon,
    value: 'afternoon',
  },
  {
    label: classroomShiftLabels.night,
    value: 'night',
  },
] as const;
