import {
  Badge,
  BadgeText,
  Card,
  Heading,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { screenShellStyles as styles } from './screen-shell.styles';
import type { ScreenShellProps } from './types/screen-shell.types';

export function ScreenShell({
  children,
  description,
  eyebrow,
  floatingAction,
  title,
}: ScreenShellProps) {
  return (
    <SafeAreaView edges={['bottom']} style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          floatingAction ? styles.scrollContentWithFloatingAction : null,
        ]}
        keyboardShouldPersistTaps="handled"
      >
        <VStack style={styles.stack}>
          <Card style={styles.heroCard}>
            <VStack style={styles.heroContent}>
              <Badge style={styles.badge}>
                <BadgeText style={styles.badgeText}>{eyebrow}</BadgeText>
              </Badge>
              <Heading style={styles.title}>{title}</Heading>
              {description ? (
                <Text style={styles.description}>{description}</Text>
              ) : null}
            </VStack>
          </Card>

          {children}
        </VStack>
      </ScrollView>

      {floatingAction ? (
        <View pointerEvents="box-none" style={styles.floatingActionContainer}>
          {floatingAction}
        </View>
      ) : null}
    </SafeAreaView>
  );
}
