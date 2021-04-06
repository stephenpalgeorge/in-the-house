import React from 'react';
import { render } from '@testing-library/react';

import InputCopy from './input-copy';

describe('InputCopy', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InputCopy value="" />);
    expect(baseElement).toBeTruthy();
  });
});
