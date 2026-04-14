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

import { IconActionButton } from '../../../components/actions/icon-action-button';
import { appTheme } from '../../../theme/app-theme';
import { classroomShiftLabels } from '../classroom.constants';
import type { Classroom } from '../classroom.types';
import { classroomListCardStyles as styles } from './classroom-list-card.styles';

type ClassroomListCardProps = {
  classroom: Classroom;
  onDelete: () => void;
  onEdit: () => void;
};

export function ClassroomListCard({
  classroom,
  onDelete,
  onEdit,
}: ClassroomListCardProps) {
  return (
    <Card style={styles.card}>
      <VStack style={styles.content}>
        <Heading size="md" style={styles.name}>
          {classroom.name}
        </Heading>

        <HStack style={styles.metaRow}>
          <Badge style={styles.metaBadge}>
            <BadgeText style={styles.metaBadgeText}>
              {classroomShiftLabels[classroom.shift]}
            </BadgeText>
          </Badge>
          <Badge style={styles.metaBadge}>
            <BadgeText style={styles.metaBadgeText}>
              {`Ano letivo ${classroom.schoolYear}`}
            </BadgeText>
          </Badge>
        </HStack>

        <Text style={styles.schoolYear}>
          {`Turno ${classroomShiftLabels[classroom.shift].toLowerCase()} • Ano ${classroom.schoolYear}`}
        </Text>

        <HStack style={styles.actions}>
          <IconActionButton
            accessibilityLabel={`Editar turma ${classroom.name}`}
            icon={EditIcon}
            iconColor={appTheme.colors.brandStrong}
            onPress={onEdit}
          />

          <IconActionButton
            accessibilityLabel={`Excluir turma ${classroom.name}`}
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
