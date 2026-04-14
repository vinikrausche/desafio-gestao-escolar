import type {
  CreateClassroomInput,
  UpdateClassroomInput,
} from '../../../types/features/classrooms/classroom.types';
import type {
  ClassroomFormErrors,
  ClassroomFormValues,
} from '../../../types/features/classrooms/classroom-form.types';

export type {
  ClassroomFormErrors,
  ClassroomFormField,
  ClassroomFormValues,
} from '../../../types/features/classrooms/classroom-form.types';

type BuildClassroomInputResult =
  | {
      data: CreateClassroomInput;
      success: true;
    }
  | {
      errors: ClassroomFormErrors;
      success: false;
    };

export function createInitialClassroomFormValues(
  values: Partial<ClassroomFormValues> = {},
): ClassroomFormValues {
  return {
    name: values.name ?? '',
    schoolYear: values.schoolYear ?? '',
    shift: values.shift ?? 'morning',
  };
}

export function validateClassroomForm(
  values: ClassroomFormValues,
): ClassroomFormErrors {
  const nextErrors: ClassroomFormErrors = {};

  if (!values.name.trim()) {
    nextErrors.name = 'Informe o nome da turma.';
  }

  if (!values.schoolYear.trim()) {
    nextErrors.schoolYear = 'Informe o ano letivo.';
  } else if (!/^\d{4}$/.test(values.schoolYear.trim())) {
    nextErrors.schoolYear = 'Informe um ano letivo com 4 dígitos.';
  }

  if (!values.shift) {
    nextErrors.shift = 'Selecione o turno da turma.';
  }

  return nextErrors;
}

function hasValidationErrors(errors: ClassroomFormErrors) {
  return Boolean(errors.name || errors.schoolYear || errors.shift);
}

export function buildClassroomInput(
  values: ClassroomFormValues,
): BuildClassroomInputResult {
  const errors = validateClassroomForm(values);

  if (hasValidationErrors(errors)) {
    return {
      errors,
      success: false,
    };
  }

  return {
    data: {
      name: values.name.trim(),
      schoolYear: values.schoolYear.trim(),
      shift: values.shift,
    },
    success: true,
  };
}

export function buildUpdateClassroomInput(values: ClassroomFormValues):
  | {
      data: UpdateClassroomInput;
      success: true;
    }
  | {
      errors: ClassroomFormErrors;
      success: false;
    } {
  const result = buildClassroomInput(values);

  if (!result.success) {
    return result;
  }

  return {
    data: result.data,
    success: true,
  };
}
