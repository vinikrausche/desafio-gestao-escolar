export function isPersistableSchoolPhotoUri(uri: string) {
  const normalizedUri = uri.trim();

  return Boolean(normalizedUri) && !normalizedUri.startsWith('blob:');
}
