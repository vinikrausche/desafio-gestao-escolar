import { useCallback, useRef, useState } from 'react';

import {
  buildSchoolInput,
  buildUpdateSchoolInput,
  createInitialSchoolFormValues,
  type SchoolFormErrors,
  type SchoolFormField,
  type SchoolFormValues,
} from '../models/school-form.model';
import { formatPostalCode } from '../models/cep.model';
import { lookupPostalCode } from '../services/cep.service';

export function useSchoolForm(defaultValues: Partial<SchoolFormValues> = {}) {
  const formValuesRef = useRef<SchoolFormValues>(
    createInitialSchoolFormValues(defaultValues),
  );
  const [errors, setErrors] = useState<SchoolFormErrors>({});
  const [formValues, setFormValues] = useState<SchoolFormValues>(
    formValuesRef.current,
  );
  const [isPostalCodeLookupLoading, setIsPostalCodeLookupLoading] =
    useState(false);

  const commitFormValues = useCallback(
    (
      updater:
        | SchoolFormValues
        | ((current: SchoolFormValues) => SchoolFormValues),
    ) => {
      setFormValues((current) => {
        const nextValues =
          typeof updater === 'function' ? updater(current) : updater;

        formValuesRef.current = nextValues;

        return nextValues;
      });
    },
    [],
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
      commitFormValues((current) => ({
        ...current,
        [field]: field === 'postalCode' ? formatPostalCode(value) : value,
      }));

      clearFieldError(field);
    },
    [clearFieldError, commitFormValues],
  );

  const addPhotoUris = useCallback(
    (uris: string[]) => {
      commitFormValues((current) => {
        const nextPhotoUris = Array.from(
          new Set([...current.photoUris, ...uris.filter(Boolean)]),
        );

        return {
          ...current,
          photoUris: nextPhotoUris,
        };
      });

      setErrors((current) => ({
        ...current,
        form: undefined,
        photos: undefined,
      }));
    },
    [commitFormValues],
  );

  const removePhotoUri = useCallback(
    (uri: string) => {
      commitFormValues((current) => ({
        ...current,
        photoUris: current.photoUris.filter((photoUri) => photoUri !== uri),
      }));
    },
    [commitFormValues],
  );

  const replaceFormValues = useCallback(
    (values: Partial<SchoolFormValues>) => {
      commitFormValues(createInitialSchoolFormValues(values));
      setErrors({});
    },
    [commitFormValues],
  );

  const setFormError = useCallback((message: string) => {
    setErrors((current) => ({
      ...current,
      form: message,
    }));
  }, []);

  const setFieldError = useCallback(
    (field: keyof SchoolFormErrors, message: string) => {
      setErrors((current) => ({
        ...current,
        [field]: message,
      }));
    },
    [],
  );

  const lookupAddressByPostalCode = useCallback(async () => {
    try {
      const currentValues = formValuesRef.current;

      setIsPostalCodeLookupLoading(true);
      const address = await lookupPostalCode(currentValues.postalCode);
      const nextAddressValues = {
        address: address.address || currentValues.address,
        city: address.city || currentValues.city,
        district: address.district || currentValues.district,
        postalCode: address.postalCode,
        state: address.state || currentValues.state,
      };

      commitFormValues((current) => ({
        ...current,
        ...nextAddressValues,
      }));

      setErrors((current) => ({
        ...current,
        address: undefined,
        city: undefined,
        district: undefined,
        form: undefined,
        postalCode: undefined,
        state: undefined,
      }));

      return nextAddressValues;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Nao foi possivel buscar CEP.';

      setFieldError('postalCode', message);
      return null;
    } finally {
      setIsPostalCodeLookupLoading(false);
    }
  }, [commitFormValues, setFieldError]);

  const getCreatePayload = useCallback(
    (overrides: Partial<SchoolFormValues> = {}) => {
      const result = buildSchoolInput(
        createInitialSchoolFormValues({
          ...formValuesRef.current,
          ...overrides,
        }),
      );

      if (!result.success) {
        setErrors(result.errors);
        return null;
      }

      return result.data;
    },
    [],
  );

  const getUpdatePayload = useCallback(
    (overrides: Partial<SchoolFormValues> = {}) => {
      const result = buildUpdateSchoolInput(
        createInitialSchoolFormValues({
          ...formValuesRef.current,
          ...overrides,
        }),
      );

      if (!result.success) {
        setErrors(result.errors);
        return null;
      }

      return result.data;
    },
    [],
  );

  return {
    addPhotoUris,
    errors,
    formValues,
    getCreatePayload,
    getUpdatePayload,
    isPostalCodeLookupLoading,
    lookupAddressByPostalCode,
    replaceFormValues,
    removePhotoUri,
    setFieldError,
    setFormError,
    updateField,
  };
}
