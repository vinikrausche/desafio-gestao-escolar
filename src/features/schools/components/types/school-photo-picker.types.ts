export type SchoolPhotoPickerProps = {
  isDisabled?: boolean;
  onAddPhotos: () => void;
  onRemovePhoto: (uri: string) => void;
  photoUris: string[];
};
