import { Badge, BadgeText, Heading, HStack } from '@gluestack-ui/themed';

import { listHeaderStyles as styles } from './list-header.styles';
import type { ListHeaderProps } from './types/list-header.types';

export function ListHeader({ badgeLabel, title }: ListHeaderProps) {
  return (
    <HStack style={styles.row}>
      <Heading size="md" style={styles.title}>
        {title}
      </Heading>

      <Badge style={styles.badge}>
        <BadgeText style={styles.badgeText}>{badgeLabel}</BadgeText>
      </Badge>
    </HStack>
  );
}
