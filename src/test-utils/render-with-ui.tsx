import { render, type RenderOptions } from '@testing-library/react-native';
import type { ReactElement } from 'react';

// ! O helper concentra o render padrao para manter os testes de interface enxutos.
export function renderWithUi(
  element: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) {
  return render(element, options);
}
