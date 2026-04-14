import { useCallback, useState } from 'react';

import {
  buildClassroomInput,
  buildUpdateClassroomInput,
  createInitialClassroomFormValues,
  type ClassroomFormErrors,
  type ClassroomFormField,
  type ClassroomFormValues,
} from '../models/classroom-form.model';

export function useClassroomForm(
  defaultValues: Partial<ClassroomFormValues> = {},
) {
  const [errors, setErrors] = useState<ClassroomFormErrors>({});
  const [formValues, setFormValues] = useState<ClassroomFormValues>(() =>
    createInitialClassroomFormValues(defaultValues),
  );

  const clearFieldError = useCallback((field: ClassroomFormField) => {
    setErrors((current) => ({
      ...current,
      [field]: undefined,
      form: undefined,
    }));
  }, []);

  const replaceFormValues = useCallback(
    (values: Partial<ClassroomFormValues>) => {
      setFormValues(createInitialClassroomFormValues(values));
      setErrors({});
    },
    [],
  );

  const setFormError = useCallback((message: string) => {
    setErrors((current) => ({
      ...current,
      form: message,
    }));
  }, []);

  const updateField = useCallback(
    (field: ClassroomFormField, value: string) => {
      setFormValues((current) => ({
        ...current,
        [field]: value,
      }));

      clearFieldError(field);
    },
    [clearFieldError],
  );

  const getCreatePayload = useCallback(() => {
    const result = buildClassroomInput(formValues);

    if (!result.success) {
      setErrors(result.errors);
      return null;
    }

    return result.data;
  }, [formValues]);

  const getUpdatePayload = useCallback(() => {
    const result = buildUpdateClassroomInput(formValues);

    if (!result.success) {
      setErrors(result.errors);
      return null;
    }

    return result.data;
  }, [formValues]);

  return {
    errors,
    formValues,
    getCreatePayload,
    getUpdatePayload,
    replaceFormValues,
    setFormError,
    updateField,
  };
}
