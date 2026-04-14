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

import { AppButton } from '../../../components/actions/app-button';
import { IconActionButton } from '../../../components/actions/icon-action-button';
import type { SchoolSummary } from '../school.types';
import { appTheme } from '../../../theme/app-theme';
import { schoolListCardStyles as styles } from './school-list-card.styles';

type SchoolListCardProps = {
  onDelete: () => void;
  onEdit: () => void;
  onManageClassrooms: () => void;
  school: SchoolSummary;
};

function formatClassroomCount(value: number) {
  return value === 1 ? '1 turma' : `${value} turmas`;
}

function formatClassroomPreview(school: SchoolSummary) {
  if (school.classrooms.length === 0) {
    return 'Nenhuma turma cadastrada.';
  }

  return school.classrooms.map((classroom) => classroom.name).join(', ');
}

export function SchoolListCard({
  onDelete,
  onEdit,
  onManageClassrooms,
  school,
}: SchoolListCardProps) {
  return (
    <Card style={styles.card}>
      <VStack style={styles.content}>
        <HStack style={styles.header}>
          <VStack style={styles.headerCopy}>
            <Heading size="md" style={styles.name}>
              {school.name}
            </Heading>
            <Text style={styles.address}>{school.address}</Text>
          </VStack>

          <Badge style={styles.badge}>
            <BadgeText style={styles.badgeText}>
              {school.classrooms.length}
            </BadgeText>
          </Badge>
        </HStack>

        <Text style={styles.meta}>
          {formatClassroomCount(school.classrooms.length)}
        </Text>
        <Text style={styles.classroomPreview}>
          {formatClassroomPreview(school)}
        </Text>

        <AppButton
          label="Gerenciar turmas"
          onPress={onManageClassrooms}
          size="sm"
          variant="secondary"
        />

        <HStack style={styles.actionsGrid}>
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
    </Card>
  );
}
