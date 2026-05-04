export type ClassroomRecord = {
  id: string;
  name: string;
  schoolYear: string;
  shift: 'morning' | 'afternoon' | 'night';
};

export type SchoolEntity = {
  address: string;
  addressNumber: string;
  city: string;
  classrooms: ClassroomRecord[];
  district: string;
  id: string;
  name: string;
  photos: SchoolPhotoRecord[];
  postalCode: string;
  state: string;
};

export type SchoolPhotoRecord = {
  id: string;
  uri: string;
};

export type MockDatabaseState = {
  schools: SchoolEntity[];
};
