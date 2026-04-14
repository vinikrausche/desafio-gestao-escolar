import { useEffect } from 'react';

import { useSchoolsStore } from '../store/schools.store';

export function useSchoolResource(schoolId: string) {
  const errorMessage = useSchoolsStore((state) => state.errorMessage);
  const loadSchools = useSchoolsStore((state) => state.loadSchools);
  const school = useSchoolsStore((state) => state.schoolsById[schoolId]);
  const status = useSchoolsStore((state) => state.status);

  useEffect(() => {
    void loadSchools().catch(() => undefined);
  }, [loadSchools]);

  async function refreshSchool() {
    return loadSchools({ force: true });
  }

  const isLoadingSchool =
    (status === 'idle' || status === 'loading') && !school;
  const hasSchoolLoadError = status === 'error' && !school;
  const isSchoolMissing = status === 'ready' && !school;

  return {
    errorMessage,
    hasSchoolLoadError,
    isLoadingSchool,
    isSchoolMissing,
    refreshSchool,
    school,
    status,
  };
}
