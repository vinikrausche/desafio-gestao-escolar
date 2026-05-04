import { Text, VStack } from '@gluestack-ui/themed';
import { createElement } from 'react';
import { Platform, View } from 'react-native';
import { WebView } from 'react-native-webview';

import {
  createGoogleMapsUrls,
  formatSchoolAddress,
} from '../models/school-address.model';
import { schoolMapFooterStyles as styles } from './school-map-footer.styles';
import type { SchoolMapFooterProps } from './types/school-map-footer.types';

function WebMap({ embedUrl }: { embedUrl: string }) {
  if (Platform.OS === 'web') {
    return createElement('iframe', {
      src: embedUrl,
      style: {
        border: 0,
        height: '100%',
        width: '100%',
      },
      title: 'Google Maps',
    });
  }

  return <WebView source={{ uri: embedUrl }} style={styles.mapWebView} />;
}

export function SchoolMapFooter({ school }: SchoolMapFooterProps) {
  const address = formatSchoolAddress(school);
  const { embedUrl } = createGoogleMapsUrls(school);

  return (
    <VStack style={styles.section}>
      <VStack style={styles.header}>
        <Text style={styles.title}>Localizacao</Text>
        <Text style={styles.address}>{address}</Text>
      </VStack>

      <View style={styles.mapFrame}>
        <WebMap embedUrl={embedUrl} />
      </View>
    </VStack>
  );
}
