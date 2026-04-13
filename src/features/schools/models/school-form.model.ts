import type { CreateSchoolInput, UpdateSchoolInput } from '../school.types';

export type SchoolFormField = keyof Omit<SchoolFormValues, 'classrooms'>;

export type SchoolFormClassroomValues = {
  id: string;
  name: string;
};

export type SchoolFormValues = {
  address: string;
  classrooms: SchoolFormClassroomValues[];
  name: string;
};

export type SchoolFormErrors = {
  address?: string;
  classrooms?: Record<string, string>;
  form?: string;
  name?: string;
};

type BuildSchoolInputResult =
  | {
      data: CreateSchoolInput;
      success: true;
    }
  | {
      errors: SchoolFormErrors;
      success: false;
    };

export function generateSchoolFormClassroomId() {
  return `classroom-form-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;
}

export function createEmptySchoolFormClassroom(
  name = '',
): SchoolFormClassroomValues {
  return {
    id: generateSchoolFormClassroomId(),
    name,
  };
}

export function createInitialSchoolFormValues(
  values: Partial<SchoolFormValues> = {},
): SchoolFormValues {
  return {
    address: values.address ?? '',
    classrooms:
      values.classrooms?.map((classroom) => ({
        id: classroom.id ?? generateSchoolFormClassroomId(),
        name: classroom.name ?? '',
      })) ?? [],
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

  const classroomErrors = values.classrooms.reduce<Record<string, string>>(
    (accumulator, classroom) => {
      if (!classroom.name.trim()) {
        accumulator[classroom.id] =
          'Informe o nome da turma ou remova o campo.';
      }

      return accumulator;
    },
    {},
  );

  if (Object.keys(classroomErrors).length > 0) {
    nextErrors.classrooms = classroomErrors;
  }

  return nextErrors;
}

function hasValidationErrors(errors: SchoolFormErrors) {
  return Boolean(
    errors.name ||
    errors.address ||
    (errors.classrooms && Object.keys(errors.classrooms).length > 0),
  );
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
      classrooms: values.classrooms.map((classroom) => ({
        name: classroom.name.trim(),
      })),
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
      classrooms: values.classrooms.map((classroom) => ({
        id: classroom.id,
        name: classroom.name.trim(),
      })),
      name: values.name.trim(),
    },
    success: true,
  };
}
