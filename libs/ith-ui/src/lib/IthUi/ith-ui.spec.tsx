import React from 'react';
import { render } from '@testing-library/react';

import IthUi from './index';

describe('IthUi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<IthUi />);
    expect(baseElement).toBeTruthy();
  });
});
