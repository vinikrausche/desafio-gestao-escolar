import { FormActions } from '../../../components/forms/form-actions';
import { FormCard } from '../../../components/forms/form-card';
import { FormTextInput } from '../../../components/forms/form-text-input';
import type { SchoolFormProps } from './types/school-form.types';

export function SchoolForm({
  errors,
  formValues,
  isSubmitting,
  onCancel,
  onFieldChange,
  onSubmit,
  submitLabel = 'Salvar escola',
}: SchoolFormProps) {
  return (
    <FormCard errorMessage={errors.form}>
      <FormTextInput
        autoCapitalize="words"
        errorMessage={errors.name}
        label="Nome"
        onChangeText={(value) => onFieldChange('name', value)}
        placeholder="Nome da escola"
        value={formValues.name}
      />

      <FormTextInput
        autoCapitalize="words"
        errorMessage={errors.address}
        helperMessage="Inclua rua, numero e um ponto de referencia curto."
        label="Endereco"
        multiline
        numberOfLines={4}
        onChangeText={(value) => onFieldChange('address', value)}
        placeholder="Endereco da escola"
        value={formValues.address}
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
