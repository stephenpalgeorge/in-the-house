import React from 'react';
import { render } from '@testing-library/react';

import Modals, { ModalData } from './modals';

describe('Modals', () => {
  const modals: ModalData[] = [{
    code: 200,
    name: 'test',
    type: 'success',
    message: 'test',
    isDismissible: true,
  }]
  it('should render successfully', () => {
    const { baseElement } = render(<Modals modals={modals} closeModal={n => null} />);
    expect(baseElement).toBeTruthy();
  });
});
