import { schoolModel } from './school';

export const mockSchoolModel = {
  createClass: schoolModel.createClass,
  createClassroom: schoolModel.createClassroom,
  createSchool: schoolModel.create,
  deleteClass: schoolModel.deleteClass,
  deleteClassroom: schoolModel.deleteClassroom,
  deleteSchool: schoolModel.delete,
  getClass: schoolModel.getClass,
  getSchool: schoolModel.get,
  listClasses: schoolModel.listClasses,
  listClassrooms: schoolModel.listClassrooms,
  listSchools: schoolModel.list,
  updateClass: schoolModel.updateClass,
  updateClassroom: schoolModel.updateClassroom,
  updateSchool: schoolModel.update,
};
