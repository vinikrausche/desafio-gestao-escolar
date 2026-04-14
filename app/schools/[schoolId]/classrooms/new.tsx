import { VStack } from '@gluestack-ui/themed';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert } from 'react-native';

import { StateCard } from '../../../../src/components/feedback/state-card';
import { ScreenShell } from '../../../../src/components/layout/screen-shell';
import { ClassroomForm } from '../../../../src/features/classrooms/components/classroom-form';
import { useClassroomForm } from '../../../../src/features/classrooms/hooks/use-classroom-form';
import { classroomsScreenStyles as styles } from '../../../../src/features/classrooms/classrooms-screen.styles';
import { useSchoolResource } from '../../../../src/features/schools/hooks/use-school-resource';
import { useSchoolsStore } from '../../../../src/features/schools/store/schools.store';
import { resolveRouteParam } from '../../../../src/lib/router/resolve-route-param';

export default function NewClassroomScreen() {
  const router = useRouter();
  const { schoolId } = useLocalSearchParams<{ schoolId?: string | string[] }>();
  const resolvedSchoolId = resolveRouteParam(schoolId, 'unknown-school');
  const createClassroom = useSchoolsStore((state) => state.createClassroom);
  const {
    errorMessage,
    hasSchoolLoadError,
    isLoadingSchool,
    isSchoolMissing,
    refreshSchool,
  } = useSchoolResource(resolvedSchoolId);
  const currentSchoolYear = String(new Date().getFullYear());
  const { errors, formValues, getCreatePayload, setFormError, updateField } =
    useClassroomForm({
      schoolYear: currentSchoolYear,
      shift: 'morning',
    });
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit() {
    const payload = getCreatePayload();

    if (!payload) {
      return;
    }

    try {
      setIsSubmitting(true);
      await createClassroom(resolvedSchoolId, payload);
      router.replace({
        params: {
          schoolId: resolvedSchoolId,
        },
        pathname: '/schools/[schoolId]/classrooms',
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Nao foi possivel salvar a turma.';

      Alert.alert('Erro ao salvar', message);
      setFormError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <ScreenShell eyebrow="Turmas" title="Nova Turma">
      <VStack style={styles.content}>
        {isLoadingSchool ? (
          <StateCard
            align="center"
            layout="column"
            message="Carregando escola..."
            minHeight={96}
            showSpinner
            tone="surface"
          />
        ) : null}

        {hasSchoolLoadError ? (
          <StateCard
            actionLabel="Tentar novamente"
            message={errorMessage ?? 'Nao foi possivel carregar a escola.'}
            onAction={() => void refreshSchool()}
            tone="soft"
          />
        ) : null}

        {isSchoolMissing ? (
          <StateCard
            actionLabel="Voltar para escolas"
            actionVariant="secondary"
            message="Escola nao encontrada."
            onAction={() => router.replace('/schools')}
            tone="soft"
          />
        ) : null}

        {!isLoadingSchool && !hasSchoolLoadError && !isSchoolMissing ? (
          <ClassroomForm
            errors={errors}
            formValues={formValues}
            isSubmitting={isSubmitting}
            onCancel={() => router.back()}
            onFieldChange={updateField}
            onSubmit={handleSubmit}
          />
        ) : null}
      </VStack>
    </ScreenShell>
  );
}
