import { VStack } from '@gluestack-ui/themed';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

import { StateCard } from '../../../src/components/feedback/state-card';
import { ScreenShell } from '../../../src/components/layout/screen-shell';
import { useSchoolForm } from '../../../src/features/schools/hooks/use-school-form';
import { SchoolForm } from '../../../src/features/schools/components/school-form';
import { newSchoolScreenStyles as styles } from '../../../src/features/schools/new-school-screen.styles';
import { useSchoolsStore } from '../../../src/features/schools/store/schools.store';
import { resolveRouteParam } from '../../../src/lib/router/resolve-route-param';

export default function EditSchoolScreen() {
  const router = useRouter();
  const { schoolId } = useLocalSearchParams<{ schoolId?: string | string[] }>();
  const resolvedSchoolId = resolveRouteParam(schoolId, 'unknown-school');
  const loadSchools = useSchoolsStore((state) => state.loadSchools);
  const school = useSchoolsStore(
    (state) => state.schoolsById[resolvedSchoolId],
  );
  const schoolsErrorMessage = useSchoolsStore((state) => state.errorMessage);
  const schoolsStatus = useSchoolsStore((state) => state.status);
  const updateSchool = useSchoolsStore((state) => state.updateSchool);
  const {
    addClassroom,
    errors,
    formValues,
    getUpdatePayload,
    removeClassroom,
    replaceFormValues,
    setFormError,
    updateClassroom,
    updateField,
  } = useSchoolForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    void loadSchools().catch(() => undefined);
  }, [loadSchools]);

  useEffect(() => {
    if (!school) {
      return;
    }

    replaceFormValues({
      address: school.address,
      classrooms: school.classrooms.map((classroom) => ({
        id: classroom.id,
        name: classroom.name,
      })),
      name: school.name,
    });
  }, [replaceFormValues, school]);

  async function handleSubmit() {
    const payload = getUpdatePayload();

    if (!payload) {
      return;
    }

    try {
      setIsSubmitting(true);
      await updateSchool(resolvedSchoolId, payload);
      router.replace('/schools');
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Nao foi possivel atualizar a escola.';

      Alert.alert('Erro ao atualizar', message);
      setFormError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  const isLoadingSchool =
    (schoolsStatus === 'idle' || schoolsStatus === 'loading') && !school;
  const hasSchoolLoadError = schoolsStatus === 'error' && !school;
  const isSchoolMissing = schoolsStatus === 'ready' && !school;

  return (
    <ScreenShell eyebrow="Escolas" title="Editar Escola">
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
            message={
              schoolsErrorMessage ?? 'Nao foi possivel carregar a escola.'
            }
            onAction={() => {
              void loadSchools({ force: true }).catch(() => undefined);
            }}
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
          <SchoolForm
            errors={errors}
            formValues={formValues}
            isSubmitting={isSubmitting}
            onAddClassroom={addClassroom}
            onCancel={() => router.back()}
            onClassroomChange={updateClassroom}
            onFieldChange={updateField}
            onRemoveClassroom={removeClassroom}
            onSubmit={handleSubmit}
            submitLabel="Salvar alteracoes"
          />
        ) : null}
      </VStack>
    </ScreenShell>
  );
}
