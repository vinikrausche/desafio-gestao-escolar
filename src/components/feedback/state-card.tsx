import {
  Button,
  ButtonText,
  Card,
  HStack,
  Spinner,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import { type PropsWithChildren } from 'react';

import { appTheme } from '../../theme/app-theme';
import { stateCardStyles as styles } from './state-card.styles';

type StateCardTone = 'surface' | 'soft' | 'error';
type StateCardActionVariant = 'primary' | 'secondary';
type StateCardLayout = 'row' | 'column';
type StateCardAlign = 'start' | 'center';

type StateCardProps = PropsWithChildren<{
  actionLabel?: string;
  actionVariant?: StateCardActionVariant;
  align?: StateCardAlign;
  layout?: StateCardLayout;
  message: string;
  minHeight?: number;
  onAction?: () => void;
  showSpinner?: boolean;
  tone?: StateCardTone;
  title?: string;
}>;

const toneStyles = {
  error: styles.errorTone,
  soft: styles.softTone,
  surface: styles.surfaceTone,
} as const;

const actionStyles = {
  primary: {
    button: styles.primaryAction,
    text: styles.primaryActionText,
  },
  secondary: {
    button: styles.secondaryAction,
    text: styles.secondaryActionText,
  },
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
  const selectedActionStyles = actionStyles[actionVariant];

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
              <Button
                onPress={onAction}
                style={[
                  selectedActionStyles.button,
                  { alignSelf: isCentered ? 'center' : 'flex-start' },
                ]}
              >
                <ButtonText style={selectedActionStyles.text}>
                  {actionLabel}
                </ButtonText>
              </Button>
            ) : null}

            {children}
          </VStack>
        </VStack>
      )}
    </Card>
  );
}
