import { Heading, Text, VStack } from '@gluestack-ui/themed';

import { AppButton } from '../../../components/actions/app-button';
import { FormActions } from '../../../components/forms/form-actions';
import { FormCard } from '../../../components/forms/form-card';
import { FormTextInput } from '../../../components/forms/form-text-input';
import { ClassroomFormCard } from './classroom-form-card';
import type {
  SchoolFormErrors,
  SchoolFormField,
  SchoolFormValues,
} from '../models/school-form.model';
import { schoolFormStyles as styles } from './school-form.styles';

type SchoolFormProps = {
  errors: SchoolFormErrors;
  formValues: SchoolFormValues;
  isSubmitting: boolean;
  onAddClassroom: () => void;
  onCancel: () => void;
  onClassroomChange: (classroomId: string, value: string) => void;
  onFieldChange: (field: SchoolFormField, value: string) => void;
  onRemoveClassroom: (classroomId: string) => void;
  onSubmit: () => void;
  submitLabel?: string;
};

export function SchoolForm({
  errors,
  formValues,
  isSubmitting,
  onAddClassroom,
  onCancel,
  onClassroomChange,
  onFieldChange,
  onRemoveClassroom,
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

      <VStack style={styles.section}>
        <VStack style={styles.sectionHeader}>
          <Heading size="sm" style={styles.sectionTitle}>
            Turmas
          </Heading>
          <Text style={styles.sectionHelper}>
            Vincule as turmas da escola agora ou deixe para cadastrar depois.
          </Text>
        </VStack>

        <AppButton
          accessibilityLabel="Adicionar turma"
          align="start"
          label="Adicionar turma"
          onPress={onAddClassroom}
          size="sm"
          variant="soft"
        />

        {formValues.classrooms.length === 0 ? (
          <Text style={styles.classroomHelper}>Nenhuma turma adicionada.</Text>
        ) : null}

        {formValues.classrooms.map((classroom, index) => (
          <ClassroomFormCard
            classroom={classroom}
            errorMessage={errors.classrooms?.[classroom.id]}
            index={index}
            key={classroom.id}
            onChange={(value) => onClassroomChange(classroom.id, value)}
            onRemove={() => onRemoveClassroom(classroom.id)}
          />
        ))}
      </VStack>

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
