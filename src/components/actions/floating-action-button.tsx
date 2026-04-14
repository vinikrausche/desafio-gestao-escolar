import { AddIcon, Fab, FabIcon } from '@gluestack-ui/themed';

import { floatingActionButtonStyles as styles } from './floating-action-button.styles';
import type { FloatingActionButtonProps } from './types/floating-action-button.types';

export function FloatingActionButton({
  accessibilityLabel,
  onPress,
}: FloatingActionButtonProps) {
  return (
    <Fab
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      style={styles.fab}
    >
      <FabIcon as={AddIcon} style={styles.icon} />
    </Fab>
  );
}
