import { VStack } from '@gluestack-ui/themed';

import { AppButton } from '../actions/app-button';
import { formActionsStyles as styles } from './form-actions.styles';

type FormActionsProps = {
  isPrimaryDisabled?: boolean;
  isSecondaryDisabled?: boolean;
  onPrimaryPress: () => void;
  onSecondaryPress: () => void;
  primaryLabel: string;
  secondaryLabel?: string;
};

export function FormActions({
  isPrimaryDisabled = false,
  isSecondaryDisabled = false,
  onPrimaryPress,
  onSecondaryPress,
  primaryLabel,
  secondaryLabel = 'Cancelar',
}: FormActionsProps) {
  return (
    <VStack style={styles.actions}>
      <AppButton
        isDisabled={isPrimaryDisabled}
        label={primaryLabel}
        onPress={onPrimaryPress}
        size="md"
        variant="primary"
      />

      <AppButton
        isDisabled={isSecondaryDisabled}
        label={secondaryLabel}
        onPress={onSecondaryPress}
        size="md"
        variant="secondary"
      />
    </VStack>
  );
}
