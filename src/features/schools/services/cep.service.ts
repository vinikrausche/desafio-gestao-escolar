import {
  formatPostalCode,
  isPostalCodeFormatValid,
  normalizePostalCode,
} from '../models/cep.model';

type ViaCepResponse = {
  bairro?: string;
  cep?: string;
  erro?: boolean;
  localidade?: string;
  logradouro?: string;
  uf?: string;
};

export type PostalCodeAddress = {
  address: string;
  city: string;
  district: string;
  postalCode: string;
  state: string;
};

export class PostalCodeLookupError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PostalCodeLookupError';
  }
}

export async function lookupPostalCode(
  postalCode: string,
): Promise<PostalCodeAddress> {
  const digits = normalizePostalCode(postalCode);

  if (!isPostalCodeFormatValid(digits)) {
    throw new PostalCodeLookupError('Informe um CEP valido com 8 digitos.');
  }

  const response = await fetch(`https://viacep.com.br/ws/${digits}/json/`);

  if (!response.ok) {
    throw new PostalCodeLookupError('Nao foi possivel validar o CEP.');
  }

  const payload = (await response.json()) as ViaCepResponse;

  if (payload.erro) {
    throw new PostalCodeLookupError('CEP nao encontrado.');
  }

  return {
    address: payload.logradouro?.trim() ?? '',
    city: payload.localidade?.trim() ?? '',
    district: payload.bairro?.trim() ?? '',
    postalCode: formatPostalCode(payload.cep ?? digits),
    state: payload.uf?.trim().toUpperCase() ?? '',
  };
}
