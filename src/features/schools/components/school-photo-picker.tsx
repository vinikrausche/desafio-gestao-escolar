import { Text, VStack } from '@gluestack-ui/themed';
import { Image, Pressable, ScrollView, View } from 'react-native';

import { AppButton } from '../../../components/actions/app-button';
import { schoolPhotoPickerStyles as styles } from './school-photo-picker.styles';
import type { SchoolPhotoPickerProps } from './types/school-photo-picker.types';

export function SchoolPhotoPicker({
  isDisabled = false,
  onAddPhotos,
  onRemovePhoto,
  photoUris,
}: SchoolPhotoPickerProps) {
  return (
    <VStack style={styles.field}>
      <Text style={styles.label}>Fotos da escola</Text>

      {photoUris.length > 0 ? (
        <ScrollView
          contentContainerStyle={styles.photoList}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {photoUris.map((uri) => (
            <View key={uri} style={styles.thumbnailItem}>
              <View style={styles.photoFrame}>
                <Image source={{ uri }} style={styles.photo} />
              </View>

              <Pressable
                accessibilityLabel="Remover foto"
                disabled={isDisabled}
                onPress={() => onRemovePhoto(uri)}
                style={styles.removeButton}
              >
                <Text style={styles.removeText}>Remover</Text>
              </Pressable>
            </View>
          ))}
        </ScrollView>
      ) : (
        <Text style={styles.emptyText}>
          Nenhuma foto adicionada para a galeria.
        </Text>
      )}

      <AppButton
        isDisabled={isDisabled}
        label="Adicionar fotos"
        onPress={onAddPhotos}
        size="sm"
        variant="soft"
      />
    </VStack>
  );
}
