import {
  Badge,
  BadgeText,
  Card,
  EditIcon,
  Heading,
  HStack,
  Text,
  TrashIcon,
  VStack,
} from '@gluestack-ui/themed';
import { Image, useWindowDimensions, View } from 'react-native';

import { AppButton } from '../../../components/actions/app-button';
import { IconActionButton } from '../../../components/actions/icon-action-button';
import { appTheme } from '../../../theme/app-theme';
import { formatSchoolAddress } from '../models/school-address.model';
import { isPersistableSchoolPhotoUri } from '../models/school-photo.model';
import { schoolListCardStyles as styles } from './school-list-card.styles';
import type { SchoolListCardProps } from './types/school-list-card.types';

function formatClassroomCount(value: number) {
  return value === 1 ? '1 turma' : `${value} turmas`;
}

function formatClassroomPreview(school: SchoolListCardProps['school']) {
  if (school.classrooms.length === 0) {
    return 'Nenhuma turma cadastrada.';
  }

  return school.classrooms.map((classroom) => classroom.name).join(', ');
}

function formatShiftCount(school: SchoolListCardProps['school']) {
  const shiftCount = new Set(
    school.classrooms.map((classroom) => classroom.shift),
  ).size;

  return shiftCount === 1 ? '1 turno' : `${shiftCount} turnos`;
}

function getSchoolInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

function getCoverPhotoUri(school: SchoolListCardProps['school']) {
  return school.photos?.find((photo) => isPersistableSchoolPhotoUri(photo.uri))
    ?.uri;
}

export function SchoolListCard({
  onDelete,
  onEdit,
  onManageClassrooms,
  school,
}: SchoolListCardProps) {
  const coverPhotoUri = getCoverPhotoUri(school);
  const hasClassrooms = school.classrooms.length > 0;
  const { width } = useWindowDimensions();
  const isCompactLayout = width < 720;

  return (
    <Card style={styles.card}>
      <View
        style={[
          styles.cardLayout,
          isCompactLayout ? styles.cardLayoutCompact : null,
        ]}
      >
        {coverPhotoUri ? (
          <Image
            accessibilityLabel={`Foto de ${school.name}`}
            resizeMode="cover"
            source={{ uri: coverPhotoUri }}
            style={[
              styles.coverPhoto,
              isCompactLayout ? styles.coverPhotoCompact : null,
            ]}
          />
        ) : (
          <View
            style={[
              styles.coverPlaceholder,
              isCompactLayout ? styles.coverPlaceholderCompact : null,
            ]}
          >
            <Text style={styles.coverInitials}>
              {getSchoolInitials(school.name)}
            </Text>
          </View>
        )}

        <VStack style={styles.content}>
          <HStack
            style={[
              styles.header,
              isCompactLayout ? styles.headerCompact : null,
            ]}
          >
            <VStack style={styles.headerCopy}>
              <Text
                style={[
                  styles.statusLabel,
                  hasClassrooms ? styles.statusReady : styles.statusPending,
                ]}
              >
                {hasClassrooms ? 'Com turmas' : 'Sem turmas'}
              </Text>
              <Heading size="md" style={styles.name}>
                {school.name}
              </Heading>
              <Text style={styles.address}>{formatSchoolAddress(school)}</Text>
            </VStack>

            <Badge style={styles.badge}>
              <BadgeText style={styles.badgeText}>
                {school.classrooms.length}
              </BadgeText>
            </Badge>
          </HStack>

          <View style={styles.metricsRow}>
            <View style={styles.miniMetric}>
              <Text style={styles.miniMetricLabel}>Turmas</Text>
              <Text style={styles.miniMetricValue}>
                {formatClassroomCount(school.classrooms.length)}
              </Text>
            </View>

            <View style={styles.miniMetric}>
              <Text style={styles.miniMetricLabel}>Turnos</Text>
              <Text style={styles.miniMetricValue}>
                {formatShiftCount(school)}
              </Text>
            </View>
          </View>

          <Text style={styles.classroomPreview}>
            {formatClassroomPreview(school)}
          </Text>

          <HStack
            style={[
              styles.actionsGrid,
              isCompactLayout ? styles.actionsGridCompact : null,
            ]}
          >
            <AppButton
              align="stretch"
              label="Gerenciar turmas"
              onPress={onManageClassrooms}
              size="sm"
              style={styles.manageButton}
              variant="secondary"
            />

            <IconActionButton
              accessibilityLabel={`Editar escola ${school.name}`}
              icon={EditIcon}
              iconColor={appTheme.colors.brandStrong}
              onPress={onEdit}
            />

            <IconActionButton
              accessibilityLabel={`Excluir escola ${school.name}`}
              icon={TrashIcon}
              iconColor={appTheme.colors.error}
              onPress={onDelete}
              tone="danger"
            />
          </HStack>
        </VStack>
      </View>
    </Card>
  );
}
