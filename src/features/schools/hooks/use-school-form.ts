import { useCallback, useState } from 'react';

import {
  buildSchoolInput,
  buildUpdateSchoolInput,
  createEmptySchoolFormClassroom,
  createInitialSchoolFormValues,
  type SchoolFormErrors,
  type SchoolFormField,
  type SchoolFormValues,
} from '../models/school-form.model';

export function useSchoolForm(defaultValues: Partial<SchoolFormValues> = {}) {
  const [errors, setErrors] = useState<SchoolFormErrors>({});
  const [formValues, setFormValues] = useState<SchoolFormValues>(() =>
    createInitialSchoolFormValues(defaultValues),
  );

  const clearFieldError = useCallback((field: SchoolFormField) => {
    setErrors((current) => ({
      ...current,
      [field]: undefined,
      form: undefined,
    }));
  }, []);

  const clearClassroomError = useCallback((classroomId: string) => {
    setErrors((current) => {
      if (!current.classrooms?.[classroomId]) {
        return current;
      }

      const nextClassrooms = { ...current.classrooms };
      delete nextClassrooms[classroomId];

      return {
        ...current,
        classrooms:
          Object.keys(nextClassrooms).length > 0 ? nextClassrooms : undefined,
        form: undefined,
      };
    });
  }, []);

  const updateField = useCallback(
    (field: SchoolFormField, value: string) => {
      setFormValues((current) => ({
        ...current,
        [field]: value,
      }));

      clearFieldError(field);
    },
    [clearFieldError],
  );

  const addClassroom = useCallback(() => {
    setFormValues((current) => ({
      ...current,
      classrooms: [...current.classrooms, createEmptySchoolFormClassroom()],
    }));
  }, []);

  const removeClassroom = useCallback(
    (classroomId: string) => {
      setFormValues((current) => ({
        ...current,
        classrooms: current.classrooms.filter(
          (classroom) => classroom.id !== classroomId,
        ),
      }));

      clearClassroomError(classroomId);
    },
    [clearClassroomError],
  );

  const replaceFormValues = useCallback((values: Partial<SchoolFormValues>) => {
    setFormValues(createInitialSchoolFormValues(values));
    setErrors({});
  }, []);

  const setFormError = useCallback((message: string) => {
    setErrors((current) => ({
      ...current,
      form: message,
    }));
  }, []);

  const updateClassroom = useCallback(
    (classroomId: string, value: string) => {
      setFormValues((current) => ({
        ...current,
        classrooms: current.classrooms.map((classroom) =>
          classroom.id === classroomId
            ? { ...classroom, name: value }
            : classroom,
        ),
      }));

      clearClassroomError(classroomId);
    },
    [clearClassroomError],
  );

  const getCreatePayload = useCallback(() => {
    const result = buildSchoolInput(formValues);

    if (!result.success) {
      setErrors(result.errors);
      return null;
    }

    return result.data;
  }, [formValues]);

  const getUpdatePayload = useCallback(() => {
    const result = buildUpdateSchoolInput(formValues);

    if (!result.success) {
      setErrors(result.errors);
      return null;
    }

    return result.data;
  }, [formValues]);

  return {
    addClassroom,
    errors,
    formValues,
    getCreatePayload,
    getUpdatePayload,
    removeClassroom,
    replaceFormValues,
    setFormError,
    updateClassroom,
    updateField,
  };
}
