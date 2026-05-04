import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system/legacy';
import { Platform } from 'react-native';

const schoolGalleryDirectory = `${FileSystem.documentDirectory ?? ''}school-gallery/`;

async function ensureSchoolGalleryDirectory() {
  if (!FileSystem.documentDirectory || Platform.OS === 'web') {
    return null;
  }

  const directoryInfo = await FileSystem.getInfoAsync(schoolGalleryDirectory);

  if (!directoryInfo.exists) {
    await FileSystem.makeDirectoryAsync(schoolGalleryDirectory, {
      intermediates: true,
    });
  }

  return schoolGalleryDirectory;
}

function getPhotoExtension(asset: ImagePicker.ImagePickerAsset) {
  const sourceName = asset.fileName ?? asset.uri;
  const extensionMatch = sourceName.match(/\.(heic|jpe?g|png|webp)$/i);

  return extensionMatch?.[0].toLowerCase() ?? '.jpg';
}

async function readWebPhotoFileAsDataUri(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = () => {
      reject(new Error('Nao foi possivel ler a foto selecionada.'));
    };
    reader.onload = () => {
      if (typeof reader.result !== 'string') {
        reject(new Error('Nao foi possivel ler a foto selecionada.'));
        return;
      }

      resolve(reader.result);
    };
    reader.readAsDataURL(file);
  });
}

async function createWebPhotoUri(asset: ImagePicker.ImagePickerAsset) {
  if (!asset.base64) {
    if (asset.file) {
      return readWebPhotoFileAsDataUri(asset.file);
    }

    throw new Error('Nao foi possivel preparar a foto para salvar.');
  }

  return `data:${asset.mimeType ?? 'image/jpeg'};base64,${asset.base64}`;
}

async function persistPhotoAsset(
  asset: ImagePicker.ImagePickerAsset,
  index: number,
) {
  if (Platform.OS === 'web') {
    return createWebPhotoUri(asset);
  }

  const directory = await ensureSchoolGalleryDirectory();

  if (!directory) {
    return asset.uri;
  }

  const fileUri = `${directory}school-photo-${Date.now()}-${index}${getPhotoExtension(asset)}`;

  await FileSystem.copyAsync({
    from: asset.uri,
    to: fileUri,
  });

  return fileUri;
}

export async function pickSchoolPhotoUris() {
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permission.granted) {
    throw new Error('Permita acesso a galeria para adicionar fotos da escola.');
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    allowsMultipleSelection: true,
    base64: Platform.OS === 'web',
    mediaTypes: ['images'],
    quality: 0.8,
  });

  if (result.canceled) {
    return [];
  }

  return Promise.all(
    result.assets
      .filter((asset) => Boolean(asset.uri))
      .map((asset, index) => persistPhotoAsset(asset, index)),
  );
}
