import { FormActions } from '../../../components/forms/form-actions';
import { FormCard } from '../../../components/forms/form-card';
import { FormTextInput } from '../../../components/forms/form-text-input';
import { AppButton } from '../../../components/actions/app-button';
import { SchoolPhotoPicker } from './school-photo-picker';
import type { SchoolFormProps } from './types/school-form.types';

export function SchoolForm({
  errors,
  formValues,
  isPostalCodeLookupLoading = false,
  isSubmitting,
  onAddPhotos,
  onCancel,
  onFieldChange,
  onPostalCodeLookup,
  onRemovePhoto,
  onSubmit,
  submitLabel = 'Salvar escola',
}: SchoolFormProps) {
  const isDisabled = isSubmitting || isPostalCodeLookupLoading;

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
        errorMessage={errors.postalCode}
        helperMessage="Digite o CEP para preencher o endereco automaticamente."
        keyboardType="number-pad"
        label="CEP"
        maxLength={9}
        onBlur={() => void onPostalCodeLookup()}
        onChangeText={(value) => onFieldChange('postalCode', value)}
        placeholder="00000-000"
        value={formValues.postalCode}
      />

      <AppButton
        isDisabled={isDisabled}
        label={isPostalCodeLookupLoading ? 'Buscando CEP...' : 'Buscar CEP'}
        onPress={onPostalCodeLookup}
        size="sm"
        variant="soft"
      />

      <FormTextInput
        autoCapitalize="words"
        errorMessage={errors.address}
        helperMessage="Campo preenchido pelo CEP, ajuste se necessario."
        label="Logradouro"
        onChangeText={(value) => onFieldChange('address', value)}
        placeholder="Rua, avenida ou travessa"
        value={formValues.address}
      />

      <FormTextInput
        errorMessage={undefined}
        keyboardType="numbers-and-punctuation"
        label="Numero"
        onChangeText={(value) => onFieldChange('addressNumber', value)}
        placeholder="Numero do predio"
        value={formValues.addressNumber}
      />

      <FormTextInput
        autoCapitalize="words"
        errorMessage={errors.district}
        label="Bairro"
        onChangeText={(value) => onFieldChange('district', value)}
        placeholder="Bairro"
        value={formValues.district}
      />

      <FormTextInput
        autoCapitalize="words"
        errorMessage={errors.city}
        label="Cidade"
        onChangeText={(value) => onFieldChange('city', value)}
        placeholder="Cidade"
        value={formValues.city}
      />

      <FormTextInput
        autoCapitalize="characters"
        errorMessage={errors.state}
        label="UF"
        maxLength={2}
        onChangeText={(value) => onFieldChange('state', value)}
        placeholder="UF"
        value={formValues.state}
      />

      <SchoolPhotoPicker
        isDisabled={isSubmitting}
        onAddPhotos={onAddPhotos}
        onRemovePhoto={onRemovePhoto}
        photoUris={formValues.photoUris}
      />

      <FormActions
        isPrimaryDisabled={isDisabled}
        isSecondaryDisabled={isDisabled}
        onPrimaryPress={() => void onSubmit()}
        onSecondaryPress={onCancel}
        primaryLabel={isSubmitting ? 'Salvando...' : submitLabel}
      />
    </FormCard>
  );
}
