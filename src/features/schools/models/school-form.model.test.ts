import {
  buildSchoolInput,
  buildUpdateSchoolInput,
  createInitialSchoolFormValues,
  validateSchoolForm,
} from './school-form.model';

describe('school-form.model', () => {
  it('cria valores iniciais vazios por padrao', () => {
    expect(createInitialSchoolFormValues()).toEqual({
      address: '',
      name: '',
    });
  });

  it('retorna erros quando os campos obrigatorios estao vazios', () => {
    expect(
      validateSchoolForm({
        address: ' ',
        name: '',
      }),
    ).toEqual({
      address: 'Informe o endereco da escola.',
      name: 'Informe o nome da escola.',
    });
  });

  it('monta o payload de cadastro com campos normalizados', () => {
    expect(
      buildSchoolInput({
        address: ' Avenida Central, 100 ',
        name: ' Escola Centro ',
      }),
    ).toEqual({
      data: {
        address: 'Avenida Central, 100',
        name: 'Escola Centro',
      },
      success: true,
    });
  });

  it('reaproveita o mesmo contrato no payload de atualizacao', () => {
    expect(
      buildUpdateSchoolInput({
        address: ' Rua Nova, 42 ',
        name: ' Escola Sul ',
      }),
    ).toEqual({
      data: {
        address: 'Rua Nova, 42',
        name: 'Escola Sul',
      },
      success: true,
    });
  });
});
