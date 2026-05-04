import {
  buildClassroomInput,
  buildUpdateClassroomInput,
  createInitialClassroomFormValues,
  validateClassroomForm,
} from './classroom-form.model';

describe('classroom-form.model', () => {
  it('cria valores iniciais vazios com turno padrao', () => {
    expect(createInitialClassroomFormValues()).toEqual({
      name: '',
      schoolYear: '',
      shift: 'morning',
    });
  });

  it('retorna erros quando os campos obrigatorios estao vazios', () => {
    expect(
      validateClassroomForm({
        name: ' ',
        schoolYear: '',
        shift: 'morning',
      }),
    ).toEqual({
      name: 'Informe o nome da turma.',
      schoolYear: 'Informe o ano letivo.',
    });
  });

  it('retorna erro quando o ano letivo nao tem 4 digitos', () => {
    expect(
      validateClassroomForm({
        name: '6º Ano A',
        schoolYear: '26',
        shift: 'afternoon',
      }),
    ).toEqual({
      schoolYear: 'Informe um ano letivo com 4 dígitos.',
    });
  });

  it('monta o payload de cadastro com campos normalizados', () => {
    expect(
      buildClassroomInput({
        name: ' 6º Ano A ',
        schoolYear:2,
        shift: 'night',
      }),
    ).toEqual({
      data: {
        name: '6º Ano A',
        schoolYear: '2026',
        shift: 'night',
      },
      success: true,
    });
  });

  it('reaproveita o mesmo contrato no payload de atualizacao', () => {
    expect(
      buildUpdateClassroomInput({
        name: ' 7º Ano B ',
        schoolYear: ' 2027 ',
        shift: 'morning',
      }),
    ).toEqual({
      data: {
        name: '7º Ano B',
        schoolYear: '2027',
        shift: 'morning',
      },
      success: true,
    });
  });
});
