import { Text, VStack } from '@gluestack-ui/themed';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert } from 'react-native';

import { FloatingActionButton } from '../../../../src/components/actions/floating-action-button';
import { StateCard } from '../../../../src/components/feedback/state-card';
import { ListHeader } from '../../../../src/components/layout/list-header';
import { ScreenShell } from '../../../../src/components/layout/screen-shell';
import { ClassroomListCard } from '../../../../src/features/classrooms/components/classroom-list-card';
import { classroomsScreenStyles as styles } from '../../../../src/features/classrooms/classrooms-screen.styles';
import { useSchoolResource } from '../../../../src/features/schools/hooks/use-school-resource';
import { useSchoolsStore } from '../../../../src/features/schools/store/schools.store';
import { resolveRouteParam } from '../../../../src/lib/router/resolve-route-param';

export default function ClassroomsScreen() {
  const router = useRouter();
  const { schoolId } = useLocalSearchParams<{ schoolId?: string | string[] }>();
  const resolvedSchoolId = resolveRouteParam(schoolId, 'unknown-school');
  const deleteClassroom = useSchoolsStore((state) => state.deleteClassroom);
  const {
    errorMessage,
    hasSchoolLoadError,
    isLoadingSchool,
    isSchoolMissing,
    refreshSchool,
    school,
  } = useSchoolResource(resolvedSchoolId);
  const [pendingClassroomId, setPendingClassroomId] = useState<string | null>(
    null,
  );

  async function handleDeleteClassroom(classroomId: string) {
    try {
      setPendingClassroomId(classroomId);
      await deleteClassroom(resolvedSchoolId, classroomId);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Nao foi possivel excluir a turma.';

      Alert.alert('Erro ao excluir', message);
    } finally {
      setPendingClassroomId((current) =>
        current === classroomId ? null : current,
      );
    }
  }

  function confirmDeleteClassroom(classroomId: string, classroomName: string) {
    Alert.alert('Excluir turma', `Deseja excluir a turma "${classroomName}"?`, [
      {
        style: 'cancel',
        text: 'Cancelar',
      },
      {
        style: 'destructive',
        text: 'Excluir',
        onPress: () => {
          void handleDeleteClassroom(classroomId);
        },
      },
    ]);
  }

  return (
    <ScreenShell
      description={
        school
          ? `Gerencie as turmas vinculadas à ${school.name}.`
          : 'Gerencie as turmas vinculadas à escola selecionada.'
      }
      eyebrow="Turmas"
      floatingAction={
        school ? (
          <FloatingActionButton
            accessibilityLabel="Cadastrar turma"
            onPress={() =>
              router.push({
                params: {
                  schoolId: resolvedSchoolId,
                },
                pathname: '/schools/[schoolId]/classrooms/new',
              })
            }
          />
        ) : undefined
      }
      title="Turmas da escola"
    >
      <VStack style={styles.content}>
        {school ? (
          <VStack style={styles.schoolSummary}>
            <Text style={styles.schoolName}>{school.name}</Text>
            <Text style={styles.schoolAddress}>{school.address}</Text>
          </VStack>
        ) : null}

        {isLoadingSchool ? (
          <StateCard
            layout="row"
            message="Carregando turmas..."
            minHeight={120}
            showSpinner
            tone="surface"
          />
        ) : null}

        {hasSchoolLoadError ? (
          <StateCard
            actionLabel="Tentar novamente"
            message={errorMessage ?? 'Nao foi possivel carregar as turmas.'}
            onAction={() => void refreshSchool()}
            title="Falha ao carregar"
            tone="error"
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

        {school ? (
          <ListHeader
            badgeLabel={`${school.classrooms.length} turmas`}
            title="Lista"
          />
        ) : null}

        {school && school.classrooms.length === 0 ? (
          <StateCard
            actionLabel="Cadastrar primeira turma"
            message="Nenhuma turma cadastrada para esta escola."
            onAction={() =>
              router.push({
                params: {
                  schoolId: resolvedSchoolId,
                },
                pathname: '/schools/[schoolId]/classrooms/new',
              })
            }
            tone="surface"
          />
        ) : null}

        {school && school.classrooms.length > 0 ? (
          <VStack style={styles.list}>
            {school.classrooms.map((classroom) => (
              <ClassroomListCard
                classroom={classroom}
                key={classroom.id}
                onDelete={() => {
                  if (pendingClassroomId === classroom.id) {
                    return;
                  }

                  confirmDeleteClassroom(classroom.id, classroom.name);
                }}
                onEdit={() =>
                  router.push({
                    params: {
                      classroomId: classroom.id,
                      schoolId: resolvedSchoolId,
                    },
                    pathname:
                      '/schools/[schoolId]/classrooms/[classroomId]/edit',
                  })
                }
              />
            ))}
          </VStack>
        ) : null}
      </VStack>
    </ScreenShell>
  );
}
