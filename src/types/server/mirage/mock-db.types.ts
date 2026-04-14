export type ClassroomRecord = {
  id: string;
  name: string;
  schoolYear: string;
  shift: 'morning' | 'afternoon' | 'night';
};

export type SchoolEntity = {
  address: string;
  classrooms: ClassroomRecord[];
  id: string;
  name: string;
};

export type MockDatabaseState = {
  schools: SchoolEntity[];
};
