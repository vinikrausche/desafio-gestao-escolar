import { Card, HStack, Spinner, Text, VStack } from '@gluestack-ui/themed';

import { AppButton } from '../actions/app-button';
import { appTheme } from '../../theme/app-theme';
import { stateCardStyles as styles } from './state-card.styles';
import type { StateCardProps } from './types/state-card.types';

const toneStyles = {
  error: styles.errorTone,
  soft: styles.softTone,
  surface: styles.surfaceTone,
} as const;

export function StateCard({
  actionLabel,
  actionVariant = 'primary',
  align = 'start',
  children,
  layout = 'column',
  message,
  minHeight,
  onAction,
  showSpinner = false,
  title,
  tone = 'surface',
}: StateCardProps) {
  const isCentered = align === 'center';
  const isRowLayout = showSpinner && layout === 'row';

  return (
    <Card
      style={[
        styles.card,
        toneStyles[tone],
        typeof minHeight === 'number' ? { minHeight } : null,
      ]}
    >
      {isRowLayout ? (
        <HStack style={[styles.content, styles.rowContent]}>
          <Spinner size="large" color={appTheme.colors.brand} />
          <Text
            style={[
              styles.message,
              tone === 'error' ? styles.errorMessage : null,
              isCentered ? styles.centerText : null,
            ]}
          >
            {message}
          </Text>
        </HStack>
      ) : (
        <VStack
          style={[
            styles.content,
            showSpinner ? styles.columnContent : null,
            isCentered ? styles.centerCopy : null,
          ]}
        >
          {showSpinner ? (
            <Spinner size="large" color={appTheme.colors.brand} />
          ) : null}

          <VStack style={[styles.copy, isCentered ? styles.centerCopy : null]}>
            {title ? (
              <Text
                style={[
                  styles.title,
                  tone === 'error' ? styles.errorTitle : null,
                  isCentered ? styles.centerText : null,
                ]}
              >
                {title}
              </Text>
            ) : null}

            <Text
              style={[
                styles.message,
                tone === 'error' ? styles.errorMessage : null,
                isCentered ? styles.centerText : null,
              ]}
            >
              {message}
            </Text>

            {actionLabel && onAction ? (
              <AppButton
                align={isCentered ? 'center' : 'start'}
                label={actionLabel}
                onPress={onAction}
                size="sm"
                variant={actionVariant}
              />
            ) : null}

            {children}
          </VStack>
        </VStack>
      )}
    </Card>
  );
}
