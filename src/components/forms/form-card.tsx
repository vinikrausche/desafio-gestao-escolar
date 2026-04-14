import { Card, Text, VStack } from '@gluestack-ui/themed';

import { formCardStyles as styles } from './form-card.styles';
import type { FormCardProps } from './types/form-card.types';

export function FormCard({ children, errorMessage }: FormCardProps) {
  return (
    <Card style={styles.card}>
      <VStack style={styles.content}>
        {errorMessage ? (
          <VStack style={styles.errorContainer}>
            <Text style={styles.errorText}>{errorMessage}</Text>
          </VStack>
        ) : null}
        {children}
      </VStack>
    </Card>
  );
}
