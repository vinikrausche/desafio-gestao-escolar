import type {
  SchoolFormErrors,
  SchoolFormField,
  SchoolFormValues,
} from '../../../../types/features/schools/school-form.types';

export type SchoolFormProps = {
  errors: SchoolFormErrors;
  formValues: SchoolFormValues;
  isSubmitting: boolean;
  onCancel: () => void;
  onFieldChange: (field: SchoolFormField, value: string) => void;
  onSubmit: () => void;
  submitLabel?: string;
};
