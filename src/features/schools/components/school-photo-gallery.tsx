import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  Icon,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import { useMemo, useState } from 'react';
import { Image, Modal, Pressable, ScrollView, View } from 'react-native';

import { isPersistableSchoolPhotoUri } from '../models/school-photo.model';
import { schoolPhotoGalleryStyles as styles } from './school-photo-gallery.styles';
import type { SchoolPhotoGalleryProps } from './types/school-photo-gallery.types';

function formatGalleryCounter(currentIndex: number, totalCount: number) {
  return `${currentIndex + 1}/${totalCount}`;
}

export function SchoolPhotoGallery({
  photos,
  schoolName,
}: SchoolPhotoGalleryProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const displayablePhotos = useMemo(
    () => photos.filter((photo) => isPersistableSchoolPhotoUri(photo.uri)),
    [photos],
  );
  const photoCount = displayablePhotos.length;
  const selectedIndex =
    photoCount > 0 ? Math.min(selectedPhotoIndex, photoCount - 1) : 0;
  const selectedPhoto = displayablePhotos[selectedIndex];
  const hasUnavailablePhotos = photos.length > 0 && photoCount === 0;
  const hasMultiplePhotos = photoCount > 1;

  function openLightbox(index: number) {
    setSelectedPhotoIndex(index);
    setIsLightboxOpen(true);
  }

  function closeLightbox() {
    setIsLightboxOpen(false);
  }

  function goToPhoto(index: number) {
    if (index < 0 || index >= photoCount) {
      return;
    }

    setSelectedPhotoIndex(index);
  }

  function movePhoto(direction: -1 | 1) {
    if (!photoCount) {
      return;
    }

    setSelectedPhotoIndex((currentIndex) => {
      const normalizedIndex = Math.min(currentIndex, photoCount - 1);

      return (normalizedIndex + direction + photoCount) % photoCount;
    });
  }

  return (
    <VStack style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Galeria da escola</Text>

        {photoCount > 0 ? (
          <View style={styles.countBadge}>
            <Text style={styles.countBadgeText}>
              {formatGalleryCounter(selectedIndex, photoCount)}
            </Text>
          </View>
        ) : null}
      </View>

      {!selectedPhoto ? (
        <View style={styles.emptyGallery}>
          <Text style={styles.emptyText}>
            {hasUnavailablePhotos
              ? 'As fotos salvas anteriormente expiraram no navegador. Adicione as fotos novamente na edicao da escola.'
              : 'Nenhuma foto adicionada para esta escola.'}
          </Text>
        </View>
      ) : (
        <View style={styles.galleryPanel}>
          <Pressable
            accessibilityLabel={`Ampliar foto ${selectedIndex + 1} de ${photoCount} de ${schoolName}`}
            accessibilityRole="button"
            onPress={() => openLightbox(selectedIndex)}
            style={styles.featuredPhoto}
          >
            <Image
              accessibilityLabel={`Foto principal de ${schoolName}`}
              resizeMode="cover"
              source={{ uri: selectedPhoto.uri }}
              style={styles.featuredImage}
            />

            <View style={styles.featuredFooter}>
              <Text style={styles.featuredFooterText}>{schoolName}</Text>
              <Text style={styles.featuredFooterText}>
                {formatGalleryCounter(selectedIndex, photoCount)}
              </Text>
            </View>

            {hasMultiplePhotos ? (
              <View style={styles.featuredNavigation}>
                <Pressable
                  accessibilityLabel="Foto anterior"
                  accessibilityRole="button"
                  hitSlop={8}
                  onPress={(event) => {
                    event.stopPropagation();
                    movePhoto(-1);
                  }}
                  style={styles.featuredNavButton}
                >
                  <Icon
                    as={ChevronLeftIcon}
                    color="white"
                    style={styles.navigationIcon}
                  />
                </Pressable>

                <Pressable
                  accessibilityLabel="Proxima foto"
                  accessibilityRole="button"
                  hitSlop={8}
                  onPress={(event) => {
                    event.stopPropagation();
                    movePhoto(1);
                  }}
                  style={styles.featuredNavButton}
                >
                  <Icon
                    as={ChevronRightIcon}
                    color="white"
                    style={styles.navigationIcon}
                  />
                </Pressable>
              </View>
            ) : null}
          </Pressable>

          <ScrollView
            contentContainerStyle={styles.thumbnailRailContent}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.thumbnailRail}
          >
            {displayablePhotos.map((photo, index) => (
              <Pressable
                accessibilityLabel={`Abrir foto ${index + 1} de ${photoCount} de ${schoolName}`}
                accessibilityRole="button"
                key={photo.id}
                onPress={() => openLightbox(index)}
                style={[
                  styles.thumbnail,
                  index === selectedIndex ? styles.thumbnailSelected : null,
                ]}
              >
                <Image
                  resizeMode="cover"
                  source={{ uri: photo.uri }}
                  style={styles.thumbnailImage}
                />
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}

      {selectedPhoto ? (
        <Modal
          animationType="fade"
          onRequestClose={closeLightbox}
          transparent
          visible={isLightboxOpen}
        >
          <View style={styles.lightboxBackdrop}>
            <View style={styles.lightboxHeader}>
              <View>
                <Text style={styles.lightboxTitle}>Galeria da escola</Text>
                <Text style={styles.lightboxSubtitle}>{schoolName}</Text>
              </View>

              <View style={styles.lightboxHeaderActions}>
                <View style={styles.lightboxCounter}>
                  <Text style={styles.lightboxCounterText}>
                    {formatGalleryCounter(selectedIndex, photoCount)}
                  </Text>
                </View>

                <Pressable
                  accessibilityLabel="Fechar galeria"
                  accessibilityRole="button"
                  hitSlop={8}
                  onPress={closeLightbox}
                  style={styles.lightboxCloseButton}
                >
                  <Icon as={CloseIcon} color="white" style={styles.closeIcon} />
                </Pressable>
              </View>
            </View>

            <View style={styles.lightboxStage}>
              <Image
                accessibilityLabel={`Foto ${selectedIndex + 1} de ${schoolName}`}
                resizeMode="contain"
                source={{ uri: selectedPhoto.uri }}
                style={styles.lightboxImage}
              />

              {hasMultiplePhotos ? (
                <>
                  <Pressable
                    accessibilityLabel="Foto anterior"
                    accessibilityRole="button"
                    hitSlop={10}
                    onPress={() => movePhoto(-1)}
                    style={[styles.lightboxNavButton, styles.lightboxNavLeft]}
                  >
                    <Icon
                      as={ChevronLeftIcon}
                      color="white"
                      style={styles.lightboxNavIcon}
                    />
                  </Pressable>

                  <Pressable
                    accessibilityLabel="Proxima foto"
                    accessibilityRole="button"
                    hitSlop={10}
                    onPress={() => movePhoto(1)}
                    style={[styles.lightboxNavButton, styles.lightboxNavRight]}
                  >
                    <Icon
                      as={ChevronRightIcon}
                      color="white"
                      style={styles.lightboxNavIcon}
                    />
                  </Pressable>
                </>
              ) : null}
            </View>

            <ScrollView
              contentContainerStyle={styles.lightboxThumbRailContent}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.lightboxThumbRail}
            >
              {displayablePhotos.map((photo, index) => (
                <Pressable
                  accessibilityLabel={`Selecionar foto ${index + 1} de ${photoCount}`}
                  accessibilityRole="button"
                  key={photo.id}
                  onPress={() => goToPhoto(index)}
                  style={[
                    styles.lightboxThumb,
                    index === selectedIndex
                      ? styles.lightboxThumbSelected
                      : null,
                  ]}
                >
                  <Image
                    resizeMode="cover"
                    source={{ uri: photo.uri }}
                    style={styles.lightboxThumbImage}
                  />
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </Modal>
      ) : null}
    </VStack>
  );
}
