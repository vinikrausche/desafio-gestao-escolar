export function normalizeSearchText(value: string) {
  return value
    .normalize('NFD')
    .replace(/[ºª]/g, '')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase();
}
