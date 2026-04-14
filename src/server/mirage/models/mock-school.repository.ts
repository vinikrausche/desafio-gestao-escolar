import {
  readMockDb,
  type ClassroomRecord,
  type MockDatabaseState,
  type SchoolEntity,
  writeMockDb,
} from '../seeds/in-memory-db';

type SchoolWithClassroomMatch = {
  classroom: ClassroomRecord;
  school: SchoolEntity;
};

// Centraliza o acesso ao banco mockado para os modelos focarem só na regra de negócio.
export class MockSchoolRepository {
  public listSchools(): SchoolEntity[] {
    return this.readSnapshot().schools;
  }

  public getSchoolById(schoolId: string): SchoolEntity | undefined {
    return this.readSnapshot().schools.find((school) => school.id === schoolId);
  }

  public getSchoolWithClassroom(
    classroomId: string,
  ): SchoolWithClassroomMatch | undefined {
    for (const school of this.readSnapshot().schools) {
      const classroom = this.findClassroomById(school.classrooms, classroomId);

      if (classroom) {
        return {
          classroom,
          school,
        };
      }
    }

    return undefined;
  }

  public async createSchool(school: SchoolEntity): Promise<void> {
    const snapshot = this.readSnapshot();

    await this.writeSnapshot({
      ...snapshot,
      schools: [...snapshot.schools, school],
    });
  }

  public async updateSchool(nextSchool: SchoolEntity): Promise<void> {
    const snapshot = this.readSnapshot();

    await this.writeSnapshot({
      ...snapshot,
      schools: this.replaceSchool(snapshot.schools, nextSchool),
    });
  }

  public async deleteSchool(schoolId: string): Promise<boolean> {
    const snapshot = this.readSnapshot();
    const nextSchools = snapshot.schools.filter(
      (school) => school.id !== schoolId,
    );

    if (nextSchools.length === snapshot.schools.length) {
      return false;
    }

    await this.writeSnapshot({
      ...snapshot,
      schools: nextSchools,
    });

    return true;
  }

  private readSnapshot(): MockDatabaseState {
    return readMockDb();
  }

  private async writeSnapshot(nextState: MockDatabaseState): Promise<void> {
    await writeMockDb(nextState);
  }

  private replaceSchool(
    schools: SchoolEntity[],
    nextSchool: SchoolEntity,
  ): SchoolEntity[] {
    return schools.map((school) =>
      school.id === nextSchool.id ? nextSchool : school,
    );
  }

  private findClassroomById(
    classrooms: ClassroomRecord[],
    classroomId: string,
  ): ClassroomRecord | undefined {
    return classrooms.find((classroom) => classroom.id === classroomId);
  }
}
