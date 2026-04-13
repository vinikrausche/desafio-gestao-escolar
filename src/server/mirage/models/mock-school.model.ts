import { schoolModel } from './school';

export const mockSchoolModel = {
  createSchool: schoolModel.create,
  deleteSchool: schoolModel.delete,
  getSchool: schoolModel.get,
  listSchools: schoolModel.list,
  updateSchool: schoolModel.update,
};
