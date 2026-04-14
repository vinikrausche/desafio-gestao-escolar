import { FormActions } from '../../../components/forms/form-actions';
import { FormCard } from '../../../components/forms/form-card';
import { FormOptionGroup } from '../../../components/forms/form-option-group';
import { FormTextInput } from '../../../components/forms/form-text-input';
import { classroomShiftOptions } from '../classroom.constants';
import type {
  ClassroomFormErrors,
  ClassroomFormField,
  ClassroomFormValues,
} from '../models/classroom-form.model';

type ClassroomFormProps = {
  errors: ClassroomFormErrors;
  formValues: ClassroomFormValues;
  isSubmitting: boolean;
  onCancel: () => void;
  onFieldChange: (field: ClassroomFormField, value: string) => void;
  onSubmit: () => void;
  submitLabel?: string;
};

export function ClassroomForm({
  errors,
  formValues,
  isSubmitting,
  onCancel,
  onFieldChange,
  onSubmit,
  submitLabel = 'Salvar turma',
}: ClassroomFormProps) {
  return (
    <FormCard errorMessage={errors.form}>
      <FormTextInput
        autoCapitalize="words"
        errorMessage={errors.name}
        label="Nome da turma"
        onChangeText={(value) => onFieldChange('name', value)}
        placeholder="Ex.: 6º Ano A"
        value={formValues.name}
      />

      <FormOptionGroup
        errorMessage={errors.shift}
        helperMessage="Selecione o turno em que a turma acontece."
        label="Turno"
        onChange={(value) => onFieldChange('shift', value)}
        options={classroomShiftOptions}
        value={formValues.shift}
      />

      <FormTextInput
        errorMessage={errors.schoolYear}
        helperMessage="Use o ano com 4 dígitos, ex.: 2026."
        keyboardType="number-pad"
        label="Ano letivo"
        onChangeText={(value) => onFieldChange('schoolYear', value)}
        placeholder="2026"
        value={formValues.schoolYear}
      />

      <FormActions
        isPrimaryDisabled={isSubmitting}
        isSecondaryDisabled={isSubmitting}
        onPrimaryPress={() => void onSubmit()}
        onSecondaryPress={onCancel}
        primaryLabel={isSubmitting ? 'Salvando...' : submitLabel}
      />
    </FormCard>
  );
}
