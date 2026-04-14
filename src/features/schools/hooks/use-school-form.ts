import { useCallback, useState } from 'react';

import {
  buildSchoolInput,
  buildUpdateSchoolInput,
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
    errors,
    formValues,
    getCreatePayload,
    getUpdatePayload,
    replaceFormValues,
    setFormError,
    updateField,
  };
}
