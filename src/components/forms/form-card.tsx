import { Card, Text, VStack } from '@gluestack-ui/themed';
import { type PropsWithChildren } from 'react';

import { formCardStyles as styles } from './form-card.styles';

type FormCardProps = PropsWithChildren<{
  errorMessage?: string;
}>;

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
