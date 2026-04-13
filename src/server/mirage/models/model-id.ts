export function generateModelId(prefix: 'classroom' | 'school') {
  const suffix = Math.random().toString(36).slice(2, 8);

  return `${prefix}-${Date.now()}-${suffix}`;
}
