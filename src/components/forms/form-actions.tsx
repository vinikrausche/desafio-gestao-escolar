import { Button, ButtonText, VStack } from '@gluestack-ui/themed';

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
      <Button
        isDisabled={isPrimaryDisabled}
        onPress={() => void onPrimaryPress()}
        style={styles.primaryButton}
      >
        <ButtonText style={styles.primaryButtonText}>{primaryLabel}</ButtonText>
      </Button>

      <Button
        isDisabled={isSecondaryDisabled}
        onPress={onSecondaryPress}
        style={styles.secondaryButton}
      >
        <ButtonText style={styles.secondaryButtonText}>
          {secondaryLabel}
        </ButtonText>
      </Button>
    </VStack>
  );
}
