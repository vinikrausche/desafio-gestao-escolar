import {
  Badge,
  BadgeText,
  Button,
  Card,
  EditIcon,
  Heading,
  HStack,
  Icon,
  Text,
  TrashIcon,
  VStack,
} from '@gluestack-ui/themed';

import type { SchoolSummary } from '../school.types';
import { appTheme } from '../../../theme/app-theme';
import { schoolListCardStyles as styles } from './school-list-card.styles';

type SchoolListCardProps = {
  onDelete: () => void;
  onEdit: () => void;
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

        <HStack style={styles.actionsGrid}>
          <Button
            accessibilityLabel={`Editar escola ${school.name}`}
            onPress={onEdit}
            style={styles.iconActionButton}
          >
            <Icon
              as={EditIcon}
              color={appTheme.colors.brandStrong}
              style={styles.iconAction}
            />
          </Button>

          <Button
            accessibilityLabel={`Excluir escola ${school.name}`}
            onPress={onDelete}
            style={styles.iconDangerActionButton}
          >
            <Icon
              as={TrashIcon}
              color={appTheme.colors.error}
              style={styles.iconAction}
            />
          </Button>
        </HStack>
      </VStack>
    </Card>
  );
}
