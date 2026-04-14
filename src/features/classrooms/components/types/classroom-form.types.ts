import type {
  ClassroomFormErrors,
  ClassroomFormField,
  ClassroomFormValues,
} from '../../../../types/features/classrooms/classroom-form.types';

export type ClassroomFormProps = {
  errors: ClassroomFormErrors;
  formValues: ClassroomFormValues;
  isSubmitting: boolean;
  onCancel: () => void;
  onFieldChange: (field: ClassroomFormField, value: string) => void;
  onSubmit: () => void;
  submitLabel?: string;
};
