import { VStack } from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

import { FloatingActionButton } from '../../src/components/actions/floating-action-button';
import { formatListCountLabel } from '../../src/components/filters/list-filter.utils';
import { AppDialog } from '../../src/components/feedback/app-dialog';
import { SearchFilterPanel } from '../../src/components/filters/search-filter-panel';
import { StateCard } from '../../src/components/feedback/state-card';
import { ListHeader } from '../../src/components/layout/list-header';
import { ScreenShell } from '../../src/components/layout/screen-shell';
import { SchoolListCard } from '../../src/features/schools/components/school-list-card';
import {
  defaultSchoolStatusFilter,
  filterSchools,
  schoolStatusFilterOptions,
} from '../../src/features/schools/models/school-list-filter.model';
import { schoolsScreenStyles as styles } from '../../src/features/schools/schools-screen.styles';
import { useSchoolsStore } from '../../src/features/schools/store/schools.store';
import type { AppButtonVariant } from '../../src/components/actions/app-button';

type DialogState = {
  confirmLabel?: string;
  confirmVariant?: AppButtonVariant;
  isOpen: boolean;
  message: string;
  onConfirm?: () => void;
  title: string;
};

function createClosedDialogState(): DialogState {
  return {
    isOpen: false,
    message: '',
    title: '',
  };
}

export default function SchoolsScreen() {
  const router = useRouter();
  const deleteSchool = useSchoolsStore((state) => state.deleteSchool);
  const errorMessage = useSchoolsStore((state) => state.errorMessage);
  const loadSchools = useSchoolsStore((state) => state.loadSchools);
  const schoolIds = useSchoolsStore((state) => state.schoolIds);
  const schoolsById = useSchoolsStore((state) => state.schoolsById);
  const status = useSchoolsStore((state) => state.status);
  const [pendingSchoolId, setPendingSchoolId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState(defaultSchoolStatusFilter);
  const [dialogState, setDialogState] = useState<DialogState>(
    createClosedDialogState,
  );

  useEffect(() => {
    void loadSchools().catch(() => undefined);
  }, [loadSchools]);

  const schools = schoolIds
    .map((schoolId) => schoolsById[schoolId])
    .filter((school): school is NonNullable<typeof school> => Boolean(school));
  const filteredSchools = filterSchools({
    schools,
    searchTerm,
    statusFilter,
  });
  const hasActiveFilters =
    searchTerm.trim().length > 0 || statusFilter !== defaultSchoolStatusFilter;

  const isLoadingSchools = status === 'idle' || status === 'loading';
  const hasSchoolLoadError = status === 'error';

  function resetFilters() {
    setSearchTerm('');
    setStatusFilter(defaultSchoolStatusFilter);
  }

  function closeDialog() {
    setDialogState(createClosedDialogState());
  }

  async function handleDeleteSchool(schoolId: string) {
    try {
      setPendingSchoolId(schoolId);
      await deleteSchool(schoolId);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Nao foi possivel excluir a escola.';

      setDialogState({
        confirmLabel: 'Fechar',
        isOpen: true,
        message,
        title: 'Erro ao excluir',
      });
    } finally {
      setPendingSchoolId((current) => (current === schoolId ? null : current));
    }
  }

  function confirmDeleteSchool(schoolId: string, schoolName: string) {
    setDialogState({
      confirmLabel: 'Excluir',
      confirmVariant: 'dangerSoft',
      isOpen: true,
      message: `Deseja excluir a escola "${schoolName}"? As turmas vinculadas tambem serao removidas.`,
      onConfirm: () => {
        closeDialog();
        void handleDeleteSchool(schoolId);
      },
      title: 'Excluir escola',
    });
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
        {schools.length > 0 ? (
          <SearchFilterPanel
            defaultFilterValue={defaultSchoolStatusFilter}
            filterLabel="Filtrar por situação"
            filterOptions={schoolStatusFilterOptions}
            filterValue={statusFilter}
            onClear={resetFilters}
            onFilterChange={setStatusFilter}
            onSearchChange={setSearchTerm}
            searchLabel="Buscar escola"
            searchPlaceholder="Digite nome, endereço ou turma"
            searchValue={searchTerm}
          />
        ) : null}

        <ListHeader
          badgeLabel={formatListCountLabel({
            filteredCount: filteredSchools.length,
            pluralLabel: 'escolas',
            singularLabel: 'escola',
            totalCount: schools.length,
          })}
          title="Lista"
        />

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

        {!isLoadingSchools &&
        !hasSchoolLoadError &&
        schools.length > 0 &&
        filteredSchools.length === 0 ? (
          <StateCard
            actionLabel={hasActiveFilters ? 'Limpar filtros' : undefined}
            message="Nenhuma escola encontrada com os filtros informados."
            onAction={hasActiveFilters ? resetFilters : undefined}
            title="Sem resultados"
            tone="soft"
          />
        ) : null}

        {!isLoadingSchools &&
        !hasSchoolLoadError &&
        filteredSchools.length > 0 ? (
          <VStack style={styles.list}>
            {filteredSchools.map((school) => (
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
                onManageClassrooms={() =>
                  router.push({
                    params: {
                      schoolId: school.id,
                    },
                    pathname: '/schools/[schoolId]/classrooms',
                  })
                }
                school={school}
              />
            ))}
          </VStack>
        ) : null}

        <AppDialog
          confirmLabel={dialogState.confirmLabel}
          confirmVariant={dialogState.confirmVariant}
          isOpen={dialogState.isOpen}
          message={dialogState.message}
          onClose={closeDialog}
          onConfirm={dialogState.onConfirm}
          title={dialogState.title}
        />
      </VStack>
    </ScreenShell>
  );
}
