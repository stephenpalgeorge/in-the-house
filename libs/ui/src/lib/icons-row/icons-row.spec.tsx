import React from 'react';
import { render } from '@testing-library/react';

import IconsRow from './icons-row';

describe('IconsRow', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<IconsRow />);
    expect(baseElement).toBeTruthy();
  });
});
