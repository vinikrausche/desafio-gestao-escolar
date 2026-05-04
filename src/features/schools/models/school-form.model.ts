import type {
  CreateSchoolInput,
  UpdateSchoolInput,
} from '../../../types/features/schools/school.types';
import type {
  SchoolFormErrors,
  SchoolFormValues,
} from '../../../types/features/schools/school-form.types';
import { formatPostalCode, isPostalCodeFormatValid } from './cep.model';
import { isPersistableSchoolPhotoUri } from './school-photo.model';

export type {
  SchoolFormErrors,
  SchoolFormField,
  SchoolFormValues,
} from '../../../types/features/schools/school-form.types';

type BuildSchoolInputResult =
  | {
      data: CreateSchoolInput;
      success: true;
    }
  | {
      errors: SchoolFormErrors;
      success: false;
    };

export function createInitialSchoolFormValues(
  values: Partial<SchoolFormValues> = {},
): SchoolFormValues {
  return {
    address: values.address ?? '',
    addressNumber: values.addressNumber ?? '',
    city: values.city ?? '',
    district: values.district ?? '',
    name: values.name ?? '',
    photoUris: (values.photoUris ?? []).filter(isPersistableSchoolPhotoUri),
    postalCode: formatPostalCode(values.postalCode ?? ''),
    state: values.state ?? '',
  };
}

export function validateSchoolForm(values: SchoolFormValues): SchoolFormErrors {
  const nextErrors: SchoolFormErrors = {};

  if (!values.name.trim()) {
    nextErrors.name = 'Informe o nome da escola.';
  }

  if (!values.address.trim()) {
    nextErrors.address = 'Informe o endereco da escola.';
  }

  if (!isPostalCodeFormatValid(values.postalCode)) {
    nextErrors.postalCode = 'Informe um CEP valido com 8 digitos.';
  }

  if (!values.district.trim()) {
    nextErrors.district = 'Informe o bairro da escola.';
  }

  if (!values.city.trim()) {
    nextErrors.city = 'Informe a cidade da escola.';
  }

  if (!values.state.trim()) {
    nextErrors.state = 'Informe a UF da escola.';
  }

  return nextErrors;
}

function hasValidationErrors(errors: SchoolFormErrors) {
  return Boolean(
    errors.name ||
    errors.address ||
    errors.city ||
    errors.district ||
    errors.postalCode ||
    errors.state,
  );
}

function buildSchoolPhotos(values: SchoolFormValues) {
  return values.photoUris
    .map((uri) => uri.trim())
    .filter(isPersistableSchoolPhotoUri)
    .map((uri) => ({
      uri,
    }));
}

export function buildSchoolInput(
  values: SchoolFormValues,
): BuildSchoolInputResult {
  const errors = validateSchoolForm(values);

  if (hasValidationErrors(errors)) {
    return {
      errors,
      success: false,
    };
  }

  return {
    data: {
      address: values.address.trim(),
      addressNumber: values.addressNumber.trim(),
      city: values.city.trim(),
      district: values.district.trim(),
      name: values.name.trim(),
      photos: buildSchoolPhotos(values),
      postalCode: formatPostalCode(values.postalCode),
      state: values.state.trim().toUpperCase(),
    },
    success: true,
  };
}

export function buildUpdateSchoolInput(values: SchoolFormValues):
  | {
      data: UpdateSchoolInput;
      success: true;
    }
  | {
      errors: SchoolFormErrors;
      success: false;
    } {
  const errors = validateSchoolForm(values);

  if (hasValidationErrors(errors)) {
    return {
      errors,
      success: false,
    };
  }

  return {
    data: {
      address: values.address.trim(),
      addressNumber: values.addressNumber.trim(),
      city: values.city.trim(),
      district: values.district.trim(),
      name: values.name.trim(),
      photos: buildSchoolPhotos(values),
      postalCode: formatPostalCode(values.postalCode),
      state: values.state.trim().toUpperCase(),
    },
    success: true,
  };
}
