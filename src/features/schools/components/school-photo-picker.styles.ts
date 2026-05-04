import { StyleSheet } from 'react-native';

import { appTheme } from '../../../theme/app-theme';

export const schoolPhotoPickerStyles = StyleSheet.create({
  emptyText: {
    color: appTheme.colors.textMuted,
    fontSize: 13,
    lineHeight: 20,
  },
  field: {
    gap: 10,
  },
  label: {
    color: appTheme.colors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
  },
  photo: {
    backgroundColor: appTheme.colors.surfaceAlt,
    borderRadius: 12,
    height: 88,
    width: 116,
  },
  photoFrame: {
    borderColor: appTheme.colors.border,
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  photoList: {
    gap: 10,
    paddingBottom: 2,
  },
  removeButton: {
    alignSelf: 'flex-start',
    marginTop: 6,
  },
  removeText: {
    color: appTheme.colors.error,
    fontSize: 12,
    fontWeight: '700',
  },
  thumbnailItem: {
    width: 116,
  },
});
