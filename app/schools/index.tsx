import { VStack } from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Alert } from 'react-native';

import { FloatingActionButton } from '../../src/components/actions/floating-action-button';
import { StateCard } from '../../src/components/feedback/state-card';
import { ListHeader } from '../../src/components/layout/list-header';
import { ScreenShell } from '../../src/components/layout/screen-shell';
import { SchoolListCard } from '../../src/features/schools/components/school-list-card';
import { schoolsScreenStyles as styles } from '../../src/features/schools/schools-screen.styles';
import { useSchoolsStore } from '../../src/features/schools/store/schools.store';

export default function SchoolsScreen() {
  const router = useRouter();
  const deleteSchool = useSchoolsStore((state) => state.deleteSchool);
  const errorMessage = useSchoolsStore((state) => state.errorMessage);
  const loadSchools = useSchoolsStore((state) => state.loadSchools);
  const schoolIds = useSchoolsStore((state) => state.schoolIds);
  const schoolsById = useSchoolsStore((state) => state.schoolsById);
  const status = useSchoolsStore((state) => state.status);
  const [pendingSchoolId, setPendingSchoolId] = useState<string | null>(null);

  useEffect(() => {
    void loadSchools().catch(() => undefined);
  }, [loadSchools]);

  const schools = useMemo(
    () =>
      schoolIds
        .map((schoolId) => schoolsById[schoolId])
        .filter((school): school is NonNullable<typeof school> =>
          Boolean(school),
        ),
    [schoolIds, schoolsById],
  );

  const isLoadingSchools = status === 'idle' || status === 'loading';
  const hasSchoolLoadError = status === 'error';

  async function handleDeleteSchool(schoolId: string) {
    try {
      setPendingSchoolId(schoolId);
      await deleteSchool(schoolId);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Nao foi possivel excluir a escola.';

      Alert.alert('Erro ao excluir', message);
    } finally {
      setPendingSchoolId((current) => (current === schoolId ? null : current));
    }
  }

  function confirmDeleteSchool(schoolId: string, schoolName: string) {
    Alert.alert(
      'Excluir escola',
      `Deseja excluir a escola "${schoolName}"? As turmas vinculadas tambem serao removidas.`,
      [
        {
          style: 'cancel',
          text: 'Cancelar',
        },
        {
          style: 'destructive',
          text: 'Excluir',
          onPress: () => {
            void handleDeleteSchool(schoolId);
          },
        },
      ],
    );
  }

  return (
    <ScreenShell
      description="Cadastre, acompanhe e mantenha atualizada a base das escolas municipais e de suas turmas."
      eyebrow="Escolas"
      floatingAction={
        <FloatingActionButton
          accessibilityLabel="Cadastrar escola"
          onPress={() => router.push('/schools/new')}
        />
      }
      title="Gestão escolar"
    >
      <VStack style={styles.content}>
        <ListHeader badgeLabel={`${schools.length} escolas`} title="Lista" />

        {isLoadingSchools ? (
          <StateCard
            layout="row"
            message="Carregando escolas..."
            minHeight={120}
            showSpinner
            tone="surface"
          />
        ) : null}

        {hasSchoolLoadError ? (
          <StateCard
            actionLabel="Tentar novamente"
            message={errorMessage ?? 'Nao foi possivel carregar as escolas.'}
            onAction={() => {
              void loadSchools({ force: true }).catch(() => undefined);
            }}
            title="Falha ao carregar"
            tone="error"
          />
        ) : null}

        {!isLoadingSchools && !hasSchoolLoadError && schools.length === 0 ? (
          <StateCard message="Nenhuma escola cadastrada." tone="surface" />
        ) : null}

        {!isLoadingSchools && !hasSchoolLoadError && schools.length > 0 ? (
          <VStack style={styles.list}>
            {schools.map((school) => (
              <SchoolListCard
                key={school.id}
                onDelete={() => {
                  if (pendingSchoolId === school.id) {
                    return;
                  }

                  confirmDeleteSchool(school.id, school.name);
                }}
                onEdit={() =>
                  router.push({
                    params: {
                      schoolId: school.id,
                    },
                    pathname: '/schools/[schoolId]/edit',
                  })
                }
                school={school}
              />
            ))}
          </VStack>
        ) : null}
      </VStack>
    </ScreenShell>
  );
}
