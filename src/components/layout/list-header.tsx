import { Badge, BadgeText, Heading, HStack } from '@gluestack-ui/themed';

import { listHeaderStyles as styles } from './list-header.styles';

type ListHeaderProps = {
  badgeLabel: string;
  title: string;
};

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
