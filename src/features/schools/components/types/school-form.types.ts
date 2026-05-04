import type {
  SchoolFormErrors,
  SchoolFormField,
  SchoolFormValues,
} from '../../../../types/features/schools/school-form.types';

export type SchoolFormProps = {
  errors: SchoolFormErrors;
  formValues: SchoolFormValues;
  isPostalCodeLookupLoading?: boolean;
  isSubmitting: boolean;
  onAddPhotos: () => void;
  onCancel: () => void;
  onFieldChange: (field: SchoolFormField, value: string) => void;
  onPostalCodeLookup: () => void;
  onRemovePhoto: (uri: string) => void;
  onSubmit: () => void;
  submitLabel?: string;
};
