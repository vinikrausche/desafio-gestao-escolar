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
      addressNumber: '',
      city: '',
      district: '',
      name: '',
      photoUris: [],
      postalCode: '',
      state: '',
    });
  });

  it('descarta fotos temporarias do navegador nos valores iniciais', () => {
    expect(
      createInitialSchoolFormValues({
        photoUris: [
          'blob:http://localhost:8081/foto-temporaria',
          ' data:image/jpeg;base64,foto ',
        ],
      }).photoUris,
    ).toEqual([' data:image/jpeg;base64,foto ']);
  });

  it('retorna erros quando os campos obrigatorios estao vazios', () => {
    expect(
      validateSchoolForm({
        address: ' ',
        addressNumber: '',
        city: '',
        district: '',
        name: '',
        photoUris: [],
        postalCode: '',
        state: '',
      }),
    ).toEqual({
      address: 'Informe o endereco da escola.',
      city: 'Informe a cidade da escola.',
      district: 'Informe o bairro da escola.',
      name: 'Informe o nome da escola.',
      postalCode: 'Informe um CEP valido com 8 digitos.',
      state: 'Informe a UF da escola.',
    });
  });

  it('monta o payload de cadastro com campos normalizados', () => {
    expect(
      buildSchoolInput({
        address: ' Avenida Central, 100 ',
        addressNumber: ' 100 ',
        city: ' Manaus ',
        district: ' Centro ',
        name: ' Escola Centro ',
        photoUris: [' file://foto-1.jpg '],
        postalCode: '69005000',
        state: ' am ',
      }),
    ).toEqual({
      data: {
        address: 'Avenida Central, 100',
        addressNumber: '100',
        city: 'Manaus',
        district: 'Centro',
        name: 'Escola Centro',
        photos: [{ uri: 'file://foto-1.jpg' }],
        postalCode: '69005-000',
        state: 'AM',
      },
      success: true,
    });
  });

  it('reaproveita o mesmo contrato no payload de atualizacao', () => {
    expect(
      buildUpdateSchoolInput({
        address: ' Rua Nova, 42 ',
        addressNumber: ' 42 ',
        city: ' Manaus ',
        district: ' Aleixo ',
        name: ' Escola Sul ',
        photoUris: [],
        postalCode: '69000-000',
        state: 'AM',
      }),
    ).toEqual({
      data: {
        address: 'Rua Nova, 42',
        addressNumber: '42',
        city: 'Manaus',
        district: 'Aleixo',
        name: 'Escola Sul',
        photos: [],
        postalCode: '69000-000',
        state: 'AM',
      },
      success: true,
    });
  });

  it('nao persiste URLs blob porque expiram no navegador', () => {
    expect(
      buildUpdateSchoolInput({
        address: ' Rua Nova, 42 ',
        addressNumber: ' 42 ',
        city: ' Manaus ',
        district: ' Aleixo ',
        name: ' Escola Sul ',
        photoUris: [
          'blob:http://localhost:8081/foto-temporaria',
          ' file://foto-1.jpg ',
        ],
        postalCode: '69000-000',
        state: 'AM',
      }),
    ).toMatchObject({
      data: {
        photos: [{ uri: 'file://foto-1.jpg' }],
      },
      success: true,
    });
  });
});
