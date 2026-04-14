export const classroomShiftValues = ['morning', 'afternoon', 'night'] as const;

export type ClassroomShift = (typeof classroomShiftValues)[number];

export type Classroom = {
  id: string;
  name: string;
  schoolYear: string;
  shift: ClassroomShift;
};

export type ClassroomInput = {
  id?: string;
  name: string;
  schoolYear: string;
  shift: ClassroomShift;
};

export type CreateClassroomInput = Omit<ClassroomInput, 'id'>;
export type UpdateClassroomInput = CreateClassroomInput;
