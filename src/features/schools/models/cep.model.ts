export const POSTAL_CODE_DIGIT_LENGTH = 8;

export function normalizePostalCode(value: string) {
  return value.replace(/\D/g, '').slice(0, POSTAL_CODE_DIGIT_LENGTH);
}

export function formatPostalCode(value: string) {
  const digits = normalizePostalCode(value);

  if (digits.length <= 5) {
    return digits;
  }

  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
}

export function isPostalCodeFormatValid(value: string) {
  return normalizePostalCode(value).length === POSTAL_CODE_DIGIT_LENGTH;
}
