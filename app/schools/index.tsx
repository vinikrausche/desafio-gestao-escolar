import { Card, Heading, Text, VStack } from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';
import { Fragment, useEffect, useState } from 'react';
import { View } from 'react-native';

import { AppButton } from '../../src/components/actions/app-button';
import { FloatingActionButton } from '../../src/components/actions/floating-action-button';
import { formatListCountLabel } from '../../src/components/filters/list-filter.utils';
import { AppDialog } from '../../src/components/feedback/app-dialog';
import { SearchFilterPanel } from '../../src/components/filters/search-filter-panel';
import { StateCard } from '../../src/components/feedback/state-card';
import { ScreenShell } from '../../src/components/layout/screen-shell';
import { SchoolListCard } from '../../src/features/schools/components/school-list-card';
import {
  defaultSchoolStatusFilter,
  filterSchools,
  schoolStatusFilterOptions,
} from '../../src/features/schools/models/school-list-filter.model';
import { schoolsScreenStyles as styles } from '../../src/features/schools/schools-screen.styles';
import { useSchoolsStore } from '../../src/features/schools/store/schools.store';
import type { DialogState } from './types/schools-screen.types';

type DashboardMetricCardProps = {
  accent: 'brand' | 'muted' | 'success' | 'warning';
  helper: string;
  label: string;
  value: string;
};

const metricAccentStyles = {
  brand: styles.metricAccentBrand,
  muted: styles.metricAccentMuted,
  success: styles.metricAccentSuccess,
  warning: styles.metricAccentWarning,
} as const;

function createClosedDialogState(): DialogState {
  return {
    isOpen: false,
    message: '',
    title: '',
  };
}

function formatNumber(value: number) {
  return new Intl.NumberFormat('pt-BR').format(value);
}

function formatAverage(value: number) {
  return value.toLocaleString('pt-BR', {
    maximumFractionDigits: 1,
    minimumFractionDigits: 1,
  });
}

function formatAverageClassroomCount(value: number) {
  const label = value === 1 ? 'turma' : 'turmas';

  return `${formatAverage(value)} ${label}`;
}

function DashboardMetricCard({
  accent,
  helper,
  label,
  value,
}: DashboardMetricCardProps) {
  return (
    <View style={styles.metricCard}>
      <View style={[styles.metricAccent, metricAccentStyles[accent]]} />
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricHelper}>{helper}</Text>
    </View>
  );
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
  const totalSchools = schools.length;
  const totalClassrooms = schools.reduce(
    (total, school) => total + school.classrooms.length,
    0,
  );
  const schoolsWithClassrooms = schools.filter(
    (school) => school.classrooms.length > 0,
  ).length;
  const schoolsWithoutClassrooms = totalSchools - schoolsWithClassrooms;
  const coveragePercent = totalSchools
    ? Math.round((schoolsWithClassrooms / totalSchools) * 100)
    : 0;
  const averageClassrooms = totalSchools ? totalClassrooms / totalSchools : 0;
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
          : 'Nao foi possível excluir a escola.';

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
      message: `Deseja excluir a escola "${schoolName}"? As turmas vinculadas tambem serão removidas.`,
      onConfirm: () => {
        closeDialog();
        void handleDeleteSchool(schoolId);
      },
      title: 'Excluir escola',
    });
  }

  return (
    <Fragment>
      <ScreenShell
        description="Monitore a rede municipal, acompanhe a cobertura de turmas e mantenha a base escolar pronta para operação."
        eyebrow="Escolas"
        floatingAction={
          <FloatingActionButton
            accessibilityLabel="Cadastrar escola"
            onPress={() => router.push('/schools/new')}
          />
        }
        title="Painel de gestão escolar"
      >
        <VStack style={styles.content}>
          <Card style={styles.dashboardCard}>
            <View style={styles.dashboardHeader}>
              <View style={styles.dashboardCopy}>
                <Text style={styles.dashboardEyebrow}>Visão geral</Text>
                <Heading style={styles.dashboardTitle}>
                  Rede escolar municipal
                </Heading>
                <Text style={styles.dashboardDescription}>
                  Indicadores essenciais para acompanhar escolas cadastradas,
                  turmas vinculadas e pendencias de cadastro.
                </Text>
              </View>

              <AppButton
                align="start"
                label="Nova escola"
                onPress={() => router.push('/schools/new')}
                size="sm"
              />
            </View>

            <View style={styles.metricsGrid}>
              <DashboardMetricCard
                accent="brand"
                helper="unidades cadastradas"
                label="Escolas"
                value={formatNumber(totalSchools)}
              />
              <DashboardMetricCard
                accent="success"
                helper="vinculadas às escolas"
                label="Turmas"
                value={formatNumber(totalClassrooms)}
              />
              <DashboardMetricCard
                accent="warning"
                helper={`${coveragePercent}% com turmas`}
                label="Com turmas"
                value={formatNumber(schoolsWithClassrooms)}
              />
              <DashboardMetricCard
                accent="muted"
                helper="precisam de acompanhamento"
                label="Sem turmas"
                value={formatNumber(schoolsWithoutClassrooms)}
              />
            </View>

            <View style={styles.operationalPanel}>
              <View style={styles.operationalCopy}>
                <Text style={styles.operationalLabel}>
                  Cobertura operacional
                </Text>
                <Text style={styles.operationalValue}>
                  {coveragePercent}% das escolas possuem turmas cadastradas
                </Text>
              </View>

              <View style={styles.progressTrack}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${coveragePercent}%` },
                  ]}
                />
              </View>

              <View style={styles.operationalFooter}>
                <Text style={styles.operationalFooterText}>
                  Média de {formatAverageClassroomCount(averageClassrooms)} por
                  escola
                </Text>
                <Text style={styles.operationalFooterText}>
                  {formatNumber(filteredSchools.length)} no recorte atual
                </Text>
              </View>
            </View>
          </Card>

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

          <View style={styles.listHeader}>
            <View style={styles.listHeaderCopy}>
              <Text style={styles.sectionEyebrow}>Base escolar</Text>
              <Heading size="md" style={styles.sectionTitle}>
                Escolas cadastradas
              </Heading>
              <Text style={styles.sectionDescription}>
                {hasActiveFilters
                  ? 'Resultado filtrado pelos critérios informados.'
                  : 'Acompanhe endereço, turmas e ações por unidade escolar.'}
              </Text>
            </View>

            <View style={styles.listBadge}>
              <Text style={styles.listBadgeText}>
                {formatListCountLabel({
                  filteredCount: filteredSchools.length,
                  pluralLabel: 'escolas',
                  singularLabel: 'escola',
                  totalCount: schools.length,
                })}
              </Text>
            </View>
          </View>

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
