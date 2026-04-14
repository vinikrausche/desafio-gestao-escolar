import { Text, VStack } from '@gluestack-ui/themed';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Fragment, useState } from 'react';

import { FloatingActionButton } from '../../../../src/components/actions/floating-action-button';
import { formatListCountLabel } from '../../../../src/components/filters/list-filter.utils';
import { AppDialog } from '../../../../src/components/feedback/app-dialog';
import { SearchFilterPanel } from '../../../../src/components/filters/search-filter-panel';
import { StateCard } from '../../../../src/components/feedback/state-card';
import { ListHeader } from '../../../../src/components/layout/list-header';
import { ScreenShell } from '../../../../src/components/layout/screen-shell';
import { ClassroomListCard } from '../../../../src/features/classrooms/components/classroom-list-card';
import { classroomsScreenStyles as styles } from '../../../../src/features/classrooms/classrooms-screen.styles';
import {
  classroomShiftFilterOptions,
  defaultClassroomShiftFilter,
  filterClassrooms,
} from '../../../../src/features/classrooms/models/classroom-list-filter.model';
import { useSchoolResource } from '../../../../src/features/schools/hooks/use-school-resource';
import { useSchoolsStore } from '../../../../src/features/schools/store/schools.store';
import { resolveRouteParam } from '../../../../src/lib/router/resolve-route-param';
import type { DialogState } from './types/classrooms-screen.types';

function createClosedDialogState(): DialogState {
  return {
    isOpen: false,
    message: '',
    title: '',
  };
}

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
  const [searchTerm, setSearchTerm] = useState('');
  const [shiftFilter, setShiftFilter] = useState(defaultClassroomShiftFilter);
  const [dialogState, setDialogState] = useState<DialogState>(
    createClosedDialogState,
  );
  const filteredClassrooms = filterClassrooms({
    classrooms: school?.classrooms ?? [],
    searchTerm,
    shiftFilter,
  });
  const hasActiveFilters =
    searchTerm.trim().length > 0 || shiftFilter !== defaultClassroomShiftFilter;

  function resetFilters() {
    setSearchTerm('');
    setShiftFilter(defaultClassroomShiftFilter);
  }

  function closeDialog() {
    setDialogState(createClosedDialogState());
  }

  async function handleDeleteClassroom(classroomId: string) {
    try {
      setPendingClassroomId(classroomId);
      await deleteClassroom(resolvedSchoolId, classroomId);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Nao foi possivel excluir a turma.';

      setDialogState({
        confirmLabel: 'Fechar',
        isOpen: true,
        message,
        title: 'Erro ao excluir',
      });
    } finally {
      setPendingClassroomId((current) =>
        current === classroomId ? null : current,
      );
    }
  }

  function confirmDeleteClassroom(classroomId: string, classroomName: string) {
    setDialogState({
      confirmLabel: 'Excluir',
      confirmVariant: 'dangerSoft',
      isOpen: true,
      message: `Deseja excluir a turma "${classroomName}"?`,
      onConfirm: () => {
        closeDialog();
        void handleDeleteClassroom(classroomId);
      },
      title: 'Excluir turma',
    });
  }

  return (
    <Fragment>
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

          {school && school.classrooms.length > 0 ? (
            <SearchFilterPanel
              defaultFilterValue={defaultClassroomShiftFilter}
              filterLabel="Filtrar por turno"
              filterOptions={classroomShiftFilterOptions}
              filterValue={shiftFilter}
              onClear={resetFilters}
              onFilterChange={setShiftFilter}
              onSearchChange={setSearchTerm}
              searchLabel="Buscar turma"
              searchPlaceholder="Digite nome, turno ou ano letivo"
              searchValue={searchTerm}
            />
          ) : null}

          {school ? (
            <ListHeader
              badgeLabel={formatListCountLabel({
                filteredCount: filteredClassrooms.length,
                pluralLabel: 'turmas',
                singularLabel: 'turma',
                totalCount: school.classrooms.length,
              })}
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

          {school &&
          school.classrooms.length > 0 &&
          filteredClassrooms.length === 0 ? (
            <StateCard
              actionLabel={hasActiveFilters ? 'Limpar filtros' : undefined}
              message="Nenhuma turma encontrada com os filtros informados."
              onAction={hasActiveFilters ? resetFilters : undefined}
              title="Sem resultados"
              tone="soft"
            />
          ) : null}

          {school && filteredClassrooms.length > 0 ? (
            <VStack style={styles.list}>
              {filteredClassrooms.map((classroom) => (
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

      <AppDialog
        confirmLabel={dialogState.confirmLabel}
        confirmVariant={dialogState.confirmVariant}
        isOpen={dialogState.isOpen}
        message={dialogState.message}
        onClose={closeDialog}
        onConfirm={dialogState.onConfirm}
        title={dialogState.title}
      />
    </Fragment>
  );
}
