import { schoolModel } from './school';

export const mockSchoolModel = {
  createClassroom: schoolModel.createClassroom,
  createSchool: schoolModel.create,
  deleteClassroom: schoolModel.deleteClassroom,
  deleteSchool: schoolModel.delete,
  getSchool: schoolModel.get,
  listClassrooms: schoolModel.listClassrooms,
  listSchools: schoolModel.list,
  updateClassroom: schoolModel.updateClassroom,
  updateSchool: schoolModel.update,
};
