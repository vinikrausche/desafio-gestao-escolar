import {
  buildSchoolInput,
  buildUpdateSchoolInput,
  createEmptySchoolFormClassroom,
  createInitialSchoolFormValues,
  validateSchoolForm,
} from './school-form.model';

describe('school-form.model', () => {
  it('cria valores iniciais vazios por padrao', () => {
    expect(createInitialSchoolFormValues()).toEqual({
      address: '',
      classrooms: [],
      name: '',
    });
  });

  it('cria um item vazio de turma com id local', () => {
    const classroom = createEmptySchoolFormClassroom();

    expect(classroom.id).toMatch(/^classroom-form-/);
    expect(classroom.name).toBe('');
  });

  it('retorna erros quando os campos obrigatorios estao vazios', () => {
    expect(
      validateSchoolForm({
        address: ' ',
        classrooms: [],
        name: '',
      }),
    ).toEqual({
      address: 'Informe o endereco da escola.',
      name: 'Informe o nome da escola.',
    });
  });

  it('retorna erro quando existe turma em branco', () => {
    const classroom = createEmptySchoolFormClassroom();

    expect(
      validateSchoolForm({
        address: 'Rua A, 10',
        classrooms: [classroom],
        name: 'Escola Centro',
      }),
    ).toEqual({
      classrooms: {
        [classroom.id]: 'Informe o nome da turma ou remova o campo.',
      },
    });
  });

  it('monta o payload de cadastro com campos normalizados', () => {
    const classroom = createEmptySchoolFormClassroom(' 6º Ano A ');

    expect(
      buildSchoolInput({
        address: ' Avenida Central, 100 ',
        classrooms: [classroom],
        name: ' Escola Centro ',
      }),
    ).toEqual({
      data: {
        address: 'Avenida Central, 100',
        classrooms: [
          {
            name: '6º Ano A',
          },
        ],
        name: 'Escola Centro',
      },
      success: true,
    });
  });

  it('reaproveita o mesmo contrato no payload de atualizacao', () => {
    const classroom = createEmptySchoolFormClassroom(' 7º Ano B ');

    expect(
      buildUpdateSchoolInput({
        address: ' Rua Nova, 42 ',
        classrooms: [classroom],
        name: ' Escola Sul ',
      }),
    ).toEqual({
      data: {
        address: 'Rua Nova, 42',
        classrooms: [
          {
            id: classroom.id,
            name: '7º Ano B',
          },
        ],
        name: 'Escola Sul',
      },
      success: true,
    });
  });
});
