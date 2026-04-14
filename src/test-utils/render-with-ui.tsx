import { render, type RenderOptions } from '@testing-library/react-native';
import type { ReactElement } from 'react';

// ! O helper concentra o render padrao e pode receber providers reais no futuro sem reescrever os testes.
export function renderWithUi(element: ReactElement, options?: RenderOptions) {
  return render(element, options);
}
