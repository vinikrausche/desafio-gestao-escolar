import { VStack } from '@gluestack-ui/themed';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

import { StateCard } from '../../../../../src/components/feedback/state-card';
import { ScreenShell } from '../../../../../src/components/layout/screen-shell';
import { ClassroomForm } from '../../../../../src/features/classrooms/components/classroom-form';
import { useClassroomForm } from '../../../../../src/features/classrooms/hooks/use-classroom-form';
import { classroomsScreenStyles as styles } from '../../../../../src/features/classrooms/classrooms-screen.styles';
import { useSchoolResource } from '../../../../../src/features/schools/hooks/use-school-resource';
import { useSchoolsStore } from '../../../../../src/features/schools/store/schools.store';
import { resolveRouteParam } from '../../../../../src/lib/router/resolve-route-param';

export default function EditClassroomScreen() {
  const router = useRouter();
  const { classroomId, schoolId } = useLocalSearchParams<{
    classroomId?: string | string[];
    schoolId?: string | string[];
  }>();
  const resolvedClassroomId = resolveRouteParam(
    classroomId,
    'unknown-classroom',
  );
  const resolvedSchoolId = resolveRouteParam(schoolId, 'unknown-school');
  const updateClassroom = useSchoolsStore((state) => state.updateClassroom);
  const {
    errorMessage,
    hasSchoolLoadError,
    isLoadingSchool,
    isSchoolMissing,
    refreshSchool,
    school,
  } = useSchoolResource(resolvedSchoolId);
  const {
    errors,
    formValues,
    getUpdatePayload,
    replaceFormValues,
    setFormError,
    updateField,
  } = useClassroomForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const classroom = school?.classrooms.find(
    (currentClassroom) => currentClassroom.id === resolvedClassroomId,
  );
  const isClassroomMissing = Boolean(school) && !classroom;

  useEffect(() => {
    if (!classroom) {
      return;
    }

    replaceFormValues({
      name: classroom.name,
      schoolYear: classroom.schoolYear,
      shift: classroom.shift,
    });
  }, [classroom, replaceFormValues]);

  async function handleSubmit() {
    const payload = getUpdatePayload();

    if (!payload) {
      return;
    }

    try {
      setIsSubmitting(true);
      await updateClassroom(resolvedSchoolId, resolvedClassroomId, payload);
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
          : 'Nao foi possivel atualizar a turma.';

      Alert.alert('Erro ao atualizar', message);
      setFormError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <ScreenShell eyebrow="Turmas" title="Editar Turma">
      <VStack style={styles.content}>
        {isLoadingSchool ? (
          <StateCard
            align="center"
            layout="column"
            message="Carregando turma..."
            minHeight={96}
            showSpinner
            tone="surface"
          />
        ) : null}

        {hasSchoolLoadError ? (
          <StateCard
            actionLabel="Tentar novamente"
            message={errorMessage ?? 'Nao foi possivel carregar a turma.'}
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

        {isClassroomMissing ? (
          <StateCard
            actionLabel="Voltar para turmas"
            actionVariant="secondary"
            message="Turma nao encontrada."
            onAction={() =>
              router.replace({
                params: {
                  schoolId: resolvedSchoolId,
                },
                pathname: '/schools/[schoolId]/classrooms',
              })
            }
            tone="soft"
          />
        ) : null}

        {!isLoadingSchool &&
        !hasSchoolLoadError &&
        !isSchoolMissing &&
        !isClassroomMissing ? (
          <ClassroomForm
            errors={errors}
            formValues={formValues}
            isSubmitting={isSubmitting}
            onCancel={() => router.back()}
            onFieldChange={updateField}
            onSubmit={handleSubmit}
            submitLabel="Salvar alteracoes"
          />
        ) : null}
      </VStack>
    </ScreenShell>
  );
}
