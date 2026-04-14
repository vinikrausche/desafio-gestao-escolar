import type {
  CreateSchoolInput,
  UpdateSchoolInput,
} from '../../../types/features/schools/school.types';
import type {
  SchoolFormErrors,
  SchoolFormValues,
} from '../../../types/features/schools/school-form.types';

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
    name: values.name ?? '',
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

  return nextErrors;
}

function hasValidationErrors(errors: SchoolFormErrors) {
  return Boolean(errors.name || errors.address);
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
      name: values.name.trim(),
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
      name: values.name.trim(),
    },
    success: true,
  };
}
