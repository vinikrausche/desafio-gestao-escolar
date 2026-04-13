import { Text, VStack } from '@gluestack-ui/themed';

import { AppButton } from '../../../components/actions/app-button';
import { FormTextInput } from '../../../components/forms/form-text-input';
import type { SchoolFormClassroomValues } from '../models/school-form.model';
import { schoolFormStyles as styles } from './school-form.styles';

type ClassroomFormCardProps = {
  classroom: SchoolFormClassroomValues;
  errorMessage?: string;
  index: number;
  onChange: (value: string) => void;
  onRemove: () => void;
};

export function ClassroomFormCard({
  classroom,
  errorMessage,
  index,
  onChange,
  onRemove,
}: ClassroomFormCardProps) {
  return (
    <VStack style={styles.classroomCard}>
      <VStack style={styles.classroomCardContent}>
        <VStack style={styles.classroomHeader}>
          <Text style={styles.classroomTitle}>{`Turma ${index + 1}`}</Text>
        </VStack>

        <FormTextInput
          autoCapitalize="words"
          errorMessage={errorMessage}
          label="Nome da turma"
          onChangeText={onChange}
          placeholder="Ex.: 6º Ano A"
          value={classroom.name}
        />

        <AppButton
          accessibilityLabel={`Remover turma ${index + 1}`}
          align="start"
          label="Remover turma"
          onPress={onRemove}
          size="compact"
          variant="dangerSoft"
        />
      </VStack>
    </VStack>
  );
}
